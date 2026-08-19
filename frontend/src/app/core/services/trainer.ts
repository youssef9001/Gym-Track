import {
  inject,
  Injectable
} from "@angular/core";

import {
  HttpClient
} from "@angular/common/http";

import {
  Observable
} from "rxjs";

import {
  API_BASE_URL
} from "../api.config";

import type {
  ApiResponse
} from "../../models/api-response";

import type {
  Trainer,
  CreateTrainerInput,
  UpdateTrainerInput
} from "../../models/trainer";

@Injectable({
  providedIn: "root"
})
export class TrainerService {

  private readonly http =
    inject(HttpClient);

  private readonly url =
    `${API_BASE_URL}/trainers`;

  getTrainers():
    Observable<ApiResponse<Trainer[]>> {

    return this.http.get<
      ApiResponse<Trainer[]>
    >(this.url);
  }

  getTrainerById(
    id: string
  ): Observable<ApiResponse<Trainer>> {

    return this.http.get<
      ApiResponse<Trainer>
    >(`${this.url}/${id}`);
  }

  createTrainer(
    trainer: CreateTrainerInput
  ): Observable<ApiResponse<Trainer>> {

    return this.http.post<
      ApiResponse<Trainer>
    >(
      this.url,
      trainer
    );
  }

  updateTrainer(
    id: string,
    updates: UpdateTrainerInput
  ): Observable<ApiResponse<Trainer>> {

    return this.http.patch<
      ApiResponse<Trainer>
    >(
      `${this.url}/${id}`,
      updates
    );
  }

  deleteTrainer(
    id: string
  ): Observable<{
    success: boolean;
    message: string;
  }> {

    return this.http.delete<{
      success: boolean;
      message: string;
    }>(
      `${this.url}/${id}`
    );
  }
}