"use server";
import { cookies } from "next/headers";
import db from "./db";
import { encrypt, getSession } from "./auth";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { imageSchema, registerSchema, validateWithZodSchema } from "./schemas";
import { uploadImage } from "./supabase";

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "There was an error...",
  };
};

export const registerAction = async (prevState: any, formData: FormData) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validateFields = validateWithZodSchema(registerSchema, rawData);
    const image = formData.get("image") as File;
    const validateFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validateFile.image);
    const date = formData.get("birthDay") as string;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validateFields.password, salt);

    const birthDate = new Date(date);
    const birthDay = birthDate.getUTCDate();
    const birthMonth = birthDate.getUTCMonth();
    const birthYear = birthDate.getUTCFullYear();

    await db.users.create({
      data: {
        ...validateFields,
        image: fullPath,
        password: hashedPassword,
        birthDay,
        birthMonth,
        birthYear,
      },
    });
    // return { message: "User created" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/login");
};

export const loginAction = async (prevState: any, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const user = await db.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) return { message: "Invalid email or password" };
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) return { message: "Invalid email or password" };
    const expires = new Date(Date.now() + 60 * 24 * 24);
    const session = await encrypt({ user, expires });
    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const logoutAction = async () => {
  cookies().set("session", "", { expires: new Date(Date.now()) });
  redirect("/login");
};

export const fetchBirthDayUsers = async () => {
  const birthDate = new Date(Date.now());
  const birthDay = birthDate.getUTCDate();
  const users = await db.users.findMany({
    where: {
      birthDay,
    },
  });
  return users;
};
