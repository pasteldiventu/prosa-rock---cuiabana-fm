"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

function toNullableString(value: FormDataEntryValue | null): string | null {
  if (!value) return null;
  const parsed = String(value).trim();
  return parsed.length > 0 ? parsed : null;
}

function resolveSlug(slugInput: string | null, title: string): string {
  const normalized = slugify(slugInput ?? title);
  if (!normalized) {
    throw new Error("Slug invalido. Use letras e numeros.");
  }
  return normalized;
}

export async function createPostAction(formData: FormData) {
  const { supabase, user } = await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const slugInput = toNullableString(formData.get("slug"));
  const status = String(formData.get("status") ?? "draft");

  if (!title || !description || !content) {
    throw new Error("Titulo, descricao e conteudo sao obrigatorios.");
  }

  const slug = resolveSlug(slugInput, title);
  const publishedAt = status === "published" ? new Date().toISOString() : null;

  const { error } = await supabase.from("posts").insert({
    title,
    slug,
    description,
    content,
    guest: toNullableString(formData.get("guest")),
    cover_image_url: toNullableString(formData.get("cover_image_url")),
    status,
    published_at: publishedAt,
    author_id: user.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}

export async function updatePostAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");
  const slugInput = toNullableString(formData.get("slug"));

  if (!id || !title || !description || !content) {
    throw new Error("Dados do post invalidos.");
  }

  const slug = resolveSlug(slugInput, title);

  const payload: {
    title: string;
    description: string;
    content: string;
    status: string;
    slug: string;
    guest: string | null;
    cover_image_url: string | null;
    published_at?: string | null;
  } = {
    title,
    description,
    content,
    status,
    slug,
    guest: toNullableString(formData.get("guest")),
    cover_image_url: toNullableString(formData.get("cover_image_url")),
  };

  if (status === "published") {
    payload.published_at = new Date().toISOString();
  } else {
    payload.published_at = null;
  }

  const { error } = await supabase.from("posts").update(payload).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("ID do post obrigatorio.");
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}

export async function signOutAction() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
