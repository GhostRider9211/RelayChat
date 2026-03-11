# RelayChat

RelayChat is a **real-time scalable chat application** built using Socket.io.  
The system is designed to support **distributed messaging across multiple server instances** using **Redis adapter for horizontal scaling**.

The project demonstrates concepts like **real-time communication, event-driven architecture, and scalable message broadcasting**.

---

## Features

- Real-time messaging using Socket.io
- Multi-user chat support
- Scalable architecture with Redis adapter
- Docker-based infrastructure setup
- Modern React frontend

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Socket.IO

### Infrastructure

- Redis (Socket.IO Redis Adapter for scaling)
- Docker (containerized services)

---

## Architecture Overview

RelayChat uses a **distributed event-driven architecture**:

1. Clients connect to the server using **WebSockets (Socket.IO)**.
2. Messages are emitted to the backend server.
3. The server saves messages directly to the database.
4. **Redis Adapter synchronizes Socket.IO events across instances**.

This allows the chat system to scale horizontally across multiple backend servers.

---

## Project Structure

```
RelayChat
│
├── client/        # React frontend
├── server/        # Node.js backend
├── docker/        # Docker services (Redis)
├── README.md
```

---

## Prerequisites

Make sure you have installed:

- Node.js
- Docker
- Docker Compose

---

## Installation

Clone the repository:

```bash
git clone https://github.com/GhostRider9211/RelayChat.git
cd RelayChat
```

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

---

## Running Infrastructure (Redis)

Start services using Docker:

```bash
docker-compose up -d
```

This starts:

- Redis

---

## Running the Application

Start backend server:

```bash
cd server
npm run dev
```

Start frontend:

```bash
cd client
npm start
```

Open the app:

```
http://localhost:3000
```

---

## Future Improvements

- Authentication (JWT / OAuth)
- Message persistence (PostgreSQL)
- File and image sharing
- Read receipts
- Message encryption
- Production deployment

---

## License

This project is licensed under the MIT License.

---

## Author

Yuvansh  
GitHub: https://github.com/GhostRider9211
