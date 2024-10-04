/* eslint-disable prettier/prettier */

// import { getCurrentUser } from "@/src/services/AuthService";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <main>{children}</main>
    </div>
  );
}
