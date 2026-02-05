import { Request, Response, NextFunction } from "express";
import {
  sendMatchRequest,
  changeMatchStatus,
  getUserMatches,
  getSentRequests,
  getReceivedRequests,
  getAcceptedMatches,
  getMatchLists,
  createRecommendedMatchesService,
  makeDummmyMatchesService,
} from "../services/match.service";
import { MatchStatus } from "../entity/Match";

export const sendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requester_id = req.user!.user_id; // from token
    const { receiver_id } = req.body;
    const data = await sendMatchRequest(requester_id, receiver_id);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const updateMatchStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { match_id, status } = req.body;
    if (
      status !== MatchStatus.ACCEPTED &&
      status !== MatchStatus.REJECTED &&
      status !== MatchStatus.SENT &&
      status !== MatchStatus.RECOMMENDED &&
      status !== MatchStatus.PASS
    ) {
      throw new Error("Invalid status");
    }

    const data = await changeMatchStatus(match_id, status);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const blockRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { match_id } = req.body;

    const data = await changeMatchStatus(match_id, MatchStatus.BLOCKED);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const passRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { match_id } = req.body;

    const data = await changeMatchStatus(match_id, MatchStatus.PASS);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const listAllMatches = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await getUserMatches(user_id);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const sentRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await getSentRequests(user_id);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const receivedRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await getReceivedRequests(user_id);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const acceptedMatches = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await getAcceptedMatches(user_id);

    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export const getAllMatchLists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await getMatchLists(user_id);

    res.json({
      success: true,
      data,
    });
  } catch (e) {
    next(e);
  }
};

export const createRecommendedMatches = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user!.user_id;

    const data = await createRecommendedMatchesService(user_id);

    res.json({
      success: true,
      data,
    });
  } catch (e) {
    next(e);
  }
};
