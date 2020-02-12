const express = require("express");
const db = require("./postsDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  db.get()
    .then(posts => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "internal server error. we done freagin goofed" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "post not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "internal server error. we done freagin goofed" });
    });
});

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
    .then(num => {
      if (num === 1) {
        res.status(200).json({ message: "post deleted succesfully" });
      } else {
        res.status(404).json({error: 'post not found'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post could not be deleted." });
    });
});

router.put("/:id", (req, res) => {
   req.body.id = req.params.id;
  if (!req.body.text) {
    res.status(400).json({ message: "please include text" });
  } else {
    db.update(req.body.id, req.body)
      .then(num => {
        if (num == 1) {
          res.status(200).json(req.body);
        } else {
          res.status(404).json({error: "the post could not be found"})
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: "The post could not be edited." });
      });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
