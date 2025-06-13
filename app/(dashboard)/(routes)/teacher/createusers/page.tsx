"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Import useUser from Clerk

interface FormData {
  name: string;
  email: string;
  role: MemberRole;
  imageUrl: string;
}

const CreateUserPage = () => {
  const { user } = useUser(); // Retrieve user data from Clerk
  const userId = user?.id; // Access the user ID from Clerk
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      // Prepare the data to be sent to the API
      const payload = {
        name: data.name,
        email: data.email,
        role: data.role,
        imageUrl: data.imageUrl || image || null,
      };

      // Send the data to your API endpoint
      const response = await fetch(`/api/profile/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the request was successful
      if (response.ok) {
        router.push("/teacher/users");
      } else {
        const errorData = await response.json();
        console.error("Error creating user:", errorData.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#6a0dad] to-[#4c00ff] p-6 mt-20">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-center mb-8 text-[#4c00ff]">
          Create New User
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Label htmlFor="name" className="text-lg font-medium text-[#4c00ff]">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-2"
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Label htmlFor="email" className="text-lg font-medium text-[#4c00ff]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-2"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Label htmlFor="role" className="text-lg font-medium text-[#4c00ff]">
              Role
            </Label>
            <div className="mt-2">
              <Select
                id="role"
                name="role"
                value={watch("role")}
                onChange={(value: string) => setValue("role", value as MemberRole)}
                onBlur={() => {}}
                options={[
                  { value: MemberRole.STUDENT, label: "Student" },
                  { value: MemberRole.TEACHER, label: "Teacher" },
                  { value: MemberRole.ADMIN, label: "Admin" },
                ]}
              />
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Label htmlFor="imageUrl" className="text-lg font-medium text-[#4c00ff]">
              Profile Image
            </Label>
            <div className="flex justify-center items-center mt-2">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-[#28a745] text-white w-full mt-6 flex items-center justify-center"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create User
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateUserPage;
