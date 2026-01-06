const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['Personal', 'Work', 'Ideas', 'Important', 'Other', ''],
        default: ''
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
