export interface Trainer {
  _id: string;
  name: string;
  email: string;
  age: number;
  specialization:
    | "Fitness"
    | "Weight Loss"
    | "Muscle Gain"
    | "Bodybuilding";
  experienceYears: number;
  phone: string;
  clientsCount: number;
  rating: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTrainerInput {
  name: string;
  email: string;
  age: number;
  specialization:
    | "Fitness"
    | "Weight Loss"
    | "Muscle Gain"
    | "Bodybuilding";
  experienceYears: number;
  phone: string;
  clientsCount?: number;
  rating?: number;
  active?: boolean;
}

export type UpdateTrainerInput =
  Partial<CreateTrainerInput>;