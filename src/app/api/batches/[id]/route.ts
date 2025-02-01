import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

// GET by ID: Mengambil data mahasiswa berdasarkan ID
export async function GET(request: Request, { params }: { params: { id: string  } }) {
    const { id } = params;
    const { data, error } = await supabase.from('batches').select('year').eq('id', id).single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

// PUT: Mengupdate data siswa
export async function PUT(request: Request, { params }: { params: { id: string  } }) {
    try {
        const { id } = params;
      const { year } = await request.json();
  
      const { data, error } = await supabase
        .from("batches")
        .update({ year })
        .eq("id", id);
  
      if (error) {
        throw new Error(error.message);
      }
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }