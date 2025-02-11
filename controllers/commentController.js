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

// get comment by ID

exports.getComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id).populate('userId', 'name email');
    if (!comment) throw new Error('Comment not found');
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// put comment by ID

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true }).populate('userId', 'name email');
    if (!comment) throw new Error('Comment not found');
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete comment by ID

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};