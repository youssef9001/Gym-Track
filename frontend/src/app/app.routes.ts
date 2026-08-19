import { Routes } from "@angular/router";

import { member } from "./pages/member/member";

import { TrainerComponent } from "./pages/trainer/trainer";

export const routes: Routes = [

  {
    path: "",
    redirectTo: "members",
    pathMatch: "full"
  },

  {
    path: "members",
    component: member
  },

  {
    path: "trainers",
    component: TrainerComponent
  },

  {
    path: "**",
    redirectTo: "members"
  }

];