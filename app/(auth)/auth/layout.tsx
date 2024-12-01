import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full items-center pt-24 mb-10">
        {children}
    </div>
  );
}
