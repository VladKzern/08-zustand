"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.client.module.css";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Error loading note</p>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.header}>
        <h3>{note.title}</h3>
        <button className={css.closeButton} onClick={() => router.back()}>
          ×
        </button>
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.meta}>
        <strong>Tag:</strong> {note.tag} <br />
        <strong>Created:</strong> {new Date(note.createdAt).toLocaleString()}
      </p>
    </Modal>
  );
}