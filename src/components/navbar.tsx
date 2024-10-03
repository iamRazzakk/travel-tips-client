// NavbarPageClient.tsx (Client Component)
"use client"; // This is a client component

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import logo from "../assets/logo.png";
import { logOut } from "../services/AuthService";

const NavbarPage = ({ user }) => {
  const handleLogout = async () => {
    logOut(); // Call the logout function when user clicks log out
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Image
          alt="Travel Tips & Destination Guides logo"
          className="rounded-full"
          height={40}
          src={logo}
          width={60}
        />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="secondary" href="#">
            Destinations
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Travel Tips
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Premium Content
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <ThemeSwitch />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user ? user.name : "Guest"}
              size="sm"
              src={
                user
                  ? `https://i.pravatar.cc/150?u=${user.email}`
                  : "https://i.pravatar.cc/150?u=guest"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {user ? (
              <>
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>{" "}
                  {/* Display user email */}
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  onClick={handleLogout}
                  key="logout"
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </>
            ) : (
              <DropdownItem key="login" color="primary">
                <Link href="/login">Log In</Link>{" "}
                {/* Display login link if no user is logged in */}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
export default NavbarPage;
