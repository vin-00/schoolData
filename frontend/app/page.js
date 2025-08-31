"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-black">School Management</h1>
      <div className="flex space-x-6">
        <button
          onClick={() => router.push("/addSchool")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700"
        >
          ➕ Add School
        </button>
        <button
          onClick={() => router.push("/showSchools")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-green-700"
        >
          🏫 View Schools
        </button>
      </div>
    </div>
  );
}
