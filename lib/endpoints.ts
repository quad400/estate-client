"use server";

import { cookies } from "next/headers";
import { envConfig } from "@/config/env";
import { jwtDecode } from "jwt-decode";

export const getHeaders = () => ({});

export async function post(path: string, formData: any) {
  const data = JSON.stringify(formData);

  try {
    const res = await fetch(`${envConfig.base_url}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: data,
    });

    const parsedRes = await res.json();
    console.log(parsedRes);
    if (!res.ok) {
      console.log(parsedRes?.errors || "Something went wrong");
      return new Error(parsedRes?.errors || "Something went wrong");
    }

    const setCookieHeader = res?.headers.get("set-cookie");
    if (setCookieHeader) {
      const token = setCookieHeader.split(";")[0].split("=")[1];
      cookies().set({
        name: "_session",
        value: token,
        secure: true,
        httpOnly: true,
        expires: new Date(jwtDecode(token).exp! * 1000),
      });
    }

    return;
  } catch (error) {
    console.log(error);
  }
}

export async function patch(path: string, formData: any) {
  const data = JSON.stringify(formData);

  try {
    const res = await fetch(`${envConfig.base_url}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: data,
    });

    const parsedRes = await res.json();
    if (!res.ok) {
      console.log("Something went wrong", res.url);
    }

    return parsedRes;
  } catch (error) {
    console.log(error);
  }
}

export const get = async (path: string) => {
  const res = await fetch(`${envConfig.base_url}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });

  return res.json();
};

export const deleteMethod = async (path: string) => {
  const res = await fetch(`${envConfig.base_url}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
};
