const {OnlineCont,User} = require("../models/User.js");
const EpisodeNote = require("../models/EpisodeNote.js")

module.exports ={
createEpisodeNote: async function(req, res, next){  
      const newEpisodeNote = new EpisodeNote(
        {
          Userid: req.params.id,
          Contid: req.params.contid,
          SeasonNote: req.body
        }
      );
      try {
      const savedEpisodeNote = await newEpisodeNote.save();
      res.status(200).json(savedEpisodeNote);
    } catch (err) {
      next(err);
    }
},

updateEpisodeNote: async function(req, res, next){
  // const testexist = await EpisodeNote.countDocuments({"Userid":req.params.id, "Contid":req.params.contid})
  // const testnoteexist = await EpisodeNote.countDocuments({
  //                                                         "SeasonNote.Season":req.body.Season, 
  //                                                         "SeasonNote.EpisodeNote.Episode":req.body.EpisodeNote.Episode
  //                                                       })
  // console.log(req.body.EpisodeNote.Contid)
try {
    const updatedEpisodeNote = await EpisodeNote.findOneAndUpdate(
      {"Userid":req.params.id, "Contid":req.params.contid},
      {$set: {"SeasonNote.$[element2].EpisodeNote.$[element]": req.body}},
      { runValidators: true, 
        arrayFilters: [{ 
          "element2.Season":req.body.Season
        },{
          "element.Episode":req.body.Episode 
        }],
        new: true,
      }
    );
    res.status(200).json(updatedEpisodeNote);
  } catch (err) {
    next(err);
  }
},


deleteEpisodeNote: async function(req, res, next){
  try {
    const deletenote = await EpisodeNote.findOneAndUpdate(
      {"Userid":req.params.id, "Contid":req.params.contid}, { 
      $pull: { 
        SeasonNote: {
          EpisodeNote:
          {
            _id: req.params.noteid
          }
        }
      } 
    })
    res.status(200).json(deletenote);
  } catch (err) {
    next(err);
  }
},

getEpisodeNote: async function (req, res, next){
  try {
    const Note = await EpisodeNote.findOne({"Userid":req.params.id, "Contid":req.params.contid});
    res.status(200).json(Note);
  } catch (err) {
    next(err);
  }
},

getEpisodeNotes: async function(req, res, next){
  try {
    const EpisodeNote = await EpisodeNote.find({"Userid":req.params.id});
    res.status(200).json(EpisodeNotes);
  } catch (err) {
    next(err);
  }
}
}