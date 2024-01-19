// Create web server
// Use express.js

const express = require('express');
const router = express.Router();
const comments = require('../comments');

// Get all comments
router.get('/', (req, res) => {
    res.json(comments.getComments());
});

// Get comment by id
router.get('/:id', (req, res) => {
    const comment = comments.getComment(parseInt(req.params.id));
    if(comment) {
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// Add new comment
router.post('/', (req, res) => {
    const { error } = comments.validateComment(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const comment = comments.addComment(req.body.name, req.body.content);
    res.json(comment);
});

// Update comment
router.put('/:id', (req, res) => {
    const comment = comments.getComment(parseInt(req.params.id));
    if(!comment) {
        res.status(404).send('Comment not found');
        return;
    }

    const { error } = comments.validateComment(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    comment.name = req.body.name;
    comment.content = req.body.content;
    res.json(comment);
});

// Delete comment
router.delete('/:id', (req, res) => {
    const comment = comments.getComment(parseInt(req.params.id));
    if(!comment) {
        res.status(404).send('Comment not found');
        return;
    }

    const index = comments.comments.indexOf(comment);
    comments.comments.splice(index, 1);
    res.json(comment);
});

module.exports = router;
