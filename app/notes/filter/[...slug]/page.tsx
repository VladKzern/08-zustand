import type { Metadata } from "next";
import NotesClient from "./Notes.client";
import { absoluteUrl } from "@/utils/url";

interface Props {
  params: { slug?: string[] };
  searchParams: { page?: string; q?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] ?? "All";

  return {
    title: `Notes — ${tag}`,
    description: `Browse ${tag} notes in NoteHub`,
    openGraph: {
      title: `Notes — ${tag}`,
      description: `Browse ${tag} notes in NoteHub`,
      url: absoluteUrl(`/notes/filter/${tag}`),
      type: "website",
    },
  };
}

export default function FilterPage({ params }: Props) {
  const tag = params.slug?.[0] ?? "All";
  return <NotesClient tag={tag} />;
}