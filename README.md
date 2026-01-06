# NoteApp

A modern, feature-rich note-taking application built with React and Node.js.

## Features

- 📝 Create, edit, and delete notes
- 🎨 Multiple themes (Light, Dark, Sunset, Ocean, Forest)
- 📌 Pin important notes
- 🔍 Search functionality
- 🏷️ Category filtering (Personal, Work, Ideas, Todo)
- 📊 Sort by date, title, or last updated
- 💾 MongoDB database integration
- 🎯 Clean and intuitive UI

## Tech Stack

### Frontend
- React
- CSS3 with custom themes
- Context API for state management

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- CORS enabled

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
NoteApp/
├── backend/
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── notes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Usage

1. Click "New Note" to create a note
2. Select a category and add content
3. Use the search bar to find notes
4. Filter by category or sort by different criteria
5. Pin important notes to keep them at the top
6. Switch themes using the theme toggle

## License

MIT
