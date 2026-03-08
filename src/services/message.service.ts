
import { AdminDataSource } from "../config/admin.datasoure";
import { Conversation } from "../entity/Conversation";
import { Message } from "../entity/Messages";

const messageRepo = AdminDataSource.getRepository(Message);
const conversationRepo = AdminDataSource.getRepository(Conversation);

export const saveMessage = async (
  conversationId: string,
  senderId: string,
  message: string
) => {

  const newMessage = messageRepo.create({
    conversation_id: conversationId,
    sender_id: senderId,
    message,
  });

  const saved = await messageRepo.save(newMessage);

  await conversationRepo.update(conversationId, {
    last_message: message,
    last_message_time: new Date(),
  });

  return saved;
};

export const getMessages = async (conversationId: string) => {

  const messages = await messageRepo.find({
    where: { conversation_id: conversationId },
    order: { created_at: "DESC" },
    take: 50,
  });

  return messages.reverse();

};