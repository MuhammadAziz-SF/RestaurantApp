import { Response } from "express";

export const writeToCookie = (res: Response, key: string, value: string) => {
  res.cookie(key, value, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
};

export const clearCookie = (res: Response, key: string) => {
  res.clearCookie(key, {
    httpOnly: true,
    sameSite: "strict",
  });
};
