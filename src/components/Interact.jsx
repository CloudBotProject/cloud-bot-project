import React, { useState } from "react";
import { sendMessageToLex } from "../lexConnect";
import "../styles/Chatbot.css"; 
const Interact = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const botResponse = await sendMessageToLex(userMessage.text);

    const botMessage = {
      text: botResponse,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="header-content">
          <div className="avatar">🤖</div>
          <div className="header-text">
            <h3>CloudBot</h3>
            <p>Your cloud assistant</p>
          </div>
        </div>
      </div>

      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <div className="message-content">{msg.text}</div>
            <div className="message-timestamp">{msg.timestamp}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-message bot">
            <div className="message-content typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me something..."
          />
          <button onClick={handleSend} disabled={!input.trim() || loading}>
            ➤
          </button>
        </div>
        <div className="input-footer">
          <small>Powered by Amazon Lex</small>
        </div>
      </div>
    </div>
  );
};

export default Interact;
