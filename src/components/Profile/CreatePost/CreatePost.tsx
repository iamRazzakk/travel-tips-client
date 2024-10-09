/* eslint-disable padding-line-between-statements */
"use client";

import defaultImage from "@/src/assets/userImage.jpg";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { TUSER } from "@/src/types/userTypes/user.types";
import { useState } from "react";
import nexiosInstance from "@/src/config/nexios.config";
import { categories } from "./category"; // Assuming this array matches the backend category enums
import { toast } from "sonner";
import Cookies from "js-cookie";
import AxiosInstance from "@/src/lib/axiosInstance";

const CreatePost = ({ user }: { user: TUSER }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("Adventure");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [imageError, setImageError] = useState<string>("");

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    console.log(selectedFiles); // Should show all selected files

    if (selectedFiles && selectedFiles.length > 3) {
      setImageError("You can upload up to 3 images.");
      return;
    }

    setImageError("");
    setImages(selectedFiles); // Update the state with selected files
  };

  // Handle category change
  const handleCategoryChange = (selected: string[]) => {
    if (selected.length > 0) {
      setCategory(selected[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("isPremium", isPremium.toString());
    formData.append("user", user?._id); // Ensure user ID is valid

    // Append images if any are selected
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("file", images[i]); // Match "file" key from Postman
      }
    }
    const accessToken = Cookies.get("accessToken");
    try {
      // Log the FormData for debugging
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      // Make the API request without Bearer Token
      const response = await AxiosInstance.post("/post", { formData });

      console.log("Post created successfully", response.data);
      toast.success("Post created successfully");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error uploading post:", error);
      toast.error("Error creating post. Please try again.");
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={onOpen}>
        <Input
          placeholder="What's on your mind?"
          size="lg"
          readOnly
          isClearable={false}
          icon={
            <Image
              src={user?.image || defaultImage}
              alt="User Avatar"
              width={40}
              height={40}
            />
          }
        />
      </div>

      <Modal size="md" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Post
              </ModalHeader>
              <ModalBody>
                <div className="mb-4">
                  <Image
                    alt="User Profile"
                    className="w-10 h-10 rounded-full"
                    src={user?.image || defaultImage}
                  />
                </div>
                <Input
                  isClearable
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the title"
                  className="mb-4"
                />
                <Textarea
                  label="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content"
                  className="mb-4"
                  minRows={4}
                />
                <Select
                  label="Categories"
                  placeholder="Select a Category"
                  selectionMode="single"
                  onSelectionChange={handleCategoryChange}
                  className="max-w-xs"
                >
                  {categories?.map((categorie, index) => (
                    <SelectItem key={index} value={categorie}>
                      {categorie}
                    </SelectItem>
                  ))}
                </Select>
                <div className="mb-4">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imageError && <p className="text-red-500">{imageError}</p>}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Create Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
