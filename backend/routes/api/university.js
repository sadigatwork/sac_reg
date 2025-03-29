// routes/api/universities.js

const express = require("express");
const router = express.Router();

// Load University model
const University = require("../../models/Universities");

// @route   GET api/universities/test
// @desc    Tests universities route
// @access  Public
router.get("/test", (req, res) => res.send("university route testing!"));

// @route   GET api/universities
// @desc    Get all universities
// @access  Public
router.get("/", (req, res) => {
  University.find()
    .then((universities) => res.json(universities))
    .catch((err) =>
      res.status(404).json({ nouniversitiesfound: "No Universities found" })
    );
});

// @route   GET api/universities/:id
// @desc    Get single university by id
// @access  Public
router.get("/:id", (req, res) => {
  University.findById(req.params.id)
    .then((university) => res.json(university))
    .catch((err) =>
      res.status(404).json({ nouniversityfound: "No University found" })
    );
});

// @route   POST api/universities
// @desc    Add/save university
// @access  Public
router.post("/", (req, res) => {
  University.create(req.body)
    .then((university) => res.json({ msg: "University added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this university" })
    );
});

// @route   PUT api/universities/:id
// @desc    Update university by id
// @access  Public
router.put("/:id", (req, res) => {
  University.findByIdAndUpdate(req.params.id, req.body)
    .then((university) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route   DELETE api/universities/:id
// @desc    Delete university by id
// @access  Public
router.delete("/:id", (req, res) => {
  University.findByIdAndDelete(req.params.id)
    .then((university) =>
      res.json({ mgs: "University entry deleted successfully" })
    )
    .catch((err) => res.status(404).json({ error: "No such a university" }));
});

module.exports = router;
