import GetStarted from "@/components/GetStarted";
import RHFWithoutZod from "@/components/RHFandZod/RHFWithoutZod";
import TraditionalForm from "@/components/RHFandZod/TraditionalForm";
import RHFBasicUsage from "@/components/RHFBasicUsage";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto p-10 flex flex-col gap-8">
      <div className="flex gap-4 flex-col">
        <h1 className="font-bold text-xl">Basic Component</h1>
        <RHFBasicUsage />
      </div>

      <div className="flex gap-4 flex-col">
        <h1 className="font-bold text-xl">Getting Started</h1>
        <GetStarted />
      </div>
      <br />
      <h1 className="font-bold text-3xl">RHF with Zod tutorial...</h1>

      <div className="flex gap-4 flex-col">
        <h1 className="font-bold text-xl">Traditional Form</h1>
        <TraditionalForm />
      </div>

      <div className="flex gap-4 flex-col">
        <h1 className="font-bold text-xl">React Hook Form without Zod</h1>
        <RHFWithoutZod />
      </div>
    </main>
  );
}
