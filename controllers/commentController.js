const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { text } = req.body;
  try {
    const comment = await Comment.create({ text, userId: req.user._id });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('userId', 'name email');
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};