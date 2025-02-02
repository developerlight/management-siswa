import { supabase } from "@/app/lib/supabase";
import { NextResponse, NextRequest } from "next/server";

type Params = {
  id: object;
};

type RouteContext = {
  params: Params;
};

// GET by ID: Mengambil data mahasiswa berdasarkan ID
export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    console.log(`params`, context.params, 'tipe', typeof context.params);
    const { id } = await context.params;
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
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const {id} = await params;
    if (!id) {
      return NextResponse.json(
        { error: "ID tidak ditemukan" },
        { status: 400 }
      );
    }
    const { year } = await request.json();

    if (!year) {
      return NextResponse.json(
        { error: "Tahun tidak ditemukan" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("batches")
      .update({ year })
      .eq("id", id)
      .single();

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
