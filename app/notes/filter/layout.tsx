import { ReactNode } from "react";
import css from "./FilterLayout.module.css";

export default function FilterLayout({ children, sidebar, }: { children: ReactNode; sidebar: ReactNode; }) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.content}>{children}</main>
    </div>
  );
}