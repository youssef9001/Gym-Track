export type MembershipType =
  | "Monthly"
  | "Quarterly"
  | "Yearly";

export type MemberGoal =
  | "Weight Loss"
  | "Muscle Gain"
  | "Fitness";

export interface Member {
  _id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  goal: MemberGoal;
  membershipType: MembershipType;
  subscriptionStart: string;
  subscriptionEnd: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemberInput {
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  goal: MemberGoal;
  membershipType: MembershipType;
  subscriptionStart: string;
  subscriptionEnd: string;
  active?: boolean;
}

export interface UpdateMemberInput {
  name?: string;
  email?: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: MemberGoal;
  membershipType?: MembershipType;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  active?: boolean;
}