"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import logo from "../assets/logo.png";
import { logOut } from "../services/AuthService";

export default function NavbarPage({ user }) {
  const [userData, setUserData] = useState(user);

  const handleLogout = async () => {
    try {
      await logOut();
      setUserData(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <Image
              alt="logo"
              className="rounded-3xl"
              height={30}
              src={logo}
              width={40}
            />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" color="secondary" href="/categories">
              Categories
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/create-post">
              Create Post
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/following">
              Following
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/premium">
              Premium
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
        />
        {userData ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={userData.name}
                size="sm"
                src={
                  userData.avatar ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                } // Display user's avatar or default image
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="">
                <Link href="/profile">Profile</Link>
              </DropdownItem>
              <DropdownItem key="notifications">
                <Link href="/notifications">Notifications</Link>
              </DropdownItem>
              <DropdownItem key="payment-history">
                <Link href="/payment-history">Payment History</Link>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link href="/settings">Settings</Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Link color="primary" href="/login">
              Log In
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
