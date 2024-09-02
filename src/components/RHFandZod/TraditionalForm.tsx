"use client";

import React, { useState } from "react";
// This is the first example shown...

export default function TraditionalForm() {
  // This field must be destructured

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Add submitting portion
  const [isSubmitting, setIsSubmitting] = useState(false);

  //For managing errors...
  const [errors, setErrors] = useState<string[]>([]);

  const validateFields = () => {
    if (password !== confirmPassword) {
      setErrors(["Password and confirm password must match"]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    await delay(700);

    if (password !== confirmPassword) {
      setErrors(["Password and confirm password must match"]);
    }

    setIsSubmitting(false);
    //TODO: Submit to server
    // ...
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-gray-300 p-8"
    >
      {/** You must print all errors out... */}
      {errors.length > 0 && (
        <p className="bg-red-500 p-2">Something went wrong</p>
      )}
      <div className="flex flex-col gap-2">
        <span>Email</span>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded"
        />
        <p className="bg-red-500">{false && "error"}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span>Password</span>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          maxLength={12}
          minLength={6}
          placeholder="password"
          className="w-full px-4 py-2 rounded"
        />
        <p className="bg-red-500">{false && "Error"}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span>Confirm Password</span>
        <input
          required
          maxLength={12}
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="confirm password"
          className="w-full px-4 py-2 rounded"
        />
        <p className="bg-red-500">{false && "Error"}</p>
      </div>

      <button
        type="submit"
        className="p-4 bg-blue-500 disabled:bg-gray-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
