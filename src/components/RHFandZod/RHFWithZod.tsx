"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

// Second example shown

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5, { message: "Must be at least 5 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default function RHFWithoutZod() {
  const { register, handleSubmit, formState, reset, getValues, setError } =
    useForm<SignUpSchemaType>({
      resolver: zodResolver(signUpSchema),
    });

  //Form state is an object that can be destructured further
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: SignUpSchemaType) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
      alert("Submitting form failed");
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", errors.email);
      }
    }

    //reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-gray-300 p-8"
    >
      <div className="flex flex-col gap-2">
        <span>Email</span>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded"
        />
        {errors.email && (
          <p className="bg-red-500 p-2">{`ERROR! ${errors.email.message}`}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span>Password</span>
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className="w-full px-4 py-2 rounded"
        />
        {errors.password && (
          <p className="bg-red-500 p-2">{`ERROR! ${errors.password.message}`}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span>Confirm Password</span>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="confirm password"
          className="w-full px-4 py-2 rounded"
        />
        {errors.confirmPassword && (
          <p className="bg-red-500 p-2">{`ERROR! ${errors.confirmPassword.message}`}</p>
        )}
      </div>

      <button
        type="submit"
        className="p-4 bg-blue-500 disabled:bg-gray-600"
        disabled={isSubmitting}
      >
        {false ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
