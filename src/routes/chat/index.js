const express = require('express')
const router = express.Router()
const chatController = require('../../controllers/chat.controller')

router.post('/token', chatController.generateChatToken)
router.post('/super-admin-room', chatController.addSupperAdminRoom)
router.post('/room-chat', chatController.addSupperAdminRoom)

module.exports = router