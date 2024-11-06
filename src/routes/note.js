const express = require("express");
const router = express.Router();
const noteController = require("../controller/NoteController");
const { cacheNotes } = require("../middleware/cacheMiddleware");

// Create a new note
router.post("/", noteController.newNote);

// Retrieve all notes
router.get("/", cacheNotes, noteController.getAllNote);

// Retrieve a specific note by ID
router.get("/:id", noteController.deleteNoteById);

// Update a specific note by ID
router.put("/:id", noteController.updateNoteById);

// Delete a specific note by ID
router.delete("/:id", noteController.deleteNoteById);

module.exports = router;
