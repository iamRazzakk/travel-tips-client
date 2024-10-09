/* eslint-disable prettier/prettier */

import NavbarPage from "@/src/components/navbar";

import { getCurrentUser } from "@/src/services/AuthService";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getCurrentUser();
  return (
    <div className="relative flex flex-col h-screen">
      <NavbarPage user={user} />
      <main>{children}</main>
    </div>
  );
}
