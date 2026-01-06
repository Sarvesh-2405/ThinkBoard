import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const CATEGORIES = ['Personal', 'Work', 'Ideas', 'Important', 'Other'];

function NoteForm({ onSubmit, onCancel, editingNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
            setCategory(editingNote.category || '');
            setTags(editingNote.tags ? editingNote.tags.join(', ') : '');
            setIsPinned(editingNote.isPinned || false);
        } else {
            setTitle('');
            setContent('');
            setCategory('');
            setTags('');
            setIsPinned(false);
        }
    }, [editingNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            const tagsArray = tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            onSubmit({
                title,
                content,
                category,
                tags: tagsArray,
                isPinned
            });
            setTitle('');
            setContent('');
            setCategory('');
            setTags('');
            setIsPinned(false);
        }
    };

    return (
        <div className="note-form-overlay">
            <div className="note-form-container">
                <div className="note-form-header">
                    <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
                    <button className="close-btn" onClick={onCancel}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="note-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter note title..."
                            maxLength="100"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            rows="8"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">None</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group checkbox-group">
                            <label htmlFor="isPinned" className="checkbox-label">
                                <input
                                    type="checkbox"
                                    id="isPinned"
                                    checked={isPinned}
                                    onChange={(e) => setIsPinned(e.target.checked)}
                                />
                                <span>Pin this note</span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Tags (comma-separated)</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. important, work, todo"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            {editingNote ? 'Update Note' : 'Save Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NoteForm;
