import axios, { type AxiosResponse } from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  page: number,
  perPage?: number,
  tag?: string,
  search?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = { page };

  if (typeof perPage === "number") params.perPage = perPage;
  if (typeof tag === "string" && tag !== "" && tag !== "All") params.tag = tag;
  if (typeof search === "string" && search.trim()) params.search = search.trim();

  const { data }: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params,
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await api.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return data;
};