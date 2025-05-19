import { useEffect } from "react";
import styles from "../styles/About.module.css";

const About = () => {
    useEffect(() => {
        // Animation for elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.animated);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            `.${styles.animateOnView}`,
        );
        animatedElements.forEach((el) => observer.observe(el));

        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className={styles.aboutContainer}>
            <section className={styles.heroSection}>
                <div className={`${styles.heroContent} ${styles.animateOnView}`}>
                    <h1>About CloudBot</h1>
                    <p className={styles.tagline}>
                        Intelligent Conversations. Cloud Simplicity.
                    </p>
                </div>
                <div className={styles.cloudAnimation}>
                    <div className={styles.cloudGroup}>
                        <div className={`${styles.floatingCloud} ${styles.cloud1}`}></div>
                        <div className={`${styles.floatingCloud} ${styles.cloud2}`}></div>
                        <div className={`${styles.floatingCloud} ${styles.cloud3}`}></div>
                    </div>
                </div>
            </section>

            <section className={styles.missionSection}>
                <div className={`${styles.sectionContent} ${styles.animateOnView}`}>
                    <h2>Our Mission</h2>
                    <p>
                        CloudBot was created with a simple yet powerful mission: to make
                        cloud technology accessible to everyone through conversational AI.
                        We believe that complex technology shouldn&apos;s require complex
                        interaction.
                    </p>
                    <div className={styles.missionPoints}>
                        <div className={styles.missionPoint}>
                            <div className={styles.missionIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 2V4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 20V22"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4.93 4.93L6.34 6.34"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M17.66 17.66L19.07 19.07"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 12H4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M20 12H22"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.34 17.66L4.93 19.07"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19.07 4.93L17.66 6.34"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h3>Intelligent</h3>
                            <p>
                                Powered by advanced AI to understand your needs and provide
                                tailored solutions for your cloud management.
                            </p>
                        </div>
                        <div className={styles.missionPoint}>
                            <div className={styles.missionIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 7H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M5 17H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <h3>Simple</h3>
                            <p>
                                CloudBot makes complex cloud operations accessible through
                                conversational interfaces, eliminating steep learning curves.
                            </p>
                        </div>
                        <div className={styles.missionPoint}>
                            <div className={styles.missionIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h3>Reliable</h3>
                            <p>
                                Built on secure foundations, CloudBot provides dependable
                                assistance when you need it, at any scale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.featuresSection}>
                <div className={`${styles.sectionContent} ${styles.animateOnView}`}>
                    <h2>What CloudBot Can Do</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h3>Natural Conversations</h3>
                            <p>
                                Engage in intuitive dialogue about your cloud needs without
                                learning complex commands.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h3>Smart Alerts</h3>
                            <p>
                                Receive proactive notifications about your cloud resources and
                                potential optimizations.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 9L12 16L5 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h3>Quick Deployment</h3>
                            <p>
                                Deploy and manage cloud resources through simple conversation,
                                saving you time and effort.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.53097C19.5521 2.604 18.2981 2.07815 16.9871 2.06675C15.6761 2.05536 14.4131 2.55931 13.47 3.46997L11.75 5.17997"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 11C13.5705 10.4259 13.0226 9.95078 12.3935 9.60707C11.7643 9.26336 11.0685 9.05897 10.3534 9.00775C9.63822 8.95652 8.92037 9.05961 8.24866 9.31024C7.57696 9.56086 6.96689 9.95293 6.46 10.46L3.46 13.46C2.54925 14.403 2.04525 15.666 2.05665 16.977C2.06804 18.288 2.59389 19.542 3.52086 20.469C4.44783 21.396 5.7019 21.9219 7.01288 21.9332C8.32386 21.9446 9.58688 21.4407 10.53 20.53L12.24 18.82"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h3>Seamless Integration</h3>
                            <p>
                                Connect with your existing cloud tools and platforms for a
                                unified management experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.teamSection}>
                <div className={`${styles.sectionContent} ${styles.animateOnView}`}>
                    <h2>Our Team</h2>
                    <p className={styles.teamIntro}>
                        CloudBot is built by a passionate team of cloud specialists and AI
                        experts dedicated to making cloud technology more accessible.
                    </p>
                    <div className={styles.teamMembers}>
                        <div className={styles.teamMember}>
                            <div className={styles.memberAvatar}>
                                <div className={styles.placeholderAvatar}></div>
                            </div>
                            <h3>Alex Rivera</h3>
                            <p>Founder & AI Engineer</p>
                        </div>
                        <div className={styles.teamMember}>
                            <div className={styles.memberAvatar}>
                                <div className={styles.placeholderAvatar}></div>
                            </div>
                            <h3>Sam Chen</h3>
                            <p>Cloud Architecture</p>
                        </div>
                        <div className={styles.teamMember}>
                            <div className={styles.memberAvatar}>
                                <div className={styles.placeholderAvatar}></div>
                            </div>
                            <h3>Jordan Lee</h3>
                            <p>UX Designer</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.contactSection}>
                <div className={`${styles.sectionContent} ${styles.animateOnView}`}>
                    <h2>Get In Touch</h2>
                    <p>
                        Have questions about CloudBot or want to learn more about how we can
                        help with your cloud management needs? Reach out to us!
                    </p>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.1276 3.62476 2.21586 3.36162C2.30413 3.09849 2.44627 2.85669 2.63285 2.65163C2.81943 2.44656 3.04677 2.28271 3.30059 2.17052C3.55442 2.05833 3.82875 2.00026 4.11 2H7.11C7.59545 1.99522 8.06421 2.16708 8.43152 2.48353C8.79883 2.79999 9.04344 3.23945 9.11 3.72C9.23679 4.68007 9.47345 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5266 19.3199 14.7632 20.28 14.89C20.7658 14.9574 21.2094 15.2032 21.5265 15.5721C21.8437 15.941 22.0139 16.4111 22 16.89V16.92Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3>Phone</h3>
                                <p>(123) 456-7890</p>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22 6L12 13L2 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3>Email</h3>
                                <p>info@cloudbot.com</p>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3>Location</h3>
                                <p>123 Cloud Street, San Francisco, CA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={`${styles.sectionContent} ${styles.animateOnView}`}>
                    <h2>Ready to simplify your cloud experience?</h2>
                    <p>
                        Start chatting with CloudBot today and discover how AI can transform
                        your cloud management.
                    </p>
                    <a href="/" className={styles.ctaButton}>
                        Try CloudBot Now
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;
