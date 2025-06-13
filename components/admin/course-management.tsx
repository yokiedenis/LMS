// components/admin/course-management.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

// Placeholder for use-toast (to be replaced with shadcn/ui toast if installed)
const toast = ({ title, description, variant }: { title: string; description?: string; variant?: "default" | "destructive" }) => {
  console.log(`Toast: ${title}${description ? ` - ${description}` : ""}${variant ? ` (${variant})` : ""}`);
  // Replace with actual toast implementation, e.g., alert or a UI library
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
  mode: "LIVE" | "HYBRID" | "ONDEMAND";
  instructors: { user: { id: string; name: string } }[];
  liveSessions: { id: string; title: string; startTime: string }[];
}

interface User {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

export default function CourseManagement() {
  const { user, isLoaded } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
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
  const [liveSessionForm, setLiveSessionForm] = useState({
    courseId: "",
    title: "",
    startTime: "",
    endTime: "",
    meetingUrl: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Fetch courses
    fetch("/api/admin/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        console.error("Error fetching courses:", error);
        toast({ title: "Error fetching courses", variant: "destructive" });
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
  }, [isLoaded, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({ title: "Course created successfully" });
        router.refresh();
      } else {
        const error = await res.json();
        toast({
          title: "Error creating course",
          description: error.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast({ title: "Error creating course", variant: "destructive" });
    }
  };

  const handleLiveSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/courses/${liveSessionForm.courseId}/live-sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(liveSessionForm),
      });
      if (res.ok) {
        toast({ title: "Live session created successfully" });
        router.refresh();
      } else {
        const error = await res.json();
        toast({
          title: "Error creating live session",
          description: error.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating live session:", error);
      toast({ title: "Error creating live session", variant: "destructive" });
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to access course management.</div>;
  }

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
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
                onChange={(value) => setFormData({ ...formData, categoryId: value })}
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
                onChange={(value) =>
                  setFormData({ ...formData, mode: value as "LIVE" | "HYBRID" | "ONDEMAND" })
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
                onChange={(selected) => setFormData({ ...formData, instructorIds: selected })}
              />
            </div>
            <Button type="submit">Create Course</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create Live Session</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLiveSessionSubmit} className="space-y-4">
            <div>
              <Label>Course</Label>
              <Select
                id="course"
                name="course"
                value={liveSessionForm.courseId}
                onChange={(value) => setLiveSessionForm({ ...liveSessionForm, courseId: value })}
                options={courses.map((course) => ({
                  value: course.id,
                  label: course.title,
                }))}
                onBlur={() => {}}
              >
                Course
              </Select>
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={liveSessionForm.title}
                onChange={(e) => setLiveSessionForm({ ...liveSessionForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Start Time</Label>
              <Input
                type="datetime-local"
                value={liveSessionForm.startTime}
                onChange={(e) =>
                  setLiveSessionForm({ ...liveSessionForm, startTime: e.target.value })
                }
              />
            </div>
            <div>
              <Label>End Time</Label>
              <Input
                type="datetime-local"
                value={liveSessionForm.endTime}
                onChange={(e) =>
                  setLiveSessionForm({ ...liveSessionForm, endTime: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Meeting URL</Label>
              <Input
                value={liveSessionForm.meetingUrl}
                onChange={(e) =>
                  setLiveSessionForm({ ...liveSessionForm, meetingUrl: e.target.value })
                }
              />
            </div>
            <Button type="submit">Create Live Session</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {courses.map((course) => (
            <div key={course.id} className="border-b py-4">
              <h3 className="font-bold">{course.title}</h3>
              <p>{course.description || "No description provided"}</p>
              <p>Mode: {course.mode}</p>
              <p>Instructors: {course.instructors.map((i) => i.user.name).join(", ") || "None"}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Live Sessions:</h4>
                {course.liveSessions.length > 0 ? (
                  course.liveSessions.map((session) => (
                    <div key={session.id}>
                      <p>
                        {session.title} - {new Date(session.startTime).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No live sessions scheduled</p>
                )}
              </div>
              <div className="mt-2 space-x-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/admin/courses/${course.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete this course?")) {
                      try {
                        const res = await fetch(`/api/admin/courses/${course.id}`, {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          toast({ title: "Course deleted successfully" });
                          router.refresh();
                        } else {
                          const error = await res.json();
                          toast({
                            title: "Error deleting course",
                            description: error.error,
                            variant: "destructive",
                          });
                        }
                      } catch (error) {
                        console.error("Error deleting course:", error);
                        toast({ title: "Error deleting course", variant: "destructive" });
                      }
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}