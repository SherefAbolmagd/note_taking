const db = require("../models");
const { client } = require("../middleware/cacheMiddleware");
const logger = require("../class/logger"); // Import the logger
const NoteFactory = require("../class/note");

// Create a new note
async function newNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new NoteFactory().createPersonalNote(title, content);
    const userId = req.user.id;

    const newNote = await db.Note.create({ ...note, userId });

    const cacheKey = `notes:${userId}`;

    client.del(cacheKey);

    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    logger.log(error);
    const logs = logger.getLogs();
    console.log(logs); // Print the logs
    res.status(500).json({ error: "Internal server error" });
  }
}

// Retrieve all notes
async function getAllNote(req, res) {
  try {
    const userId = req.user.id;

    const notes = await db.Note.findAll({ where: { userId } });

    // Cache the data in Redis for future use (with an expiration time, e.g., 1 hour)
    const cacheKey = `notes:${userId}`;
    client.setex(cacheKey, 3600, JSON.stringify(notes));

    res.status(200).json(notes);
  } catch (error) {
    logger.log(error);
    const logs = logger.getLogs();
    console.log(logs); // Print the logs
    res.status(500).json({ error: "Internal server error" });
  }
}

// Retrieve a specific note by ID
async function getNoteById(req, res) {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await db.Note.findOne({ where: { id: noteId, userId } });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    logger.log(error);
    const logs = logger.getLogs();
    console.log(logs); // Print the logs
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update a specific note by ID
async function updateNoteById(req, res) {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;

    const [updatedRowCount] = await db.Note.update(
      { title, content },
      { where: { id: noteId, userId } }
    );

    if (updatedRowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    logger.log(error);
    const logs = logger.getLogs();
    console.log(logs); // Print the logs
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete a specific note by ID
async function deleteNoteById(req, res) {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const deletedRowCount = await db.Note.destroy({
      where: { id: noteId, userId },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(204).send();
  } catch (error) {
    logger.log(error);
    const logs = logger.getLogs();
    console.log(logs); // Print the logs
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  deleteNoteById,
  updateNoteById,
  getNoteById,
  getAllNote,
  newNote,
};
