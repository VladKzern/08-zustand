import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import { absoluteUrl } from "@/utils/url";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Add a new note in NoteHub",
  openGraph: {
    title: "Create Note",
    description: "Add a new note in NoteHub",
    url: absoluteUrl("/notes/action/create"),
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create a new note</h1>
      <NoteForm />
    </div>
  );
}