// app/api/batches/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

// GET: Mendapatkan daftar siswa
export async function GET() {
  try {
    const { data, error } = await supabase.from("batches").select("*");
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
    const { year } = await request.json();

    const { data, error } = await supabase
      .from("batches")
      .insert([{ year }]);
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: Menghapus siswa
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const { data, error } = await supabase.from("batches").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
