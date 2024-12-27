const express = require("express")
const controller = require('../controllers/blogController');
const router = express.Router();

router.get('/', controller.all_blogs);
router.get('/create', controller.new_blog);
router.post('/', controller.blog_create);
router.get('/:id', controller.blog_details);
router.delete('/:id', controller.blog_delete);

module.exports = router;
