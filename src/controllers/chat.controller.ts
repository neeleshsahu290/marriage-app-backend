import { Request, Response, NextFunction } from "express";
import {
  createConversationService,
  getUserConversationsService,
} from "../services/chat.service";
import { getMessages } from "../services/message.service";

export const getUserConversations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await getUserConversationsService(user_id);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { match_id, user_id } = req.body;

    const data = await createConversationService(match_id,user_id);

    res.json({
      success: true,
      data,
    });
  } catch (e) {
    next(e);
  }
};

export const getConversationMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
const conversationId = req.query.conversationId as string;

    const data = await getMessages(conversationId);

    res.json({
      success: true,
      data,
    });
  } catch (e) {
    next(e);
  }
};
