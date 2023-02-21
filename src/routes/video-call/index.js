const express = require('express')
const router = express.Router()
const videoCallController = require('../../controllers/video-call.controller')
router.get('/rtc-token/:channel/:role/:tokenType/:uid', videoCallController.generateRTCToken)
router.get('/rtm-token/:uid', videoCallController.generateRTMToken)
router.get('/rte-token/:channel/:role/:tokenType/:uid', videoCallController.generateRTEToken)



module.exports = router