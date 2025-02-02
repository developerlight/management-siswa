import { supabase } from "@/app/lib/supabase";
import { NextResponse, NextRequest } from "next/server";

// GET by ID: Mengambil data mahasiswa berdasarkan ID
export async function GET(
  request: NextRequest,
  context: { params?: { id?: string } }
) {
  try {
    const id = context.params?.id;
    if (!id) {
      return NextResponse.json(
        { error: "ID tidak ditemukan" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("batches")
      .select("year")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT: Mengupdate data siswa
export async function PUT(
  request: NextRequest,
  context: { params?: { id?: string } }
) {
  try {
    const id = context.params?.id;
    if (!id) {
      return NextResponse.json(
        { error: "ID tidak ditemukan" },
        { status: 400 }
      );
    }
    const { year } = await request.json();

    const { data, error } = await supabase
      .from("batches")
      .update({ year })
      .eq("id", id);

    if (error) {
      throw new Error((error as Error).message);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
