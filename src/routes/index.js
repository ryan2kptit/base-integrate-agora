const express = require('express')
const router = express.Router()


router.use('/video-call', require('./video-call/index'))
router.use('/chat', require('./chat/index'))


module.exports = router
 