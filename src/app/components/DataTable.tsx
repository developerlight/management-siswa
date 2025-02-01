"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Student {
    id: number;
    full_name: string;
    nisn: string;
    birth_date: string;
}

export default function DataTable() {
    const [students, setDataStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/students");
                setDataStudents(response.data);
            } catch (error) {
                console.error("There was an error!", error);
            }
        };

        fetchData();
    }, []);
    console.log(`students`, students);
    const deleteStudent = async (id: number) => {
        if (!confirm("Apakah anda yakin menghapus data ini?")) return;
        try {
            await axios.delete("/api/students", {
                headers: {
                    "Content-Type": "application/json",
                },
                data: { id }
            });
            setDataStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Daftar Siswa</h1>
            <Link
                href="/students/form"
                className="mb-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Tambah Siswa
            </Link>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="border p-2">No</th>
                        <th className="border p-2">Nama Lengkap</th>
                        <th className="border p-2">NISN</th>
                        <th className="border p-2">Tgl Lahir</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} className="text-center bg-gray-50">
                            <td className="border p-2 text-black">{index + 1}</td>
                            <td className="border p-2 text-black">{student.full_name}</td>
                            <td className="border p-2 text-black">{student.nisn}</td>
                            <td className="border p-2 text-black">{student.birth_date}</td>
                            <td className="border p-2 space-x-2">
                                <Link
                                    href={`/students/form?id=${student.id}`}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteStudent(student.id)}
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