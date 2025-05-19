// Import required AWS SDK v3 clients and commands
const {
    EC2Client,
    DescribeInstancesCommand,
    DescribeSecurityGroupsCommand,
    RunInstancesCommand,
    TerminateInstancesCommand,
    DescribeRouteTablesCommand,
    RevokeSecurityGroupIngressCommand,
    AuthorizeSecurityGroupIngressCommand,
} = require("@aws-sdk/client-ec2");
const {
    S3Client,
    ListBucketsCommand,
    GetBucketVersioningCommand,
    ListObjectsV2Command,
    CreateBucketCommand,
    CopyObjectCommand,
} = require("@aws-sdk/client-s3");

// Helper functions to build Lex dialog responses
function elicitSlot(
    sessionAttributes,
    intentName,
    slots,
    slotToElicit,
    message,
    responseCard,
) {
    return {
        sessionAttributes,
        dialogAction: {
            type: "ElicitSlot",
            intentName,
            slots,
            slotToElicit,
            message,
            responseCard,
        },
    };
}

function confirmIntent(
    sessionAttributes,
    intentName,
    slots,
    message,
    responseCard,
) {
    return {
        sessionAttributes,
        dialogAction: {
            type: "ConfirmIntent",
            intentName,
            slots,
            message,
            responseCard,
        },
    };
}

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: "Close",
            fulfillmentState,
            message,
        },
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: "Delegate",
            slots,
        },
    };
}

function buildResponseCard(title, subtitle, options) {
    const buttons = options ? options.slice(0, 5).map((option) => option) : null;
    return {
        contentType: "application/vnd.amazonaws.card.generic",
        version: 1,
        genericAttachments: [
            {
                title,
                subTitle: subtitle,
                buttons,
            },
        ],
    };
}

// Build EC2/S3 client configuration
function buildConfig(event) {
    const sessionAttributes = event.sessionState.sessionAttributes || {};
    const region = sessionAttributes.region || "us-east-1";
    return {
        region,
        signatureVersion: "v4",
        retryMode: "standard",
        maxAttempts: 10,
    };
}

// Intent Handlers
async function listInstances(event) {
    console.info("Received a request to list EC2 instances");
    const config = buildConfig(event);
    const ec2Client = new EC2Client(config);
    const slots = event.sessionState.intent.slots;

    const filters = [];
    if (slots.ami?.value?.interpretedValue) {
        filters.push({
            Name: "image-id",
            Values: [slots.ami.value.interpretedValue],
        });
    }
    if (slots.instanceType?.value?.interpretedValue) {
        filters.push({
            Name: "instance-type",
            Values: [slots.instanceType.value.interpretedValue],
        });
    }

    const response = await ec2Client.send(
        new DescribeInstancesCommand({ Filters: filters }),
    );
    let filteredInstances = filterInstanceAttributes(response);

    if (slots.subnetType?.value?.interpretedValue) {
        filteredInstances = await filterInstancesBySubnetType(
            ec2Client,
            filteredInstances,
            slots.subnetType.value.interpretedValue,
        );
    }

    const instanceIds = filteredInstances.map((instance) => instance.InstanceId);
    console.info(JSON.stringify(filteredInstances));
    const sessionAttributes = updateSessionAttributes(
        event,
        "instances",
        JSON.stringify(filteredInstances),
    );

    const message =
        filters.length > 0 || slots.subnetType?.value?.interpretedValue
            ? `You have a total of ${filteredInstances.length} instances based on your filters. Additional information is attached.`
            : `You have a total of ${filteredInstances.length} instances. Additional information is attached.`;

    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
        [],
    );
}

function filterInstanceAttributes(response) {
    const allInstances = (response.Reservations || []).flatMap(
        (res) => res.Instances || [],
    );
    const activeInstances = allInstances.filter(
        (inst) => inst.State.Name !== "terminated",
    );
    return activeInstances.map((inst) => ({
        ImageId: inst.ImageId,
        InstanceId: inst.InstanceId,
        InstanceType: inst.InstanceType,
        State: inst.State,
        KeyName: inst.KeyName,
        LaunchTime: inst.LaunchTime,
        Placement: inst.Placement,
        PrivateIpAddress: inst.PrivateIpAddress,
        PublicIpAddress: inst.PublicIpAddress,
        SubnetId: inst.SubnetId,
        VpcId: inst.VpcId, // Added for getSubnetType
    }));
}

async function filterInstancesBySubnetType(
    ec2Client,
    instances,
    targetSubnetType,
) {
    const filteredInstances = [];
    for (const instance of instances) {
        const subnetType = await getSubnetType(
            ec2Client,
            instance.SubnetId,
            instance.VpcId,
        );
        if (subnetType === targetSubnetType) {
            instance.SubnetType = subnetType;
            filteredInstances.push(instance);
        }
    }
    return filteredInstances;
}

async function getSubnetType(ec2Client, subnetId, vpcId) {
    let routeTables = (
        await ec2Client.send(
            new DescribeRouteTablesCommand({
                Filters: [{ Name: "association.subnet-id", Values: [subnetId] }],
            }),
        )
    ).RouteTables;

    if (!routeTables.length) {
        routeTables = (
            await ec2Client.send(
                new DescribeRouteTablesCommand({
                    Filters: [
                        { Name: "association.main", Values: ["true"] },
                        { Name: "vpc-id", Values: [vpcId] },
                    ],
                }),
            )
        ).RouteTables;
    }

    if (routeTables.length > 0) {
        const routes = routeTables[0].Routes;
        const isPublic = routes.some((route) =>
            route.GatewayId?.startsWith("igw-"),
        );
        return isPublic ? "public" : "private";
    }
    return "private";
}

async function createInstance(event) {
    console.info("Received a request to create an EC2 instance");
    const config = buildConfig(event);
    const ec2Client = new EC2Client(config);
    const slots = event.sessionState.intent.slots;
    const instanceAmi = slots.ami.value.interpretedValue;
    const instanceType = slots.instanceType.value.interpretedValue;
    const instanceCount = parseInt(slots.count.value.interpretedValue);

    const sgResponse = await ec2Client.send(
        new DescribeSecurityGroupsCommand({}),
    );
    const securityGroupId = sgResponse.SecurityGroups.find(
        (sg) => sg.GroupName === "default",
    ).GroupId;

    const runResponse = await ec2Client.send(
        new RunInstancesCommand({
            ImageId: instanceAmi,
            InstanceType: instanceType,
            MinCount: instanceCount,
            MaxCount: instanceCount,
            SecurityGroupIds: [securityGroupId],
        }),
    );

    const newInstanceIds = runResponse.Instances.map((inst) => inst.InstanceId);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const describeResponse = await ec2Client.send(
        new DescribeInstancesCommand({ InstanceIds: newInstanceIds }),
    );
    const filteredInstances = filterInstanceAttributes(describeResponse);
    const sessionAttributes = updateSessionAttributes(
        event,
        "instances",
        JSON.stringify(filteredInstances),
    );

    const message = `${instanceCount} instances were launched with the following ids: ${newInstanceIds}`;
    console.info(message);
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

async function terminateInstances(event) {
    console.info("Received a request to terminate an EC2 instance");
    const config = buildConfig(event);
    const ec2Client = new EC2Client(config);
    const sessionAttributes = event.sessionState.sessionAttributes;
    const selectedInstances = JSON.parse(sessionAttributes.instances);
    const instanceIds = selectedInstances.map((inst) => inst.InstanceId);

    await ec2Client.send(
        new TerminateInstancesCommand({ InstanceIds: instanceIds }),
    );
    const message = `These instances were terminated: ${instanceIds}`;
    console.info(message);
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

function changeRegion(event) {
    console.info("Received a request to change the region");
    const slots = event.sessionState.intent.slots;
    const region = slots.region.value.interpretedValue;
    const sessionAttributes = updateSessionAttributes(event, "region", region);
    const message = `Assistant is now operating in the ${region} region`;
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

async function listRules(event) {
    console.info("Received a request to list security group rules");
    const config = buildConfig(event);
    const ec2Client = new EC2Client(config);

    const sgResponse = await ec2Client.send(
        new DescribeSecurityGroupsCommand({}),
    );
    const securityGroupId = sgResponse.SecurityGroups.find(
        (sg) => sg.GroupName === "default",
    ).GroupId;
    const sgDetails = sgResponse.SecurityGroups.find(
        (sg) => sg.GroupId === securityGroupId,
    );
    const inboundRules = sgDetails.IpPermissions;

    const openRules = inboundRules.filter((rule) => isOpenRule(rule));
    const openPorts = openRules.map((rule) => rule.ToPort);
    const sessionAttributes = updateSessionAttributes(
        event,
        "sg-open-rules",
        JSON.stringify(openRules),
    );

    const message = `There are ${openRules.length} security group rules with unrestricted inbound traffic to the following ports: ${openPorts}`;
    console.info(message);
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

function isOpenRule(rule) {
    const ipRanges = rule.IpRanges || [];
    return ipRanges.length > 0 && ipRanges[0].CidrIp === "0.0.0.0/0";
}

async function listS3Buckets(event) {
    console.info("Received a request to list all S3 buckets");
    const config = buildConfig(event);
    const s3Client = new S3Client(config);

    const bucketsResponse = await s3Client.send(new ListBucketsCommand({}));
    const buckets = bucketsResponse.Buckets;
    const bucketNames = buckets.map((bucket) => bucket.Name);

    for (let i = 0; i < buckets.length; i++) {
        const versioning = await s3Client.send(
            new GetBucketVersioningCommand({ Bucket: buckets[i].Name }),
        );
        buckets[i].Versioning = versioning.Status === "Enabled";
    }

    const sessionAttributes = updateSessionAttributes(
        event,
        "s3-bucket-list",
        JSON.stringify(buckets),
    );
    const message = `There are ${bucketNames.length} S3 buckets. Bucket names and other information is attached.`;
    console.info(message);
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

async function searchS3(event) {
    console.info("Received a request to search in S3");
    const config = buildConfig(event);
    const s3Client = new S3Client(config);
    const slots = event.sessionState.intent.slots;
    const pattern = slots.objName.value.originalValue;
    const bucketIndex = slots.bucketIndex?.value?.interpretedValue;

    const bucketsResponse = await s3Client.send(new ListBucketsCommand({}));
    const bucketNames = bucketsResponse.Buckets.map((bucket) => bucket.Name);
    let items = [];
    let message;

    if (bucketIndex) {
        const bucketName = bucketNames[parseInt(bucketIndex) - 1];
        items = await searchBucket(s3Client, bucketName, pattern);
        message = `${items.length} objects were found containing the keyword "${pattern}" in bucket ${bucketName}. Search results are attached.`;
    } else {
        for (const bucketName of bucketNames) {
            if (bucketName.toLowerCase().includes("isengard")) continue;
            const bucketItems = await searchBucket(s3Client, bucketName, pattern);
            items = items.concat(bucketItems.slice(0, 10));
        }
        message = `${items.length} objects were found containing the keyword "${pattern}" across all buckets. Search results are attached.`;
    }

    const sessionAttributes =
        updateSessionAttributes[(event, "s3-found-objects", JSON.stringify(items))];
    console.info(message);
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

async function searchBucket(s3Client, bucketName, pattern) {
    const items = [];
    let continuationToken;
    do {
        const params = { Bucket: bucketName, ContinuationToken: continuationToken };
        const response = await s3Client.send(new ListObjectsV2Command(params));
        const contents = response.Contents || [];
        items.push(
            ...contents
                .filter(
                    (item) =>
                        item.Key.includes(pattern) ||
                        item.Key.includes(
                            pattern.charAt(0).toUpperCase() + pattern.slice(1),
                        ),
                )
                .map((item) => ({ ...item, Bucket: bucketName })),
        );
        continuationToken = response.NextContinuationToken;
    } while (continuationToken);
    return items;
}

async function createS3Bucket(event) {
    console.info("Received a request to create an S3 bucket");
    const config = buildConfig(event);
    const s3Client = new S3Client(config);
    let bucketName =
        event.sessionState.intent.slots.bucketName.value.originalValue.toLowerCase();

    try {
        await s3Client.send(
            new CreateBucketCommand({ Bucket: bucketName, ACL: "private" }),
        );
    } catch (err) {
        if (err.name === "BucketAlreadyExists") {
            const timeSuffix = new Date().toISOString().replace(/:/g, "-");
            bucketName = `${bucketName}-${timeSuffix}`;
            await s3Client.send(
                new CreateBucketCommand({ Bucket: bucketName, ACL: "private" }),
            );
        } else {
            throw err;
        }
    }

    const sessionAttributes = updateSessionAttributes(
        event,
        "s3-new-bucket",
        bucketName,
    );
    const message = `A new S3 bucket was created with the following name: ${bucketName}`;
    console.info(message);
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

async function copyToNewBucket(event) {
    console.info("Received a request to copy files to a new S3 bucket");
    const config = buildConfig(event);
    const s3Client = new S3Client(config);
    const sessionAttributes = event.sessionState.sessionAttributes;
    const newBucketName = sessionAttributes["s3-new-bucket"];
    const s3Objects = JSON.parse(sessionAttributes["s3-found-objects"]);

    for (const obj of s3Objects) {
        await s3Client.send(
            new CopyObjectCommand({
                Bucket: newBucketName,
                CopySource: `${obj.Bucket}/${obj.Key}`,
                Key: obj.Key,
            }),
        );
    }

    const message = `${s3Objects.length} target files/objects were successfully copied to new bucket ${newBucketName}`;
    console.info(message);
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

async function replaceRules(event) {
    console.info("Received a request to modify security group rules");
    const config = buildConfig(event);
    const ec2Client = new EC2Client(config);
    const myIpAddress = "76.243.176.78/32";
    const slots = event.sessionState.intent.slots;
    const allowedIpAddress = slots.ipAddress?.value?.originalValue
        ? `${slots.ipAddress.value.originalValue}/32`
        : myIpAddress;

    const sgResponse = await ec2Client.send(
        new DescribeSecurityGroupsCommand({}),
    );
    const securityGroupId = sgResponse.SecurityGroups.find(
        (sg) => sg.GroupName === "default",
    ).GroupId;
    const sessionAttributes = event.sessionState.sessionAttributes;
    const selectedRules = JSON.parse(sessionAttributes["sg-open-rules"]);

    const modifiedRules = selectedRules.map((rule) => {
        const modifiedRule = JSON.parse(JSON.stringify(rule));
        modifiedRule.IpRanges[0].CidrIp = allowedIpAddress;
        return modifiedRule;
    });

    await ec2Client.send(
        new RevokeSecurityGroupIngressCommand({
            GroupId: securityGroupId,
            IpPermissions: selectedRules,
        }),
    );
    await ec2Client.send(
        new AuthorizeSecurityGroupIngressCommand({
            GroupId: securityGroupId,
            IpPermissions: modifiedRules,
        }),
    );

    const message = `Selected security group rules have been modified to allow traffic from: ${allowedIpAddress}`;
    console.info(message);
    return prepareResponse(
        event.sessionState.intent.name,
        sessionAttributes,
        message,
    );
}

// Utility Functions
function updateSessionAttributes(event, paramName, paramValue) {
    const sessionAttributes = event.sessionState.sessionAttributes || {};
    sessionAttributes[paramName] = paramValue;
    return sessionAttributes;
}

function prepareResponse(
    intentName,
    sessionAttributes,
    message,
    contexts = [],
) {
    return {
        sessionState: {
            activeContexts: contexts,
            dialogAction: { type: "Close" },
            intent: { name: intentName, state: "Fulfilled" },
            sessionAttributes,
        },
        messages: [{ contentType: "PlainText", content: message }],
    };
}

// Dispatch function
async function dispatch(event) {
    const intentName = event.sessionState.intent.name;
    switch (intentName) {
        case "ec2-list":
            return await listInstances(event);
        case "ec2-create":
            return await createInstance(event);
        case "ec2-terminate":
            return await terminateInstances(event);
        case "set-region":
            return changeRegion(event);
        case "sg-rule-list":
            return await listRules(event);
        case "sg-rule-replace":
            return await replaceRules(event);
        case "s3-list-buckets":
            return await listS3Buckets(event);
        case "s3-search":
            return await searchS3(event);
        case "s3-create-bucket":
            return await createS3Bucket(event);
        case "s3-copy-to-new-bucket":
            return await copyToNewBucket(event);
        default:
            throw new Error(`Intent with name ${intentName} not supported`);
    }
}

// Main Lambda handler
exports.handler = async (event, context) => {
    console.info(JSON.stringify(event));
    console.info(JSON.stringify(context));
    // Timezone handling is skipped as Node.js doesn't have a direct equivalent
    return await dispatch(event);
};
