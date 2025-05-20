# 🌥️ CloudBot Project

**Conversational AI for AWS Cloud Management**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Issues](https://img.shields.io/github/issues/CloudBotProject/cloud-bot-project)](https://github.com/CloudBotProject/cloud-bot-project/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/CloudBotProject/cloud-bot-project)](https://github.com/CloudBotProject/cloud-bot-project/pulls)

---

## 🚀 Overview

**CloudBot** is a serverless AI chatbot that helps users manage AWS services using natural language via a web interface. Built with **React** and **Vite**, and powered by **Amazon Lex**, **AWS Amplify**, and **Amazon Cognito**, it's designed to simplify cloud operations through conversational UI.

---

## 🎯 Features

- 🧠 Natural language AWS queries
- ⚙️ Real-time interaction with services like EC2 and S3
- 🔐 Secure authentication via AWS Cognito
- 🚀 Serverless backend powered by Amplify and Lex
- 💡 Easily extensible architecture

---

## 🧰 Tech Stack

| Layer            | Technology                |
|------------------|---------------------------|
| Frontend         | React, Vite               |
| Chat & NLU       | Amazon Lex                |
| Authentication   | Amazon Cognito            |
| Hosting & Infra  | AWS Amplify               |
| Optional Backend | AWS Lambda (for actions)  |

---

## 🧱 Architecture

```
React + Vite (Frontend)
        ↓
    AWS Amplify (Hosting, Config)
        ↓
   +------------+
   | Amazon Lex | <--- Intents + Utterances
   +------------+
        ↓
Amazon Lambda (Optional logic) → AWS APIs (e.g., EC2, S3)
        ↓
  JSON Response to Frontend
```

---

## 📦 Project Structure

```
cloud-bot-project/
├── amplify/               # AWS backend config (Auth, Lex, etc.)
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── App.jsx            # Main app logic
│   └── main.jsx           # App entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js (v14 or higher)
- AWS Account & IAM user
- AWS CLI + Amplify CLI (`npm install -g @aws-amplify/cli`)

### 📥 Installation

```bash
git clone https://github.com/CloudBotProject/cloud-bot-project.git
cd cloud-bot-project
npm install
```

### 🔧 Setup Amplify Backend

```bash
amplify init
amplify add auth
amplify add interactions
amplify push
```

Use the prompts to create an Amazon Lex bot and enable authentication.

### ▶️ Run Locally

```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## 💬 Usage

1. Log in (if Cognito is configured)
2. Type AWS-related commands in chat, e.g.:
   - _“List EC2 instances”_
   - _“Show my S3 buckets”_
3. Receive structured, friendly responses from AWS

---

## 🛠️ Troubleshooting

- **Lex bot not responding?**
  - Make sure intents are trained in the AWS Console.
  - Check if `amplify push` was successful.
- **Amplify Auth issues?**
  - Try `amplify pull` to re-sync local state.
  - Make sure Cognito is deployed and configured.
- **App not loading?**
  - Confirm `npm install` ran without errors.
  - Restart the dev server with `npm run dev`.

---

## 🌍 Deployment

To deploy on AWS Amplify Hosting:

```bash
amplify add hosting
amplify publish
```

Or use static hosting platforms like Vercel/Netlify with:

```bash
npm run build
```

---

## 📘 Contributing

1. Fork the repo
2. Create a feature branch (`feature/xyz`)
3. Commit your changes
4. Push to your fork
5. Submit a Pull Request

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- [Amazon Lex](https://aws.amazon.com/lex/)
- [AWS Amplify](https://docs.amplify.aws/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)

---

## 📫 Contact

Have suggestions or ideas? Open an [issue](https://github.com/CloudBotProject/cloud-bot-project/issues) or submit a [pull request](https://github.com/CloudBotProject/cloud-bot-project/pulls).
