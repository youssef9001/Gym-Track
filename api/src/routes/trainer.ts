import {
  Router
} from "express";

import {
  createTrainer,
  deleteTrainer,
  getTrainerById,
  getTrainers,
  updateTrainer
} from "../controllers/trainer";

const router = Router();

router.post(
  "/",
  createTrainer
);

router.get(
  "/",
  getTrainers
);

router.get(
  "/:id",
  getTrainerById
);

router.patch(
  "/:id",
  updateTrainer
);

router.delete(
  "/:id",
  deleteTrainer
);

export default router;