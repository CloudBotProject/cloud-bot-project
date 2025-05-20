import { useState, useRef, useEffect } from "react";
import { sendMessageToLex } from "../lexConnect";
import "../styles/Chatbot.css";

const Home = () => {
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Hello! I'm your AI assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef();

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            from: "user",
            text: input,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await sendMessageToLex(input);

            const botMessage = {
                from: "bot",
                text:
                    response ||
                    "I'm sorry, I didn't get that. Could you please rephrase?",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            inputRef.current.focus();
        } catch (error) {
            console.error("Error calling backend:", error);
            const errorMessage = {
                from: "bot",
                text: "Sorry, I'm having trouble connecting to the service right now.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !isTyping) sendMessage();
    };

    const toggleMinimize = () => setIsMinimized(!isMinimized);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    if (isMinimized) {
        return (
            <div
                className={`chatbot-minimized ${darkMode ? "dark" : ""}`}
                onClick={toggleMinimize}
            >
                <div className="minimized-content">
                    <div className="minimized-avatar">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                                fill="currentColor"
                            />
                            <path
                                d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
                                fill="currentColor"
                            />
                            <path
                                d="M6.42 18.78C7.08 17.63 8.14 16.77 9.38 16.37C10.62 15.97 11.96 16.05 13.14 16.6C14.32 17.15 15.24 18.12 15.71 19.31C16.18 20.5 16.17 21.82 15.68 23C15.19 24.18 14.25 25.13 13.07 25.56C11.89 25.99 10.56 25.87 9.45 25.23C8.34 24.59 7.53 23.48 7.19 22.18C6.85 20.88 7.01 19.5 7.62 18.31L6.42 18.78Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div className="minimized-text">
                        <span>AI Assistant</span>
                        {messages.length > 1 && (
                            <div className="message-preview">
                                {messages[messages.length - 1].text.substring(
                                    0,
                                    20,
                                )}
                                ...
                            </div>
                        )}
                    </div>
                    <div className="notification-dot"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`chatbot-container ${darkMode ? "dark" : ""}`}>
            <div className="chat-header">
                <div className="header-content">
                    <div className="avatar">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                                fill="currentColor"
                            />
                            <path
                                d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
                                fill="currentColor"
                            />
                            <path
                                d="M6.42 18.78C7.08 17.63 8.14 16.77 9.38 16.37C10.62 15.97 11.96 16.05 13.14 16.6C14.32 17.15 15.24 18.12 15.71 19.31C16.18 20.5 16.17 21.82 15.68 23C15.19 24.18 14.25 25.13 13.07 25.56C11.89 25.99 10.56 25.87 9.45 25.23C8.34 24.59 7.53 23.48 7.19 22.18C6.85 20.88 7.01 19.5 7.62 18.31L6.42 18.78Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div className="header-text">
                        <h3>AI Assistant</h3>
                        <p>{isTyping ? "Typing..." : "Online"}</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleDarkMode}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {darkMode ? (
                                <path
                                    d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19Z"
                                    fill="currentColor"
                                />
                            ) : (
                                <path
                                    d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19V5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19Z"
                                    fill="currentColor"
                                />
                            )}
                        </svg>
                    </button>
                    <button className="minimize-btn" onClick={toggleMinimize}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M19 13H5V11H19V13Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="chat-history">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`chat-message ${msg.from}`}>
                        <div className="message-content">
                            {msg.text}
                            <div className="message-timestamp">
                                {msg.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="chat-message bot">
                        <div className="typing-indicator">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="chat-input-container">
                <div className="chat-input">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isTyping}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isTyping}
                        className={!input.trim() || isTyping ? "disabled" : ""}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22 2L11 13"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M22 2L15 22L11 13L2 9L22 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="input-footer">
                    <small>
                        AI Assistant may produce inaccurate information
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Home;
