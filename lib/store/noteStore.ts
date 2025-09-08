import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";


export const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

type Draft = typeof initialDraft;

interface NoteState {
  draft: Draft;
  setDraft: (next: Draft) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (next) => set({ draft: next }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "notehub-draft" }
  )
);