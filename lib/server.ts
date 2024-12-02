"use server";

import { envConfig } from "@/config/env";
import { get, post } from "./endpoints";
import { cookies } from "next/headers";

export const getCurrent = async () => {
  const res = await get("/users/me");
  return res.data;
};

export const getAgent = async () => {
  const res = await get("/agents/me");
  return res.data;
};

export const signOut = async () => {
  const res = await fetch(`${envConfig.base_url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });

  const parsedRes = await res.json();
  console.log(parsedRes);
  if (!res.ok) {
    console.log(parsedRes?.errors || "Something went wrong");
    return new Error(parsedRes?.errors || "Something went wrong");
  }

  cookies().delete("_session");
};

export const getMyEstates = async (page = 1) => {
  const res = await get(`/estates/user/my-estates?limit=3&page=${page}`);
  return res.data;
};

export const getEstates = async (page = 1) => {
  const res = await get(`/estates/?limit=3&page=${page}`);
  return res.data;
};

export const getEstate = async (estateId: string) => {
  const res = await get(`/estates/${estateId}`);
  return res.data;
};

export const getFeedbacks = async (estateId: string, page = 1) => {
  const res = await get(`/estates/${estateId}/feedbacks?limit=3&page=${page}`);
  return res.data;
};
