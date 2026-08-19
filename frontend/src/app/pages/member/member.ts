import {
  Component,
  inject,
  OnInit,
  signal
} from "@angular/core";

import { FormsModule } from "@angular/forms";

import { MemberService } from "../../core/services/member";

import type {
  Member,
  CreateMemberInput
} from "../../models/member";

@Component({
  selector: "app-member",
  imports: [
    FormsModule
  ],
  templateUrl: "./member.html",
  styleUrl: "./member.css"
})
export class member implements OnInit {

  private readonly memberService =
    inject(MemberService);

  members = signal<Member[]>([]);

  loading = signal(false);

  message = signal("");

  editingMemberId =
    signal<string | null>(null);

  form: CreateMemberInput = {
    name: "",
    email: "",
    age: 1,
    weight: 0,
    height: 0,
    goal: "Weight Loss",
    membershipType: "Monthly",
    subscriptionStart: "",
    subscriptionEnd: "",
    active: true
  };

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {

    this.loading.set(true);
    this.message.set("");

    this.memberService
      .getMembers()
      .subscribe({

        next: (response) => {

          this.members.set(
            response.data
          );

          this.loading.set(false);
        },

        error: (error) => {

          console.log(
            "LOAD MEMBERS ERROR:",
            error
          );

          console.log(
            "ERROR BODY:",
            error.error
          );

          this.message.set(
            error.error?.message ||
            "Could not load members"
          );

          this.loading.set(false);
        }
      });
  }

  resetForm(): void {

    this.form = {
      name: "",
      email: "",
      age: 1,
      weight: 0,
      height: 0,
      goal: "Weight Loss",
      membershipType: "Monthly",
      subscriptionStart: "",
      subscriptionEnd: "",
      active: true
    };
  }

  saveMember(): void {

    this.message.set("");

    const editingId =
      this.editingMemberId();

    if (editingId) {

      this.memberService
        .updateMember(
          editingId,
          this.form
        )
        .subscribe({

          next: () => {

            this.message.set(
              "Member updated successfully"
            );

            this.cancelEdit();
            this.loadMembers();
          },

          error: (error) => {

            console.log(
              "UPDATE MEMBER ERROR:",
              error
            );

            console.log(
              "ERROR BODY:",
              error.error
            );

            this.message.set(
              error.error?.message ||
              "Could not update member"
            );
          }
        });

      return;
    }

    this.memberService
      .createMember(this.form)
      .subscribe({

        next: (response) => {

          console.log(
            "MEMBER CREATED:",
            response
          );

          this.message.set(
            "Member created successfully"
          );

          this.resetForm();
          this.loadMembers();
        },

        error: (error) => {

          console.log(
            "CREATE MEMBER ERROR:",
            error
          );

          console.log(
            "ERROR BODY:",
            error.error
          );

          console.log(
            "ERROR STATUS:",
            error.status
          );

          console.log(
            "ERROR URL:",
            error.url
          );

          this.message.set(
            error.error?.message ||
            "Could not create member"
          );
        }
      });
  }

  deleteMember(id: string): void {

    const confirmed =
      window.confirm(
        "Delete this member?"
      );

    if (!confirmed) {
      return;
    }

    this.memberService
      .deleteMember(id)
      .subscribe({

        next: () => {

          this.message.set(
            "Member deleted"
          );

          this.loadMembers();
        },

        error: (error) => {

          console.log(
            "DELETE MEMBER ERROR:",
            error
          );

          console.log(
            "ERROR BODY:",
            error.error
          );

          this.message.set(
            error.error?.message ||
            "Could not delete member"
          );
        }
      });
  }

  startEdit(member: Member): void {

    this.editingMemberId.set(
      member._id
    );

    this.form = {
      name: member.name,
      email: member.email,
      age: member.age,
      weight: member.weight,
      height: member.height,
      goal: member.goal,
      membershipType:
        member.membershipType,
      subscriptionStart:
        member.subscriptionStart,
      subscriptionEnd:
        member.subscriptionEnd,
      active: member.active
    };
  }

  cancelEdit(): void {

    this.editingMemberId.set(null);

    this.resetForm();
  }
}