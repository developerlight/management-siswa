'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const EditBatchPage = () => {
  const [batch, setBatch] = useState<any>({
    year: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();

  // Ambil data siswa untuk edit
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/batches/${id}`);
        setBatch(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBatch({ ...batch, [e.target.name]: e.target.value });
  };

  // Mengirim data untuk diperbarui
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('batch', batch);
      await axios.put(`/api/batches/${id}`, batch);
      router.push("/batches"); // Redirect ke halaman daftar siswa
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg">
      <h1 className="text-xl font-bold mb-4">Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={batch.year}
            onChange={handleChange}
            className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBatchPage;
