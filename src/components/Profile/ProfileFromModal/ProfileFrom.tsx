"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

import AxiosInstance from "@/src/lib/axiosInstance";
import UpdatApi from "./UpdatApi";

interface ProfileFormProps {
  initialData: {
    _id: string;
    name: string;
    bio: string;
    image: string;
    password: string;
    role: string;
    address: string;
  };
}

const ProfileFormModal: React.FC<ProfileFormProps> = ({ initialData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State for form data
  const [name, setName] = useState(initialData.name || "");
  const [password, setPassword] = useState(initialData.password || "");
  const [role, setRole] = useState(initialData.role || "");
  const [bio, setBio] = useState(initialData.bio || "");
  const [address, setAddress] = useState(initialData.address || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Validate the fields
    // if (!name || !role || !bio || !address) {
    //   toast.error("All fields are required.");
    //   setLoading(false);
    //   return;
    // }

    // Append the file and form data
    if (file) {
      formData.append("file", file);
    }

    formData.append(
      "data",
      JSON.stringify({
        name,
        // password,
        role,
        bio,
        address,
      })
    );

    // Log the formData key-value pairs for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    UpdatApi(formData, initialData);
    // Send the request (no need to set Content-Type for FormData)
  };

  return (
    <>
      <Button onPress={onOpen}>Edit Profile</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Profile
              </ModalHeader>
              <ModalBody>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Profile Picture"
                      className="rounded-full"
                      height={80}
                      src={initialData.image || ""}
                      width={80}
                    />
                    <input type="file" onChange={handleFileChange} />
                  </div>
                  <Input
                    fullWidth
                    label="Name"
                    name="name"
                    placeholder="Your Name"
                    type="text"
                    value={name} // Use state for name
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Textarea
                    fullWidth
                    label="Bio"
                    name="bio"
                    placeholder="Your Bio"
                    value={bio} // Use state for bio
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" disabled={loading} type="submit">
                      {/* {loading ? "Updating..." : "Save Changes"} */}
                      Save change
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileFormModal;
