
import { DeepPartial } from "typeorm";
import { AdminDataSource } from "../config/admin.datasoure";
import { Match,MatchStatus } from "../entity/Match";
import { UserProfile } from "../entity/UserProfile";
import { throwError } from "../utils/error.util";
import { ERRORS } from "../utils/error-status.util";
import { User } from "../entity/User";


const matchRepository = AdminDataSource.getRepository(Match);
const userProfileRepository = AdminDataSource.getRepository(UserProfile);
const userRepository = AdminDataSource.getRepository(User);

export const sendMatchRequest = async (
  requester_id: string,
  receiver_id: string,
) => {

  const existing = await matchRepository.findOne({
    where: { requester_id, receiver_id },
  });

  // If exists -> update to SENT
  if (existing) {
    existing.status = MatchStatus.SENT; 
    return matchRepository.save(existing);
  }

  // If not exists -> create new
  const match = matchRepository.create({
    requester_id,
    receiver_id,
    status: MatchStatus.SENT,
  } as DeepPartial<Match>);

  return matchRepository.save(match);
};

export const changeMatchStatus = async (
  match_id: string,
  status: MatchStatus.ACCEPTED | MatchStatus.REJECTED | MatchStatus.BLOCKED | MatchStatus.PASS | MatchStatus.SENT | MatchStatus.RECOMMENDED,
) => {

  const match = await matchRepository.findOneBy({ id: match_id });

  if (!match) throw new Error("Match not found");

  match.status = status;

  return matchRepository.save(match);
};

export const getUserMatches = async (user_id: string) => {
  const matches = await matchRepository.find({
    where: [
      { requester_id: user_id },
      { receiver_id: user_id },
    ],
    relations: {
      requesterProfile: true,
      receiverProfile: true,
      requesterUser: true,
      receiverUser: true,
    },
    order: {
      id: "DESC",
    },
  });

  return matches.map(match => {

    const isRequester = match.requester_id === user_id;

    const otherProfile = isRequester
      ? match.receiverProfile
      : match.requesterProfile;

    const otherUser = isRequester
      ? match.receiverUser
      : match.requesterUser;

    return {
      match_id: match.id,
      status: match.status,

      email: otherUser.email,
      phone: otherUser.phone,

      phone_verified: otherUser.phone_verified,
      email_verified: otherUser.email_verified,

      is_active: otherUser.is_active,

      show_online_status: otherUser.show_online_status,
      show_email: otherUser.show_email,
      show_phone: otherUser.show_phone,
      photo_visibility: otherUser.photo_visibility,

      latitude: otherUser.latitude,
      longitude: otherUser.longitude,

      last_recommended_at: otherUser.last_recommended_at,

      is_sent_by_me: isRequester,
      request_type: isRequester ? "SENT" : "RECEIVED",

      ...otherProfile,
    };
  });
};


export const getSentRequests = async (user_id: string) => {
  return matchRepository.find({
    where: {
      requester_id: user_id,
      status: MatchStatus.SENT,
    },
  });
};


export const getReceivedRequests = async (user_id: string) => {
  return matchRepository.find({
    where: {
      receiver_id: user_id,
      status: MatchStatus.SENT,
    },
  });
};


export const getAcceptedMatches = async (user_id: string) => {
  return matchRepository.find({
    where: [
      { requester_id: user_id, status: MatchStatus.ACCEPTED },
      { receiver_id: user_id, status: MatchStatus.ACCEPTED },
    ],
  });
};



export const getMatchLists = async (user_id: string) => {

  const [sent, received, accepted] = await Promise.all([

    // Sent by user (pending)
    matchRepository.find({
      where: {
        requester_id: user_id,
        status: MatchStatus.SENT,
      },
    }),

    // Received by user (pending)
    matchRepository.find({
      where: {
        receiver_id: user_id,
        status: MatchStatus.SENT,
      },
    }),

    // Accepted (both sides)
    matchRepository.find({
      where: [
        { requester_id: user_id, status: MatchStatus.ACCEPTED },
        { receiver_id: user_id, status: MatchStatus.ACCEPTED },
      ],
    }),

  ]);

  return { sent, received, accepted };
};


export const createRecommendedMatchesService = async (currentUserId: string) => {

  const currentUser = await userRepository.findOne({
    where: { id: currentUserId }
  });

  if (!currentUser) {
    throwError(ERRORS.NOT_FOUND, "User not found");
  }

  if (currentUser!.last_recommended_at) {
    const lastTime = new Date(currentUser!.last_recommended_at).getTime();
    const now = Date.now();

    const diffHours = (now - lastTime) / (1000 * 60 * 60);

    if (diffHours < 24) {
      throwError(
        ERRORS.BAD_REQUEST,
        "Recommendations already generated recently. Try later."
      );
    }
  }

  const currentProfile = await userProfileRepository.findOne({
    where: { user_id: currentUserId }
  });

  if (!currentProfile) {
    throwError(ERRORS.NOT_FOUND, "User profile not found");
  }

  const targetGender =
    currentProfile!.gender === "MALE" ? "FEMALE" : "MALE";

  // ⚡ FAST exclusion using subquery
  const users = await userProfileRepository
    .createQueryBuilder("profile")
    .where("profile.gender = :gender", { gender: targetGender })
    .andWhere("profile.user_id != :currentUserId", { currentUserId })
    .andWhere(`
      profile.user_id NOT IN (
        SELECT receiver_id FROM matches WHERE requester_id = :currentUserId
        UNION
        SELECT requester_id FROM matches WHERE receiver_id = :currentUserId
      )
    `)
    .setParameter("currentUserId", currentUserId)
    .limit(10)
    .getMany();

  if (!users.length) {
    return { created: 0, matches: [] };
  }

  const matchesToCreate = users.map(profile =>
    matchRepository.create({
      requester_id: currentUserId,
      receiver_id: profile.user_id,
      status: MatchStatus.RECOMMENDED
    })
  );

  const savedMatches = await matchRepository.save(matchesToCreate);

  await userRepository.update(
    { id: currentUserId },
    { last_recommended_at: new Date() }
  );

  return {
    created: savedMatches.length,
    matches: savedMatches
  };
};



export const makeDummmyMatchesService = async (currentUserId: string) => {

  const currentUser = await userRepository.findOne({
    where: { id: currentUserId }
  });

  if (!currentUser) {
    throwError(ERRORS.NOT_FOUND, "User not found");
  }

  const currentProfile = await userProfileRepository.findOne({
    where: { user_id: currentUserId }
  });

  if (!currentProfile) {
    throwError(ERRORS.NOT_FOUND, "User profile not found");
  }

  const targetGender =
    currentProfile!.gender === "Male" ? "Female" : "Male";

  // ⚡ Fast DB-level exclusion
  const users = await userProfileRepository
    .createQueryBuilder("profile")
    .where("profile.gender = :gender", { gender: targetGender })
    .andWhere("profile.user_id != :currentUserId", { currentUserId })
    .andWhere(`
      profile.user_id NOT IN (
        SELECT receiver_id FROM matches WHERE requester_id = :currentUserId
        UNION
        SELECT requester_id FROM matches WHERE receiver_id = :currentUserId
      )
    `)
    .setParameter("currentUserId", currentUserId)
    .limit(5)
    .getMany();

  if (!users.length) {
    return { created: 0, matches: [] };
  }

  // 👈 Dummy SENT requests (others sending to current user)
  const matchesToCreate = users.map(profile =>
    matchRepository.create({
      requester_id: profile.user_id,
      receiver_id: currentUserId,
      status: MatchStatus.SENT
    })
  );

  const savedMatches = await matchRepository.save(matchesToCreate);

  return {
    created: savedMatches.length,
    matches: savedMatches
  };
};
