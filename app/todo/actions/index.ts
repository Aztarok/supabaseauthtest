"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function createTodo(title: string) {
    const supabase = await createSupabaseServerClient();
    const res = await supabase.from("todo-demo").insert({ title }).single();
    revalidatePath("/todo");
    return JSON.stringify(res);
}

export async function readTodo() {
    noStore();
    const supabase = await createSupabaseServerClient();
    return await supabase.from("todo-demo").select("*");
}

export async function deleteTodoById(id: string) {
    const supabase = await createSupabaseServerClient();
    await supabase.from("todo-demo").delete().eq("id", id);
    revalidatePath("/todo");
}

export async function updateTodoById(id: string, completed: boolean) {
    const supabase = await createSupabaseServerClient();
    await supabase.from("todo-demo").update({ completed }).eq("id", id);
    revalidatePath("/todo");
}
