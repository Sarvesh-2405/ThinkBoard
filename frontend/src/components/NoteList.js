import React from 'react';
import NoteItem from './NoteItem';
import './NoteList.css';

function NoteList({ notes, onEdit, onDelete, onTogglePin }) {
    if (notes.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                </div>
                <h3>No notes yet</h3>
                <p>Create your first note to get started!</p>
            </div>
        );
    }

    return (
        <div className="note-list">
            {notes.map((note) => (
                <NoteItem
                    key={note._id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onTogglePin={onTogglePin}
                />
            ))}
        </div>
    );
}

export default NoteList;
