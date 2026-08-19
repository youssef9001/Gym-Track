import type {
  Request,
  Response
} from "express";

import {
  Member
} from "../models/member.model";

export async function createMember(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const member =
      await Member.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: member
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create member"
    });

  }
}

export async function getMembers(
  _request: Request,
  response: Response
): Promise<void> {

  try {

    const members =
      await Member
        .find()
        .sort({
          createdAt: -1
        });

    response.json({
      success: true,
      count: members.length,
      data: members
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: "Could not load members"
    });

  }
}

export async function getMemberById(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const member =
      await Member.findById(
        request.params.id
      );

    if (!member) {

      response.status(404).json({
        success: false,
        message: "Member not found"
      });

      return;
    }

    response.json({
      success: true,
      data: member
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message: "Invalid member id"
    });

  }
}

export async function updateMember(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const member =
      await Member.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!member) {

      response.status(404).json({
        success: false,
        message: "Member not found"
      });

      return;
    }

    response.json({
      success: true,
      data: member
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update member"
    });

  }
}

export async function deleteMember(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const member =
      await Member.findByIdAndDelete(
        request.params.id
      );

    if (!member) {

      response.status(404).json({
        success: false,
        message: "Member not found"
      });

      return;
    }

    response.json({
      success: true,
      message: "Member deleted"
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message: "Invalid member id"
    });

  }
}