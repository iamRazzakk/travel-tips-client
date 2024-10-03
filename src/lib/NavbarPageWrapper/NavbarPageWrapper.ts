import { getCurrentUser } from "@/src/services/AuthService";

export default async function NavbarPageWrapper() {
    const user = await getCurrentUser();

    return <NavbarPage user={ user } />;
}