import React from 'react';
import './NoteItem.css';

const CATEGORY_COLORS = {
    'Personal': '#10b981',
    'Work': '#3b82f6',
    'Ideas': '#f59e0b',
    'Important': '#ef4444',
    'Other': '#8b5cf6'
};

function NoteItem({ note, onEdit, onDelete, onTogglePin }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className={`note-item ${note.isPinned ? 'pinned' : ''}`}>
            {note.isPinned && (
                <div className="pin-indicator">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
                    </svg>
                </div>
            )}
            <div className="note-content">
                <div className="note-header">
                    <h3 className="note-title">{note.title}</h3>
                    <button
                        className={`btn-pin ${note.isPinned ? 'active' : ''}`}
                        onClick={() => onTogglePin(note)}
                        title={note.isPinned ? 'Unpin note' : 'Pin note'}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={note.isPinned ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                            <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
                        </svg>
                    </button>
                </div>
                <p className="note-text">{note.content}</p>
                {(note.category || (note.tags && note.tags.length > 0)) && (
                    <div className="note-badges">
                        {note.category && (
                            <span
                                className="category-badge"
                                style={{ backgroundColor: CATEGORY_COLORS[note.category] || '#8b5cf6' }}
                            >
                                {note.category}
                            </span>
                        )}
                        {note.tags && note.tags.map((tag, index) => (
                            <span key={index} className="tag-badge">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className="note-meta">
                    <span className="note-date">
                        {formatDate(note.updatedAt || note.createdAt)}
                    </span>
                </div>
            </div>
            <div className="note-actions">
                <button className="btn-edit" onClick={() => onEdit(note)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(note._id)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default NoteItem;
