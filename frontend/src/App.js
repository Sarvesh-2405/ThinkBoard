import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import FilterSort from './components/FilterSort';
import api from './services/api';
import './styles/themes.css';
import './App.css';

function AppContent() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch all notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes. Please make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await api.createNote(noteData);
      setNotes([newNote, ...notes]);
      setShowForm(false);
    } catch (err) {
      alert('Failed to create note. Please try again.');
      console.error(err);
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      const updatedNote = await api.updateNote(editingNote._id, noteData);
      setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
      setShowForm(false);
      setEditingNote(null);
    } catch (err) {
      alert('Failed to update note. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.deleteNote(id);
        setNotes(notes.filter(note => note._id !== id));
      } catch (err) {
        alert('Failed to delete note. Please try again.');
        console.error(err);
      }
    }
  };

  const handleTogglePin = async (note) => {
    try {
      const updatedNote = await api.updateNote(note._id, {
        ...note,
        isPinned: !note.isPinned
      });
      setNotes(notes.map(n => n._id === updatedNote._id ? updatedNote : n));
    } catch (err) {
      alert('Failed to pin/unpin note. Please try again.');
      console.error(err);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  const handleSubmitForm = (noteData) => {
    if (editingNote) {
      handleUpdateNote(noteData);
    } else {
      handleCreateNote(noteData);
    }
  };

  // Filter and sort notes
  const getFilteredAndSortedNotes = () => {
    let filtered = [...notes];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (category) {
      filtered = filtered.filter(note => note.category === category);
    }

    // Sort
    filtered.sort((a, b) => {
      // Always keep pinned notes at top
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Then sort by selected criteria
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'updated':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  const filteredNotes = getFilteredAndSortedNotes();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h1>NoteApp</h1>
          </div>
          <div className="header-actions">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <ThemeToggle />
            <button className="btn-new-note" onClick={() => setShowForm(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Note
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <FilterSort
            category={category}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading notes...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>Connection Error</h3>
              <p>{error}</p>
              <button className="btn-retry" onClick={fetchNotes}>Retry</button>
            </div>
          ) : (
            <NoteList
              notes={filteredNotes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onTogglePin={handleTogglePin}
            />
          )}
        </div>
      </main>

      {showForm && (
        <NoteForm
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
          editingNote={editingNote}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
