"use client";

import { Profile, MemberRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, X } from "lucide-react"; // Import X for the close button
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal"; 
import { Input } from "@/components/ui/input";

// Update user profile through API
const updateUserProfile = async (id: string, formData: { name?: string; email?: string; imageUrl?: string; role?: MemberRole }) => {
  try {
    console.log("Updating profile with:", formData);

    const response = await fetch(`/api/profile/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update profile:", errorData);
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    console.log("Profile updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Table columns definition
export const columns: ColumnDef<Profile, keyof Profile>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-[#fcb61a]">
        Name
        {column.getIsSorted() && <ArrowUpDown className="h-4 w-4 ml-2" />}
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-[#fcb61a]">
        Email
        {column.getIsSorted() && <ArrowUpDown className="h-4 w-4 ml-2" />}
      </Button>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-[#fcb61a]">
        Role
        {column.getIsSorted() && <ArrowUpDown className="h-4 w-4 ml-2" />}
      </Button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("role");
      const badgeColor = role === "ADMIN" ? "green" : role === "TEACHER" ? "blue" : "gray";
      return typeof role === "string" ? <Badge color={badgeColor}>{role}</Badge> : null;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, name, email, role } = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [formData, setFormData] = useState<{ name: string; email: string; role: MemberRole }>({
        name,
        email,
        role,
      });

      const handleModalClose = () => setIsModalOpen(false);

      const handleFormSubmit = async () => {
        try {
          await updateUserProfile(id, formData);
          handleModalClose();
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <MoreHorizontal className="h-4 w-4 cursor-pointer" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-[#fcb61a]">Edit Profile</h2>
                  <Button variant="ghost" onClick={handleModalClose} className="text-red-500 hover:text-red-700">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <Input
                      label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white text-black" // Ensure the input text is clearly visible
                    />
                  </div>
                  <div>
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white text-black" // Ensure the input text is clearly visible
                    />
                  </div>
                  <div>
                    <Input
                      label="Role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as MemberRole })}
                      className="bg-white text-black" // Ensure the input text is clearly visible
                    />
                  </div>
                  <div className="mt-4 flex justify-end space-x-4">
                    <Button onClick={handleModalClose}>Cancel</Button>
                    <Button onClick={handleFormSubmit} variant="success">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </Modal>
          )}
        </>
      );
    },
  },
];
