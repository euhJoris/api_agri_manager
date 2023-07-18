const express = require("express");
const app = express();
const router = express.Router();
const SystemController = require('../controllers/systemsController')

const systemController = new SystemController()
router.get('/systems', systemController.getSystems)
router.post('/systems', systemController.createSystemToUser)
router.post('/newToken', systemController.associateSystemToUserWithToken)

module.exports = router