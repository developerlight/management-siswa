// app/api/students/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

// GET: Mendapatkan daftar siswa
export async function GET() {
  try {
    const { data, error } = await supabase.from("students").select("*");
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: Menambahkan siswa baru
export async function POST(request: Request) {
  try {
    const { full_name, nisn, birth_date } = await request.json();

    const { data, error } = await supabase
      .from("students")
      .insert([{ full_name, nisn, birth_date }]);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PUT: Mengupdate data siswa
export async function PUT(request: Request) {
  try {
    const { id, full_name, nisn, birth_date } = await request.json();

    const { data, error } = await supabase
      .from("students")
      .update({ full_name, nisn, birth_date })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: Menghapus siswa
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const { data, error } = await supabase.from("students").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
