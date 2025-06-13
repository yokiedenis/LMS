"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
  initialData: {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null; // Nullable price
    isPublished: boolean;
    categoryId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  courseId: string;
}

// Form schema, allowing 0 as a valid price, and preventing negative values
const formSchema = z.object({
  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price cannot be negative"), // Accepts 0 and prevents negative values
});

export const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // Handle null price by defaulting it to 0
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price ?? 0, // Convert null to 0
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitted values:", values); // Check submitted values
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Cancel</> : <><Pencil className="h-4 w-4 mr-2" /> Edit Price</>}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn("text-sm mt-2", initialData.price === 0 ? "text-slate-500 italic" : "")}>
          {initialData.price === 0 ? "Free" : formatPrice(initialData.price!)}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course (0 for Free)"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} // Parse input value
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
