import {
  Component,
  inject,
  OnInit,
  signal
} from "@angular/core";

import { FormsModule } from "@angular/forms";

import { TrainerService } from "../../core/services/trainer";

import type {
  Trainer,
  CreateTrainerInput
} from "../../models/trainer";

@Component({
  selector: "app-trainer",
  imports: [FormsModule],
  templateUrl: "./trainer.html",
  styleUrl: "./trainer.css"
})
export class TrainerComponent implements OnInit {

  private readonly trainerService =
    inject(TrainerService);

  trainers = signal<Trainer[]>([]);

  loading = signal(false);

  message = signal("");

  editingTrainerId =
    signal<string | null>(null);

  form: CreateTrainerInput = {
    name: "",
    email: "",
    age: 18,
    specialization: "Fitness",
    experienceYears: 0,
    phone: "",
    clientsCount: 0,
    rating: 0,
    active: true
  };

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers(): void {

    this.loading.set(true);

    this.message.set("");

    this.trainerService
      .getTrainers()
      .subscribe({

        next: (response) => {

          this.trainers.set(response.data);

          this.loading.set(false);
        },

        error: () => {

          this.message.set(
            "Could not load trainers"
          );

          this.loading.set(false);
        }

      });
  }

  resetForm(): void {

    this.form = {
      name: "",
      email: "",
      age: 18,
      specialization: "Fitness",
      experienceYears: 0,
      phone: "",
      clientsCount: 0,
      rating: 0,
      active: true
    };
  }

  saveTrainer(): void {

    this.message.set("");

    const editingId =
      this.editingTrainerId();

    if (editingId) {

      this.trainerService
        .updateTrainer(
          editingId,
          this.form
        )
        .subscribe({

          next: () => {

            this.message.set(
              "Trainer updated successfully"
            );

            this.cancelEdit();

            this.loadTrainers();
          },

          error: () => {

            this.message.set(
              "Could not update trainer"
            );
          }

        });

      return;
    }

    this.trainerService
      .createTrainer(this.form)
      .subscribe({

        next: () => {

          this.message.set(
            "Trainer created successfully"
          );

          this.resetForm();

          this.loadTrainers();
        },

        error: () => {

          this.message.set(
            "Could not create trainer"
          );
        }

      });
  }

  deleteTrainer(id: string): void {

    const confirmed =
      window.confirm(
        "Delete this trainer?"
      );

    if (!confirmed) {
      return;
    }

    this.trainerService
      .deleteTrainer(id)
      .subscribe({

        next: () => {

          this.message.set(
            "Trainer deleted"
          );

          this.loadTrainers();
        },

        error: () => {

          this.message.set(
            "Could not delete trainer"
          );
        }

      });
  }

  startEdit(trainer: Trainer): void {

    this.editingTrainerId.set(
      trainer._id
    );

    this.form = {
      name: trainer.name,
      email: trainer.email,
      age: trainer.age,
      specialization:
        trainer.specialization,
      experienceYears:
        trainer.experienceYears,
      phone: trainer.phone,
      clientsCount:
        trainer.clientsCount,
      rating: trainer.rating,
      active: trainer.active
    };
  }

  cancelEdit(): void {

    this.editingTrainerId.set(null);

    this.resetForm();
  }
}