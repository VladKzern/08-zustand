import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesFilterPage({ params, }: { params: Promise<{ slug?: string[] }>; }) {
  
  const { slug } = await params;

  const tag = Array.isArray(slug) && slug.length ? slug[0] : "All";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, 1, ""],
    queryFn: () => fetchNotes(1, 12, tag === "All" ? "" : tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1>Notes — {tag}</h1>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}