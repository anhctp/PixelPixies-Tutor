import React, { useEffect } from "react";
import { BsSkipBackward, BsFastForward } from "react-icons/bs";

interface Props {
  range: any[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  slice: any;
}

const TableFooter: React.FC<Props> = ({ range, setPage, page, slice }) => {
  const styles = {
    footer: "flex items-center justify-end gap-2",
    button: "w-8 me-1 h-8 flex items-center justify-center text-stone-600",
    active: "border rounded-md border-stone-600",
    hover:
      "hover:bg-neutral-400 hover:text-white hover:boder hover:rounded-md hover:cursor-pointer",
  };
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={styles.footer}>
      <div
        className={`${styles.button} ${
          page === 1 ? "cursor-not-allowed" : styles.hover
        }`}
        onClick={() => page !== 1 && setPage(page - 1)}
      >
        <BsSkipBackward />
      </div>
      {range.map((item, index) => (
        <div
          key={index}
          className={`${styles.button} ${
            page === item && styles.active
          } cursor-pointer`}
          onClick={() => setPage(item)}
        >
          {item}
        </div>
      ))}
      <div
        className={`${styles.button} ${
          page === range.length ? "cursor-not-allowed" : styles.hover
        }`}
        onClick={() => page !== range.length && setPage(page + 1)}
      >
        <BsFastForward />
      </div>
    </div>
  );
};

export default TableFooter;
