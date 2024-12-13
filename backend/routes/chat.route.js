import express from 'express';
import { verifyJwt } from '../middlewares/verifyToken.middleware.js';
import { getUsers, getMessage, sendMessage } from '../controllers/chatting.controller.js';

const router = express.Router()

router.use(verifyJwt)
router.route('/').get((req,res)=>{
    res.send(`Welcome to the chat service ${req.user.fullname}`)
})
router.route('/users').get(getUsers)
router.route('/:id').get(getMessage)
router.route('send/:id').post(sendMessage)

export default router;