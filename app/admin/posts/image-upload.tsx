"use client";
import { useState, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();
const POST_IMAGES_BUCKET = process.env.NEXT_PUBLIC_POST_IMAGES_BUCKET ?? "post-images";

export function ImageUpload({
  name,
  defaultUrl,
}: {
  name: string;
  defaultUrl?: string | null;
}) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop();
    const fileName = `covers/${Date.now()}.${ext}`;

    const { data, error: uploadError } = await supabase.storage
      .from(POST_IMAGES_BUCKET)
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Erro no upload da imagem", {
        fileName,
        fileType: file.type,
        fileSize: file.size,
        uploadError,
      });

      const details = [
        uploadError.message,
        uploadError.statusCode ? `Status: ${uploadError.statusCode}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const isBucketNotFound =
        uploadError.statusCode === "404" && /bucket not found/i.test(uploadError.message);
      const isStorageRlsError =
        uploadError.statusCode === "403" && /row-level security policy/i.test(uploadError.message);

      setError(
        isBucketNotFound
          ? `Erro ao fazer upload. Bucket "${POST_IMAGES_BUCKET}" nao encontrado. Crie esse bucket no Supabase Storage ou ajuste NEXT_PUBLIC_POST_IMAGES_BUCKET.`
          : isStorageRlsError
            ? "Erro ao fazer upload. Seu usuario nao tem permissao no bucket (RLS). Configure policies de insert/update/delete para admin/editor em storage.objects."
            : `Erro ao fazer upload. ${details || "Tente novamente."}`
      );
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from(POST_IMAGES_BUCKET)
      .getPublicUrl(data.path);

    setUrl(publicData.publicUrl);
    setUploading(false);
  }

  return (
    <div className="md:col-span-2 space-y-2">
      {/* campo hidden que vai pro form */}
      <input type="hidden" name={name} value={url} />

      <label className="block text-sm text-zinc-400 uppercase tracking-wider">
        Imagem de capa
      </label>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="URL da imagem (ou faça upload)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-md border border-prosa-purple/25 bg-dark-elevated px-4 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-sm border border-prosa-purple/40 bg-dark-elevated px-4 py-2 text-sm uppercase tracking-wider text-zinc-300 hover:border-prosa-pink/50 disabled:opacity-50"
        >
          {uploading ? "Enviando..." : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {url && (
        <img
          src={url}
          alt="Preview"
          className="mt-2 max-h-96 w-full rounded-md border border-prosa-purple/25 bg-black/30 object-contain"
        />
      )}
    </div>
  );
}