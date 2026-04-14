"use client";
import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
      .from("post-images")
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

      setError(`Erro ao fazer upload. ${details || "Tente novamente."}`);
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("post-images")
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
          className="mt-2 h-40 w-full rounded-md object-cover border border-prosa-purple/25"
        />
      )}
    </div>
  );
}