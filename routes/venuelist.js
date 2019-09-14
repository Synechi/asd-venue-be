import express from "express";
import User from "../models/User";

var router = express.Router();

//route for searching DB with ID to get all lists of one user
router.route("/lists/:id").get((req, res) => {
  User.findById(req.params.id, { venuelists: 1, _id: 0 }, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});

//route for creating a list for a user
router.route("/createlist/:id").patch((req, res) => {
  var list = {
    name: req.body.name,
    colour: req.body.colour
  };
  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        venuelists: { name: req.body.name, colour: req.body.colour, venues: [] }
      }
    },
    { new: true },
    (err, doc) => {
      if (err) res.status(500).send(err);
      return console.log(doc);
    }
  );
});

//route for deleting a list for a user
router.route("/deletelist/:id/:listid").delete((req, res) => {
  console.log("delete list");
  console.log(req.params);
  User.findByIdAndUpdate(
    req.params.id,
    { $pull: { venuelists: { _id: req.params.listid } } },
    { new: true },
    (err, doc) => {
      if (err) res.status(500).send(err);
      return console.log(doc);
    }
  );
});

//Get venues from users list

router.route("/venues/:id/:listid").get((req, res) => {
  User.findOne(
    { _id: req.params.id, "venuelists._id": req.params.listid },
    "venuelists.$.venues",
    (err, doc) => {
      if (err) res.status(500).send(err);
      else res.json(doc);
    }
  );
});

//Add venue to list
router.route("/addvenue/:id/:listid").patch((req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id, "venuelists._id": req.params.listid },
    { $push: { "venuelists.$.venues": { placeID: req.body.placeID } } },
    { new: true },
    (err, doc) => {
      if (err) res.status(500).send(err);
      return res.status(201).send({
        message: "Venue added!",
        updatedDoc: doc
      });
    }
  );
});

//Delete venue from the list
router.route("/deletevenue/:id/:listid/:placeid").delete((req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id, "venuelists._id": req.params.listid },
    { $pull: { "venuelists.$.venues": { placeID: req.params.placeid } } },
    { new: true },
    (err, doc) => {
      if (err) res.status(500).send(err);
      else
        res.status(201).send({
          message: "Venue deleted!",
          updatedDoc: doc
        });
    }
  );
});

module.exports = router;
