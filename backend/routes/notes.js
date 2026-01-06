const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes with search, filter, and sort
router.get('/', async (req, res) => {
    try {
        const { search, category, tag, sort } = req.query;

        // Build query
        let query = {};

        // Search in title and content
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by tag
        if (tag) {
            query.tags = tag;
        }

        // Determine sort order
        let sortOption = { isPinned: -1, createdAt: -1 }; // Default: pinned first, then newest

        if (sort === 'title') {
            sortOption = { isPinned: -1, title: 1 };
        } else if (sort === 'updated') {
            sortOption = { isPinned: -1, updatedAt: -1 };
        } else if (sort === 'oldest') {
            sortOption = { isPinned: -1, createdAt: 1 };
        }

        const notes = await Note.find(query).sort(sortOption);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes', message: error.message });
    }
});

// GET single note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch note', message: error.message });
    }
});

// POST create new note
router.post('/', async (req, res) => {
    try {
        const { title, content, isPinned, category, tags } = req.body;

        // Validation
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const note = new Note({
            title,
            content,
            isPinned: isPinned || false,
            category: category || '',
            tags: tags || []
        });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create note', message: error.message });
    }
});

// PUT update note
router.put('/:id', async (req, res) => {
    try {
        const { title, content, isPinned, category, tags } = req.body;

        // Validation
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const updateData = {
            title,
            content,
            isPinned: isPinned !== undefined ? isPinned : false,
            category: category || '',
            tags: tags || []
        };

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update note', message: error.message });
    }
});

// DELETE note
router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json({ message: 'Note deleted successfully', note: deletedNote });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note', message: error.message });
    }
});

module.exports = router;
