const express = require("express");
const db = require("./usersDb");
const postsDb = require("../posts/postsDb")

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
   if (!req.body.name) {
    res.status(400).json({ message: "please include a name" });
  }else {
    db.insert(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The user could not be created." });
    });
  }
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
  
  if (!req.body.text){
    res.status(400).json({message: "please include text for this post"})
  } else {
    postsDb.insert(req.body)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post could not be added." });
    });
  }
});

router.get("/", (req, res) => {
  // do your magic!
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The users list could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: "the user with the specified id does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "no possts found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(num => {
      res.status(200).json({ message: "user deleted succesfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The user could not be deleted." });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  req.body.id = req.params.id;
  if (!req.body.name) {
    res.status(400).json({ message: "please include a name" });
  } else {
    db.update(req.body.id, req.body)
      .then(num => {
        if (num == 1) {
          res.status(200).json(req.body);
        } else {
          res.status(404).json({error: "the user could not be found"})
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: "The users information could not be edited." });
      });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  req.body.user_id = req.params.id

  next()
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
