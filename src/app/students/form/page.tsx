'use client';

import axios from "axios";
import { useState } from "react";

export default function StudentForm() {
  const [formData, setFormData] = useState({ full_name: "", nisn: "", birth_date: "" });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('formData', formData);
      await axios.post("/api/students", formData, {
        headers: { "Content-Type": "application/json" },
      });
      window.location.href = "/students";
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold text-center mb-4 text-black">Tambah Siswa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="w-full p-2 border text-black"
          required
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="NISN"
          className="w-full p-2 border text-black"
          required
          onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
        />
        <input
          type="date"
          placeholder="Tanggal Lahir"
          className="w-full p-2 border text-black"
          required
          onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">Simpan</button>
      </form>
    </div>
  );
}
