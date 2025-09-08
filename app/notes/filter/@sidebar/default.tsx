import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default function Sidebar() {
  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <nav aria-label="Notes filters" className={css.container}>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}