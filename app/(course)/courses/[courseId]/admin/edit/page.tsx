// app/admin/courses/[courseId]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select } from "@/components/ui/select"; // Your custom Select component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSuperAdmin } from "@/lib/isSuperAdmin";

// Placeholder for use-toast (to be replaced with shadcn/ui toast if installed)
const toast = ({ title, description, variant }: { title: string; description?: string; variant?: "default" | "destructive" }) => {
  console.log(`Toast: ${title}${description ? ` - ${description}` : ""}${variant ? ` (${variant})` : ""}`);
  alert(`${title}${description ? `\n${description}` : ""}`);
};

// Placeholder for MultiSelect (to be replaced with actual implementation)
interface MultiSelectProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selected, onChange }) => {
  const handleChange = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => handleChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  categoryId: string | null;
  mode: "LIVE" | "HYBRID" | "ONDEMAND";
  instructors: { user: { id: string; name: string } }[];
}

interface User {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

export default function EditCourse() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    mode: "ONDEMAND" as "LIVE" | "HYBRID" | "ONDEMAND",
    instructorIds: [] as string[],
  });

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Fetch course details
    fetch(`/api/admin/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price ? data.price.toString() : "",
          categoryId: data.categoryId || "",
          mode: data.mode || "ONDEMAND",
          instructorIds: data.instructors.map((i: { user: { id: string } }) => i.user.id),
        });
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        toast({ title: "Error fetching course", variant: "destructive" });
      });

    // Fetch teachers
    fetch("/api/users?role=TEACHER")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        toast({ title: "Error fetching teachers", variant: "destructive" });
      });

    // Fetch categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast({ title: "Error fetching categories", variant: "destructive" });
      });
  }, [courseId, isLoaded, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({ title: "Course updated successfully" });
        router.push("/admin/courses");
      } else {
        const error = await res.json();
        toast({
          title: "Error updating course",
          description: error.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast({ title: "Error updating course", variant: "destructive" });
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user || !isSuperAdmin(user.id)) {
    return <div>You are not authorized to access course management.</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                id="category"
                name="category"
                value={formData.categoryId}
                onChange={(value: string) => setFormData({ ...formData, categoryId: value })}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onBlur={() => {}}
              >
                Category
              </Select>
            </div>
            <div>
              <Label>Course Mode</Label>
              <Select
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={(value: string) =>
                  setFormData({
                    ...formData,
                    mode: value as "LIVE" | "HYBRID" | "ONDEMAND",
                  })
                }
                options={[
                  { value: "LIVE", label: "Live" },
                  { value: "HYBRID", label: "Hybrid" },
                  { value: "ONDEMAND", label: "On-Demand" },
                ]}
                onBlur={() => {}}
              >
                Course Mode
              </Select>
            </div>
            <div>
              <Label>Instructors</Label>
              <MultiSelect
                options={teachers.map((teacher) => ({
                  value: teacher.id,
                  label: teacher.name,
                }))}
                selected={formData.instructorIds}
                onChange={(selected: string[]) =>
                  setFormData({ ...formData, instructorIds: selected })
                }
              />
            </div>
            <Button type="submit">Update Course</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}