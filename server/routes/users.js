const express = require('express');
const router = express.Router();
var User = require('../controllers/users');

router.get('/', User.showAll);
router.get('/:id', User.showOne);
router.post('/', User.create);
router.put('/:id', User.update);
router.delete('/:id', User.delete);

module.exports = router;
