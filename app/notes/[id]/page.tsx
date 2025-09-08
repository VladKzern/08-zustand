import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "./NoteDetails.client";
import { absoluteUrl } from "@/utils/url";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content.slice(0, 150),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 150),
      url: absoluteUrl(`/notes/${params.id}`),
      type: "article",
      images: [
        {
          url: "https://www.5.ua/media/pictures/820x546/205549.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: Props) {
  return <NoteDetails id={params.id} />;
}