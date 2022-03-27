const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");

router.route("/Create").post((req,res)=> {
  const name  = req.body.name;
  const category = req.body.category;
  const content = req.body.content;
  const newItem = new Item({
    name,
    category,
    content
  });

  newItem.save();
})

router.route("/items").get((req, res) => {
  Item.find()
      .then(foundItems => res.json(foundItems))
})
module.exports = router;
