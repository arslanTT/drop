import * as z from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password should me miniumum 8 characters" }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password don't match",
    path: ["passwordConfirmation"],
  });
