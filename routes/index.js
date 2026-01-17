const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contactsRoute'));

module.exports = router;