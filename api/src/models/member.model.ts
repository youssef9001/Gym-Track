import {
  model,
  Schema
} from "mongoose";

export type MembershipType =
  | "Monthly"
  | "Quarterly"
  | "Yearly";

export type MemberGoal =
  | "Weight Loss"
  | "Muscle Gain"
  | "Fitness";

export interface MemberDocument {
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  goal: MemberGoal;
  membershipType: MembershipType;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema =
  new Schema<MemberDocument>(
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
        min: 10
      },

      weight: {
        type: Number,
        required: true,
        min: 1
      },

      height: {
        type: Number,
        required: true,
        min: 50
      },

      goal: {
        type: String,
        enum: [
          "Weight Loss",
          "Muscle Gain",
          "Fitness"
        ],
        required: true
      },

      membershipType: {
        type: String,
        enum: [
          "Monthly",
          "Quarterly",
          "Yearly"
        ],
        required: true
      },

      subscriptionStart: {
        type: Date,
        required: true
      },

      subscriptionEnd: {
        type: Date,
        required: true
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

export const Member =
  model<MemberDocument>(
    "Member",
    memberSchema
  );