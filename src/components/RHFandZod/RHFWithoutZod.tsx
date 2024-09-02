"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

// Second example shown

export default function RHFWithoutZod() {
  const { register, handleSubmit, formState, reset, getValues } = useForm();

  //Form state is an object that can be destructured further
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: FieldValues) => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log(data);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-gray-300 p-8"
    >
      <div className="flex flex-col gap-2">
        <span>Email</span>
        <input
          {...register("email", { required: "Email is required" })}
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
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Must have at least 6 characters" },
          })}
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
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "Passwords must match",
          })}
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
