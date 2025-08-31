"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append("image", data.image[0]);

    try {
      await axios.post("http://localhost:5000/api/schools", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("School added successfully!");
      reset();
    } catch (err) {
      setMessage("Error: " + err.response?.data?.error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        
        <input {...register("name", { required: true })} placeholder="School Name"
          className="w-full border p-2 rounded"/>
        {errors.name && <p className="text-red-500">Name is required</p>}
        
        <textarea {...register("address", { required: true })} placeholder="Address"
          className="w-full border p-2 rounded"/>
        {errors.address && <p className="text-red-500">Address is required</p>}

        <input {...register("city", { required: true })} placeholder="City"
          className="w-full border p-2 rounded"/>
        {errors.city && <p className="text-red-500">City is required</p>}

        <input {...register("state", { required: true })} placeholder="State"
          className="w-full border p-2 rounded"/>
        {errors.state && <p className="text-red-500">State is required</p>}

        <input {...register("contact", { required: true, pattern: /^[0-9]{10}$/ })}
          placeholder="Contact Number" className="w-full border p-2 rounded"/>
        {errors.contact && <p className="text-red-500">Valid 10-digit number required</p>}

        <input {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email" className="w-full border p-2 rounded"/>
        {errors.email_id && <p className="text-red-500">Valid email required</p>}

        <input type="file" {...register("image", { required: true })} className="w-full"/>
        {errors.image && <p className="text-red-500">Image is required</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
