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
  Member,
  CreateMemberInput,
  UpdateMemberInput
} from "../../models/member";

@Injectable({
  providedIn: "root"
})
export class MemberService {

  private readonly http =
    inject(HttpClient);

  private readonly url =
    `${API_BASE_URL}/members`;

  getMembers():
    Observable<ApiResponse<Member[]>> {

    return this.http.get<
      ApiResponse<Member[]>
    >(this.url);
  }

  getMemberById(
    id: string
  ): Observable<ApiResponse<Member>> {

    return this.http.get<
      ApiResponse<Member>
    >(`${this.url}/${id}`);
  }

  createMember(
    member: CreateMemberInput
  ): Observable<ApiResponse<Member>> {

    return this.http.post<
      ApiResponse<Member>
    >(this.url, member);
  }

  deleteMember(
    id: string
  ): Observable<{
    success: boolean;
    message: string;
  }> {

    return this.http.delete<{
      success: boolean;
      message: string;
    }>(`${this.url}/${id}`);
  }

  updateMember(
    id: string,
    updates: UpdateMemberInput
  ): Observable<ApiResponse<Member>> {

    return this.http.patch<
      ApiResponse<Member>
    >(
      `${this.url}/${id}`,
      updates
    );
  }
}