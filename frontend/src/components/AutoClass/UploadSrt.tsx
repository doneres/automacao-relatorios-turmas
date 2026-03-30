import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface Props {
  arquivo: File | null;
  onArquivo: (f: File) => void;
  onErro: (msg: string) => void;
}

export default function UploadSrt({ arquivo, onArquivo, onErro }: Props) {
  const { colors, mode } = useTheme();
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.name.endsWith(".srt")) {
      onErro("Apenas arquivos .srt são aceitos.");
      return;
    }
    onErro("");
    onArquivo(f);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  return (
    <div
      onClick={() => fileRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${
          dragging ? colors.accentPrimary : arquivo ? "#4ade80" : colors.border
        }`,
        borderRadius: 12,
        padding: "32px 20px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.25s ease",
        background: dragging
          ? `${mode === "light" ? "rgba(255,107,53,0.05)" : "rgba(255,107,53,0.15)"}`
          : arquivo
            ? `${mode === "light" ? "rgba(74,222,128,0.05)" : "rgba(74,222,128,0.08)"}`
            : mode === "light"
              ? colors.bg.tertiary
              : "rgba(255,107,53,0.05)",
      }}
    >
      <div
        style={{
          fontSize: 36,
          marginBottom: 12,
          transition: "transform 0.2s ease",
          color: dragging
            ? colors.accentPrimary
            : arquivo
              ? "#4ade80"
              : colors.text.secondary,
        }}
      >
        <i
          className={`bi ${
            arquivo
              ? "bi-check-circle-fill"
              : dragging
                ? "bi-cloud-arrow-down"
                : "bi-cloud-arrow-up"
          }`}
        ></i>
      </div>
      <p
        style={{
          margin: "0 0 4px",
          fontWeight: 600,
          fontSize: 15,
          color: colors.text.primary,
        }}
      >
        {arquivo ? arquivo.name : "Clique ou arraste o arquivo"}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          color: colors.text.tertiary,
        }}
      >
        {arquivo
          ? `${(arquivo.size / 1024).toFixed(1)} KB`
          : "Apenas arquivos .srt"}
      </p>
      <input
        ref={fileRef}
        type="file"
        accept=".srt"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </div>
  );
}
