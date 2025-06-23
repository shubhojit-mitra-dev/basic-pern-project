"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface ApiResponse {
  message: string;
}

export default function HomePage() {
  const { data, isLoading, isError, error } = useQuery<string, Error>({
    queryKey: ["api-data"],
    queryFn: async () => {
      const response = await api.get<ApiResponse>("/");
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data.message;
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">PERN</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/docs"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Read Docs →</h3>
          </Link>
        </div>

        {/* API Data Section */}
        <div className="mt-8 w-full max-w-2xl rounded-lg bg-white/10 p-6">
          <h2 className="mb-4 text-2xl font-bold">API Data</h2>
          
          {isLoading && (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          )}
          
          {isError && (
            <div className="rounded-md bg-red-500/20 p-4 text-center">
              <p>Error: {error?.message || "Failed to fetch data"}</p>
            </div>
          )}
          
          {data && (
            <div className="overflow-hidden rounded-lg">
              <pre className="overflow-x-auto p-4 text-xl text-center">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}