'use client';

import axios from "axios";
import { useState } from "react";

export default function StudentForm() {
  const [formData, setFormData] = useState({ year: 0});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('formData', formData);
      await axios.post("/api/batches", formData, {
        headers: { "Content-Type": "application/json" },
      });
      window.location.href = "/batches";
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold text-center mb-4 text-black">Tambah angkatan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Tahun angkatan"
          className="w-full p-2 border text-black"
          required
          onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">Simpan</button>
      </form>
    </div>
  );
}
