import {
  Router
} from "express";

import {
  createMember,
  deleteMember,
  getMemberById,
  getMembers,
  updateMember
} from "../controllers/member.controllers";

const router = Router();

router.post(
  "/",
  createMember
);

router.get(
  "/",
  getMembers
);

router.get(
  "/:id",
  getMemberById
);

router.patch(
  "/:id",
  updateMember
);

router.delete(
  "/:id",
  deleteMember
);

export default router;