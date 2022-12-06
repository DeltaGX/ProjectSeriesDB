const express= require("express");
const router = express.Router();
const {
  createEpisodeNote,
  deleteEpisodeNote,
  getEpisodeNote,
  getEpisodeNotes,
  updateEpisodeNote,
} = require("../controllers/EpisodeNote.js");
const {verifyUser}= require("../config/verifyToken.js");

router.post("/:id/:contid", verifyUser, createEpisodeNote);
//UPDATE
router.put("/:id/:contid/", verifyUser, updateEpisodeNote);
//DELETE
router.delete("/:id/:contid/:noteid", verifyUser, deleteEpisodeNote);
//GET 
router.get("/:id/:contid", getEpisodeNote);
//GET ALL EpisodeNote
router.get("/:contid", getEpisodeNotes);

module.exports = router