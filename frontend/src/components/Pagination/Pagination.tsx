import { Icons } from "../../ui/Icons/icons";
import style from "./Style.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxButtons?: number; // скільки номерів показувати
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  maxButtons = 3,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const half = Math.floor(maxButtons / 2);

  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, page + half);

  // Корекція для початку
  if (page <= half) {
    end = Math.min(totalPages, maxButtons);
  }

  // Корекція для кінця
  if (page + half >= totalPages) {
    start = Math.max(1, totalPages - maxButtons + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className={style.pagination_wrapper}>
      {/* Перша сторінка */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(1)}
        className={style.action_btn}
      >
        <Icons.chevronsLeft />
      </button>

      {/* Назад */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={style.action_btn}
      >
        <Icons.moveLeft />
      </button>

      {/* Ліва крапка */}
      {start > 1 && <span className={style.dots}>…</span>}

      {/* Номери сторінок */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${style.action_btn} ${p === page ? style.active : ""}`}
        >
          <span>{p}</span>
        </button>
      ))}

      {/* Права крапка */}
      {end < totalPages && <span className={style.dots}>…</span>}

      {/* Вперед */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={style.action_btn}
      >
        <Icons.moveRight />
      </button>

      {/* Остання сторінка */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(totalPages)}
        className={style.action_btn}
      >
        <Icons.chevronsRight />
      </button>
    </div>
  );
}
