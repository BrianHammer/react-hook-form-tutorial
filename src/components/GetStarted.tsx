"use client";

// This is the first example shown...

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
};

export default function GetStarted() {
  const { register, handleSubmit, formState, watch } = useForm<Inputs>({
    defaultValues: {
      firstName: "Bill",
      lastName: "Nye",
    },
  });

  const firstName = watch("firstName");

  // This field must be destructured
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-gray-300 p-8"
    >
      <div className="flex flex-col gap-2">
        <span>First Name: {firstName}</span>
        <input
          placeholder="First Name"
          {...register("firstName", {
            required: "This field is required",
            maxLength: {
              value: 10,
              message: "THe maximum length of this field is 10",
            },
            minLength: {
              value: 3,
              message: "Must be at least 3 characters",
            },
          })}
          className="w-full "
        />
        <p className="bg-red-500">{errors.firstName?.message}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span>Last Name</span>
        <input
          placeholder="Last Name"
          {...register("lastName", {
            required: "This field is required.",
            minLength: { value: 3, message: "3 characters required" },
          })}
        />
        <p className="bg-red-500">{errors.lastName?.message}</p>
      </div>

      <button type="submit" className="p-4 bg-blue-500">
        Submit
      </button>
    </form>
  );
}
