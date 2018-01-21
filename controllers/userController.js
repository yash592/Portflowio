const db = require("../models");

module.exports = {

	create: function(req, res) {
    const user = {
      _id: req.body._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      userImage: req.body.userImage,
      password: req.body.password,
      birthday: req.body.birthday,
      github: req.body.github,
      linkedin: req.body.linkedin,
      website: req.body.website,
      email: req.body.email,
      saved: [{}],
      posts: [{}]
    };
    //might be userSchema
    db.User
      .create(User)
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
	},

	remove: function(req, res) {
    //again, might be userSchema
    db.User
    .findById({ _id: req.params.id })
    .then(user => user.remove())
    .then(user => res.json(user))
    .catch(err => res.status(422).json(err));
	}

  update: function(req, res) {
    //what am i even doing? ...my best.
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },
};
