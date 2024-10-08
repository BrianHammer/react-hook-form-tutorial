import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5, { message: "Must be at least 5 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
