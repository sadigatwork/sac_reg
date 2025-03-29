// routes/api/certificates.js

const express = require("express");
const router = express.Router();

// Load Certificate model
const Certificate = require("../../models/Certificates");

// @route   GET api/certificates/test
// @desc    Tests certificates route
// @access  Public
router.get("/test", (req, res) => res.send("certificate route testing!"));

// @route   GET api/certificates
// @desc    Get all certificates
// @access  Public
router.get("/", (req, res) => {
  Certificate.find()
    .then((certificates) => res.json(certificates))
    .catch((err) =>
      res.status(404).json({ nocertificatesfound: "No Certificates found" })
    );
});

// @route   GET api/certificates/:id
// @desc    Get single certificate by id
// @access  Public
router.get("/:id", (req, res) => {
  Certificate.findById(req.params.id)
    .then((certificate) => res.json(certificate))
    .catch((err) =>
      res.status(404).json({ nocertificatefound: "No Certificate found" })
    );
});

// @route   POST api/certificates
// @desc    Add/save certificate
// @access  Public
router.post("/", (req, res) => {
  Certificate.create(req.body)
    .then((certificate) => res.json({ msg: "Certificate added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this certificate" })
    );
});

// @route   PUT api/certificates/:id
// @desc    Update certificate by id
// @access  Public
router.put("/:id", (req, res) => {
  Certificate.findByIdAndUpdate(req.params.id, req.body)
    .then((certificate) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route   DELETE api/certificates/:id
// @desc    Delete certificate by id
// @access  Public
router.delete("/:id", (req, res) => {
  Certificate.findByIdAndDelete(req.params.id)
    .then((certificate) =>
      res.json({ mgs: "Certificate entry deleted successfully" })
    )
    .catch((err) => res.status(404).json({ error: "No such a certificate" }));
});

module.exports = router;
