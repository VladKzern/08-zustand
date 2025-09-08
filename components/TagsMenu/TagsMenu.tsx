"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const [open, setOpen] = useState(false);

  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes
      </button>

      {open && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={closeMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}