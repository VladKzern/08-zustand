"use client";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";  
import NoteDetailsClient from "./NoteDetails.client";

export default function NoteDetailsPage() {
  const { id } = useParams();  

  const noteId = Array.isArray(id) ? id[0] : id;  

  if (!noteId) {
    throw new Error("Invalid note id");
  }

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={noteId} /> 
    </HydrationBoundary>
  );
}