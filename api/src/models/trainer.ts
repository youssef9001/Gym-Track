import {
  model,
  Schema
} from "mongoose";

export type TrainerSpecialization =
  | "Fitness"
  | "Weight Loss"
  | "Muscle Gain"
  | "Bodybuilding";

export interface TrainerDocument {
  name: string;
  email: string;
  age: number;
  specialization: TrainerSpecialization;
  experienceYears: number;
  phone: string;
  clientsCount: number;
  rating: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const trainerSchema =
  new Schema<TrainerDocument>(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },

      email: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },

      age: {
        type: Number,
        required: true,
        min: 18
      },

      specialization: {
        type: String,
        enum: [
          "Fitness",
          "Weight Loss",
          "Muscle Gain",
          "Bodybuilding"
        ],
        required: true
      },

      experienceYears: {
        type: Number,
        required: true,
        min: 0
      },

      phone: {
        type: String,
        required: true,
        trim: true
      },

      clientsCount: {
        type: Number,
        default: 0,
        min: 0
      },

      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },

      active: {
        type: Boolean,
        default: true
      }
    },

    {
      timestamps: true
    }
  );

export const Trainer =
  model<TrainerDocument>(
    "Trainer",
    trainerSchema
  );