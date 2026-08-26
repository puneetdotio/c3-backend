const express = require("express");
const { createNotesController, getAllNotesController, getSingleNoteController, updatedNotesController, singleEntityUpdateController, deleteNoteController } = require("../controlles/notes.controller");

const router = express.Router();

// CREATE
router.post("/create", createNotesController)

// READ
router.get("/allNotes", getAllNotesController)

// single note 
router.get("/:id", getSingleNoteController)

// update via put
router.put("/:id", updatedNotesController)

// update via patch
router.patch("/:id/single", singleEntityUpdateController)

// DELETE
router.delete("/:id", deleteNoteController)

module.exports = router;