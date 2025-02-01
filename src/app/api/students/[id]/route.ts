import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

// GET by ID: Mengambil data mahasiswa berdasarkan ID
export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;
    const { data, error } = await supabase.from('students').select('*').eq('id', id).single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}