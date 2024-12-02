import { Home } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full pt-[90px]">
      <div className="container -z-10">
        <Link
          href="/dashboard"
          className="bg-neutral-50 z-30 hover:bg-neutral-100 transition-all rounded-md flex justify-center items-center w-10 h-10"
        >
          <Home className="h-5 w-5 text-neutral-800" />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    </main>
  );
}
