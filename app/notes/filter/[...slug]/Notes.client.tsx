"use client";

import { useState, useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Link from "next/link";
import css from "./Notes.client.module.css";

interface Props {
  tag: string;
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 12;

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", tag ?? "All", page, debouncedSearch ?? ""],
    queryFn: () =>
      fetchNotes(page, perPage, tag === "All" ? undefined : tag, debouncedSearch),
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  const notes = useMemo(() => data?.notes ?? [], [data]);
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const showLoader = (isLoading || isFetching) && notes.length === 0;

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination page={page} pageCount={totalPages} onChange={setPage} />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {showLoader && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}