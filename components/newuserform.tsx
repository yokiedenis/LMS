// // components/NewUserForm.tsx
// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";

// const NewUserForm = () => {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       role: "", // Optional: assign default role here
//     },
//   });

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       await axios.post("/api/users", data); // Endpoint to create a user
//       toast.success("User created successfully!");
//       reset();
//       router.refresh(); // Refresh to show the new user in the list
//     } catch (error) {
//       toast.error("Failed to create user.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label>Name</label>
//         <input
//           {...register("name")}
//           placeholder="Enter name"
//           required
//           className="input"
//         />
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           {...register("email")}
//           placeholder="Enter email"
//           type="email"
//           required
//           className="input"
//         />
//       </div>
//       <Button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Creating..." : "Create User"}
//       </Button>
//     </form>
//   );
// };

// export default NewUserForm;
