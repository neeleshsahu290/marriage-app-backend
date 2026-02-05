import { Router } from "express";
import {
  sendRequest,
  updateMatchStatus,
  listAllMatches,
  sentRequests,
  receivedRequests,
  acceptedMatches,
  getAllMatchLists,
  createRecommendedMatches,
  blockRequest,
  passRequest
} from "../controllers/match.controller";
 import{ authMiddleware} from "../middleware/auth.middleware";

const router = Router();

router.post("/send",authMiddleware, sendRequest);
router.put("/status",authMiddleware, updateMatchStatus);
router.put("/block",authMiddleware, blockRequest);
router.put("/pass",authMiddleware, passRequest);


router.get("/all",authMiddleware, listAllMatches);
router.get("/sent",authMiddleware, sentRequests);
router.get("/received",authMiddleware, receivedRequests);
router.get("/accepted",authMiddleware, acceptedMatches);
router.get("/lists",authMiddleware ,getAllMatchLists);


router.post("/create-matches",authMiddleware,createRecommendedMatches);


export default router;
