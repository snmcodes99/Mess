const express = require("express")
const router = express.Router()

const requireAuth = require("../middlewares/auth.middlewares")
const authController = require("../controllers/auth.controller")

router.get("/me", requireAuth, authController.me)

module.exports = router
