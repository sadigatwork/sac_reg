const express = require("express");
const router = express.Router();

const Registrant = require("../../models/Registrants");
// Require controller modules.
// const registrant_controller = require("../../controllers/registrantController");

// @route   GET api/registrants/test
// @desc    Tests registrants route
// @access  Public
router.get("/test", (req, res) => res.send("registrant route testing!"));

// @route   GET api/registrants
// @desc    Get all registrants
// @access  Public
// router.get("/", registrant_controller.index);
router.get("/", (req, res) => {
  Registrant.find()
    .then((registrants) => res.json(registrants))
    .catch((err) =>
      res.status(404).json({ noregistrantsfound: "No Registrants found" })
    );
});

// @route   GET api/registrants/:id
// @desc    Get single registrant by id
// @access  Public
router.get("/:id", (req, res) => {
  Registrant.findById(req.params.id)
    .then((registrant) => res.json(registrant))
    .catch((err) =>
      res.status(404).json({ noregistrantfound: "No Registrant found" })
    );
});

// @route   POST api/registrants
// @desc    Add/save registrant
// @access  Public
router.post("/", (req, res) => {
  Registrant.create(req.body)
    .then((registrant) => res.json({ msg: "Registrant added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this registrant" })
    );
});

// @route   PUT api/registrants/:id
// @desc    Update registrant by id
// @access  Public
router.put("/:id", (req, res) => {
  Registrant.findByIdAndUpdate(req.params.id, req.body)
    .then((registrant) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route   DELETE api/registrants/:id
// @desc    Delete registrant by id
// @access  Public
router.delete("/:id", (req, res) => {
  Registrant.findByIdAndDelete(req.params.id)
    .then((registrant) =>
      res.json({ mgs: "Registrant entry deleted successfully" })
    )
    .catch((err) => res.status(404).json({ error: "No such a registrant" }));
});

module.exports = router;
