import type {
  Request,
  Response
} from "express";

import {
  Trainer
} from "../models/trainer";

export async function createTrainer(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const trainer =
      await Trainer.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: trainer
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create trainer"
    });

  }
}

export async function getTrainers(
  _request: Request,
  response: Response
): Promise<void> {

  try {

    const trainers =
      await Trainer
        .find()
        .sort({
          createdAt: -1
        });

    response.json({
      success: true,
      count: trainers.length,
      data: trainers
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: "Could not load trainers"
    });

  }
}

export async function getTrainerById(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const trainer =
      await Trainer.findById(
        request.params.id
      );

    if (!trainer) {

      response.status(404).json({
        success: false,
        message: "Trainer not found"
      });

      return;
    }

    response.json({
      success: true,
      data: trainer
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message: "Invalid trainer id"
    });

  }
}

export async function updateTrainer(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const trainer =
      await Trainer.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!trainer) {

      response.status(404).json({
        success: false,
        message: "Trainer not found"
      });

      return;
    }

    response.json({
      success: true,
      data: trainer
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update trainer"
    });

  }
}

export async function deleteTrainer(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const trainer =
      await Trainer.findByIdAndDelete(
        request.params.id
      );

    if (!trainer) {

      response.status(404).json({
        success: false,
        message: "Trainer not found"
      });

      return;
    }

    response.json({
      success: true,
      message: "Trainer deleted"
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message: "Invalid trainer id"
    });

  }
}