const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');

router.get('/', controller.index);           // index

router.get('/:id', controller.show);         // show

router.post('/', controller.create);         // store

router.put('/:id', controller.update);       // update

router.patch('/:id', controller.modify);     // modify

router.delete('/:id', controller.remove);    // destroy

module.exports = router;
