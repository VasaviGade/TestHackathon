# PROJECT SPECIFICATION SHEET

## Project Name: PermitPath AI

**Project Title:** Hyper-Local Regulatory & Permitting Navigator for Micro-Businesses

**Hackathon Track:** Track 1 – Civic Pulse: Digital Governance & Public Information

## 1. Project Overview

PermitPath AI is an AI-powered web application that helps small business owners understand the government permissions, licenses, documents, and regulations required to start and operate their businesses.

Users can enter their business type and location or ask questions using voice. The AI assistant retrieves relevant government regulations and explains them in simple language.

The application generates personalized, step-by-step compliance checklists and supports regional languages.

## 2. Problem Statement

Small business owners, street vendors, food stall owners, and home-based entrepreneurs often struggle to understand complicated government licensing procedures.

Government regulations are scattered across different websites and documents and are often difficult to understand.

PermitPath AI aims to make this information accessible through a simple, multilingual AI assistant.

## 3. Target Users

- Street vendors
- Tea stall owners
- Small food business owners
- Home-based bakery owners
- Small shop owners
- Local artisans and entrepreneurs

## 4. Initial Project Scope

For the first version, focus on:

**Location:** Hyderabad, Telangana, India.

**Business categories:**
1. Tea stall
2. Food stall
3. Home bakery

The application should be designed so more cities and business categories can be added later.

## 5. Main Features

### Feature 1: User Input

Create a form where users can enter:

- Business name (optional)
- Business type
- City
- Area or locality
- Preferred language

Allow users to enter their questions through text or voice.

### Feature 2: AI Regulatory Assistant

Integrate an AI model using the Gemini API.

The assistant should:

- Understand the user's business type and location.
- Answer questions about applicable licenses and permissions.
- Explain government rules in simple language.
- Ask follow-up questions when important information is missing.
- Avoid generating unsupported legal or regulatory claims.

### Feature 3: Government Document Search (RAG)

Implement Retrieval-Augmented Generation (RAG).

The system should:

1. Load relevant government PDF documents.
2. Extract text from the documents.
3. Divide the text into smaller chunks.
4. Generate embeddings.
5. Store embeddings in ChromaDB.
6. Retrieve relevant information when a user asks a question.
7. Send retrieved information to Gemini to generate an answer.

Answers must include document names and relevant source references wherever available.

Use official government documents as the knowledge base. If verified documents are unavailable during development, use clearly labelled sample documents for demonstration.

### Feature 4: Personalized Compliance Checklist

Generate a checklist based on the user's business type and location.

Include:

- Potentially required licenses and permissions.
- Documents needed.
- Application procedure.
- Government department or authority.
- Official application links, when verified.
- Fees, only when supported by a current official source.

Allow users to mark checklist items as completed.

Clearly distinguish confirmed requirements from items that need verification.

### Feature 5: Regional Language Support

Initially support:

- English
- Telugu

Allow users to select their preferred language.

The AI assistant should provide responses in the selected language.

### Feature 6: Voice Interaction

Implement:

- Speech-to-Text (STT): Convert the user's speech into text.
- Text-to-Speech (TTS): Read the AI response aloud.

Use a suitable speech API that supports English and Telugu.

Provide a microphone button and an audio playback button.

Text interaction must remain available if voice services are unavailable.

## 6. Application Pages

### Page 1: Home Page

Display:

- Project name and logo.
- Short description.
- Start Now button.
- Main features.
- Supported languages.

### Page 2: Business Information

Provide a form to enter:

- Business type.
- City.
- Area/locality.
- Preferred language.

Include a Continue button.

### Page 3: AI Assistant Dashboard

Display:

- AI chat interface.
- Text input.
- Microphone button.
- Send button.
- Language selector.

Users should be able to ask questions about their business permissions.

### Page 4: Compliance Checklist

Display:

- Required or potentially required permissions.
- Documents needed.
- Application steps.
- Official source references.
- Completion checkboxes.

### Page 5: Government Information

Display relevant government document information and source references used by the AI.

## 7. Recommended Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Backend | Python + FastAPI |
| AI Model | Google Gemini API |
| RAG Framework | LangChain or custom Python pipeline |
| Vector Database | ChromaDB |
| Embeddings | Suitable multilingual embedding model |
| Database | SQLite |
| PDF Processing | PyMuPDF |
| Speech-to-Text | Whisper or supported speech API |
| Text-to-Speech | Bhashini or supported TTS API |

Use environment variables for API keys. Never expose secret keys in frontend code.

## 8. Expected Application Workflow

1. User opens PermitPath AI.
2. User selects a business type and enters their location.
3. User chooses English or Telugu.
4. User asks a question through text or voice.
5. Backend identifies the relevant business and location context.
6. RAG retrieves relevant government regulations.
7. Gemini generates a simple, grounded explanation.
8. Application displays the answer with source references.
9. User can generate a personalized compliance checklist.
10. User can ask additional questions or listen to the answer.

## 9. UI/UX Requirements

- Modern, clean and professional design.
- Simple navigation.
- Responsive design for mobile and desktop.
- Easy-to-understand language.
- Attractive dashboard and chat interface.
- Clear loading indicators and error messages.
- Accessible buttons and readable text.
- Support for English and Telugu text.

## 10. Important Rules

- Do not invent government licenses, fees, deadlines, or application links.
- Use official government sources wherever possible.
- Show references for regulatory answers.
- Clearly identify information that has not been verified.
- Do not claim that the application provides official legal approval or guarantees compliance.
- Do not require users to provide their exact street address. An area or locality should be sufficient for the initial version.
- Keep the application functional even if voice services are unavailable.

## 11. Expected Final Deliverable

Build a working full-stack web application named PermitPath AI.

The final application must allow a user to:

1. Select a business category.
2. Enter a location.
3. Chat with an AI regulatory assistant.
4. Receive answers grounded in government documents.
5. Generate an interactive compliance checklist.
6. View relevant source references.
7. Interact in English or Telugu.
8. Use voice input and audio responses when speech services are configured.

## 12. Development Instructions

- Build the project in small, testable stages.
- Create the frontend and backend with a clean folder structure.
- Keep the code modular and easy to understand.
- Provide a README with setup and execution instructions.
- Provide a `.env.example` file listing required environment variables.
- Handle API errors and missing configurations gracefully.
- Do not leave nonfunctional buttons or placeholder pages in the completed MVP.
- Test the complete user workflow before considering the project finished.

**Final Goal:** Create a functional AI-powered civic assistant that makes government licensing and regulatory information easier for small business owners to understand and act upon.