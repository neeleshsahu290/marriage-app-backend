import { AdminDataSource } from "../config/admin.datasoure";
import { Conversation } from "../entity/Conversation";
import { Match, MatchStatus } from "../entity/Match";
import { throwError } from "../utils/error.util";
import { ERRORS } from "../utils/error-status.util";
import { UserProfile } from "../entity/UserProfile";

const conversationRepository = AdminDataSource.getRepository(Conversation);
const matchRepository = AdminDataSource.getRepository(Match);

export const getUserConversationsService = async (user_id: string) => {

  const conversations = await conversationRepository
    .createQueryBuilder("conversation")
    .leftJoin(
      UserProfile,
      "other_user",
      `
      other_user.user_id = 
      CASE 
        WHEN conversation.user1_id = :user_id THEN conversation.user2_id
        ELSE conversation.user1_id
      END
      `,
      { user_id }
    )
    .where(
      "conversation.user1_id = :user_id OR conversation.user2_id = :user_id",
      { user_id }
    )
    .andWhere("conversation.is_active = true")
    .orderBy("conversation.started_at", "DESC")
    .select([
      "conversation.id",
      "conversation.match_id",
      "conversation.started_at",
      "conversation.last_message",
      "conversation.last_message_time",
      "conversation.user1_id",
      "conversation.user2_id",
      "other_user.user_id",
      "other_user.full_name",
      "other_user.profile_photos"
    ])
    .getRawMany();

   return conversations.map((convo: any) => ({
    conversation_id: convo.conversation_id,
    match_id: convo.conversation_match_id,
    started_at: convo.conversation_started_at,
    last_message: convo.conversation_last_message,
    last_message_time: convo.conversation_last_message_time,
    user_id: convo.other_user_user_id,
    full_name: convo.other_user_full_name,
    profile_photo: convo.other_user_profile_photos?.[0] ?? null
  }));
};


export const createConversationService = async (
  match_id: string,
  user_id: string
) => {

  const match = await matchRepository.findOneBy({ id: match_id });

  if (!match) {
    throwError(ERRORS.NOT_FOUND, "Match not found");
  }

  let conversation = await conversationRepository.findOne({
    where: { match_id },
  });

  if (!conversation) {
    conversation = conversationRepository.create({
      match_id,
      user1_id: match!.requester_id,
      user2_id: match!.receiver_id,
      is_active: true,
    });

    conversation = await conversationRepository.save(conversation);
  }

  const convo = await conversationRepository
    .createQueryBuilder("conversation")
    .leftJoin(
      UserProfile,
      "other_user",
      `
      other_user.user_id = 
      CASE 
        WHEN conversation.user1_id = :user_id THEN conversation.user2_id
        ELSE conversation.user1_id
      END
      `,
      { user_id }
    )
    .where("conversation.id = :conversation_id", {
      conversation_id: conversation.id,
    })
    .select([
      "conversation.id",
      "conversation.match_id",
      "conversation.started_at",
      "conversation.last_message",
      "conversation.last_message_time",
      "other_user.user_id",
      "other_user.full_name",
      "other_user.profile_photos",
    ])
    .getRawOne();

  return {
    conversation_id: convo.conversation_id,
    match_id: convo.conversation_match_id,
    started_at: convo.conversation_started_at,
    last_message: convo.conversation_last_message,
    last_message_time: convo.conversation_last_message_time,
    user_id: convo.other_user_user_id,
    full_name: convo.other_user_full_name,
    profile_photo: convo.other_user_profile_photos?.[0] ?? null,
  };
};