"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Batch {
    id: number;
    year: number;
}

export default function BatchesTable() {
    const [batches, setDataBatches] = useState<Batch[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/batches");
                setDataBatches(response.data);
            } catch (error) {
                console.error("There was an error!", error);
            }
        };

        fetchData();
    }, []);
    console.log(`batches`, batches);
    const deleteStudent = async (id: number) => {
        if (!confirm("Apakah anda yakin menghapus data ini?")) return;
        try {
            await axios.delete("/api/batches", {
                headers: {
                    "Content-Type": "application/json",
                },
                data: { id }
            });
            setDataBatches(batches.filter(batch => batch.id !== id));
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Daftar Angkatan</h1>
            <Link
                href="/batches/add"
                className="mb-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Tambah Angkatan
            </Link>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="border p-2">No</th>
                        <th className="border p-2">Year</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {batches.map((batch, index) => (
                        <tr key={batch.id} className="text-center bg-gray-50">
                            <td className="border p-2 text-black">{index + 1}</td>
                            <td className="border p-2 text-black">{batch.year}</td>
                            <td className="border p-2 space-x-2">
                                <Link
                                    href={`/batches/${batch.id}`}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteStudent(batch.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}