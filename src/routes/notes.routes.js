const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditform,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

const {isAuthenticated} = require('../helpers/auth')

//new note
router.get("/notes/add",isAuthenticated, renderNoteForm);

router.post("/notes/add",isAuthenticated,createNewNote);

//get all notes
router.get("/notes",isAuthenticated, renderNotes);

//edit notes
router.get("/notes/edit/:id", isAuthenticated,renderEditform);

router.put("/notes/edit/:id",isAuthenticated, updateNote);

//delete notes
router.delete("/notes/delete/:id",isAuthenticated, deleteNote);

module.exports = router;
