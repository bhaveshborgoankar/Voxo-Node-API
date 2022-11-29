import express from "express";
import loginRoutes from './login.routes.js'
const router = express.Router()

router.use('/', loginRoutes)

export default router