"use client";

// This is the first example shown...

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function RHFBasicUsage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // OnSubmit handles data validation
  // handleSubmit will be called first when a form is submitted
  // handleSubmit will automatically preventDefault of the normal form
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // Watch input by passing the name of it
  console.log(watch("example"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-gray-300 p-8"
    >
      {/** Register function puts it into the hook */}
      <input defaultValue="test" {...register("example")} className="w-full " />

      {/** Include the validation required inside the 2nd parameter of register
       * 2nd parameter is an options object, and likely contains validation things
       *
       */}

      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required!</span>}

      <button type="submit" className="p-4 bg-blue-500">
        Submit
      </button>
    </form>
  );
}
