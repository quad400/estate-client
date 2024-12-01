import { Home } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
     <main className="w-full pt-[90px]">
        <Link
          href="/dashboard"
          className="ml-4 bg-neutral-50 hover:bg-neutral-100 transition-all rounded-md flex justify-center items-center w-10 h-10"
        >
          <Home className="h-5 w-5 text-neutral-800" />
        </Link>
        {children}
      </main>
    );
}
