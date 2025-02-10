const express = require('express');
const commentController = require('../controllers/commentController');
const { validateCreateComment } = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, validateCreateComment, commentController.createComment);
router.get('/', authMiddleware, commentController.getComments);

module.exports = router;