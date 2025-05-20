import {
    LexRuntimeV2Client,
    RecognizeTextCommand,
} from "@aws-sdk/client-lex-runtime-v2";
import { fetchAuthSession } from "aws-amplify/auth";

const REGION = "eu-central-1";
const BOT_ID = "8ETAN8TJ9U";
const BOT_ALIAS_ID = "TSTALIASID";
const BOT_LOCALE_ID = "en_US";

export async function sendMessageToLex(message) {
    const session = await fetchAuthSession();
    const credentials = session.credentials;
    const userId = session.identityId;

    const client = new LexRuntimeV2Client({
        region: REGION,
        credentials: {
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
        },
    });

    const command = new RecognizeTextCommand({
        botId: BOT_ID,
        botAliasId: BOT_ALIAS_ID,
        localeId: BOT_LOCALE_ID,
        sessionId: userId,
        text: message,
    });

    try {
        const response = await client.send(command);
        const messages = response.messages || [];
        const responseText = messages.map((msg) => msg.content).join("\n");
        return responseText || "sowwy i didn't get that uwu";
    } catch (error) {
        console.error("Lex Error:", error);
        return "oops, i think an error occured. " + error;
    }
}
