# Talk with PDF

**Talk with PDF** is a web application that allows users to ask questions and get instant answers from the contents of large PDF files without the need to scroll through them. The application leverages powerful AI tools like Langchain, Ollama (with models like gemma3:1b and nomic-embed-text), Qdrant for vector databases, Redis for queue management, and integrates Next.js for the frontend and Express.js for the backend.

---

## Features

- **Instant Interaction with PDFs:** No need to scroll or search manually through long PDFs. Just upload your PDF and start asking questions.
- **AI-Powered:** Uses advanced AI models (Gemma3:1b, Nomic-Embed-Text) to process the PDF and answer your queries.
- **Queue System:** Redis is used to manage the PDF processing queue, ensuring smooth operation even with multiple concurrent requests.
- **Vector Search:** Qdrant stores PDF embeddings, allowing fast and efficient search for relevant answers to your questions.
- **Efficient Backend & Frontend Integration:** The system utilizes Express.js for the backend and Next.js for the frontend to provide a seamless user experience.

---

## Tech Stack

- **Frontend:** Next.js
- **Backend:** Express.js
- **Queue System:** Redis
- **AI & NLP:** Langchain, Ollama (models gemma3:1b, nomic-embed-text)
- **Vector Database:** Qdrant

---

## Getting Started

### Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [Redis](https://redis.io/download) (for queue management)
- [Docker](https://www.docker.com/get-started) (for running Qdrant and Ollama models locally)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/krishna102001/talk-with-pdf.git
   cd talk-with-pdf
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   cd server
   npm install
   cd worker
   npm install
   ```
3. Run docker command

   ```bash
   docker compose up
   ```

4. Run frontend

   ```bash
   cd client
    npm run dev
   ```

5. Run backend

   ```bash
   cd server
   tsc -b
   npm start
   ```

6. Run Worker
   ```bash
   cd worker
   tsc -b
   npm start
   ```

# Your setup is done 🔥
