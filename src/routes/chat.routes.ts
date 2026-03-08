import { Router } from "express";

import{ authMiddleware} from "../middleware/auth.middleware";
import { createConversation, getConversationMessages, getUserConversations } from "../controllers/chat.controller";

const router = Router();


router.post("/create", authMiddleware, createConversation);

router.get("/list", authMiddleware, getUserConversations);

router.get("/messages", authMiddleware, getConversationMessages);
export default router;
