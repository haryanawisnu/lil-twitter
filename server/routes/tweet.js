const express = require('express');
const router = express.Router();
var Tweet = require('../controllers/tweet');


router.get('/', Tweet.showAll);
router.get('/:id', Tweet.showOne);
router.get('/recent/:id', Tweet.showAuthor);
router.get('/search/hastag/:hastag', Tweet.showHastag);
router.get('/hastag/popular', Tweet.showPopular);
router.post('/', Tweet.create);
router.post('/sub', Tweet.subcreate);
router.put('/:id/:userid', Tweet.update);
router.put('/sub', Tweet.subupdate);
router.delete('/:id/:userid', Tweet.delete);
router.delete('/sub/:id/:answerid/:userid', Tweet.subdelete);

module.exports = router;
