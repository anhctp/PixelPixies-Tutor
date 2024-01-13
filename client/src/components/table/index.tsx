"use client";
import React, { useState } from "react";
import useTable from "@/hooks/useTable";
import TableFooter from "./tableFooter";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdOpen } from "react-icons/io";

import Image from "next/image";
import QuestModal from "../learning/me/questModal";

interface Props {
  headers: any[];
  data: any;
  rowsPerPage: number;
}

const styles = {
  table: "border-collapse w-full table-auto",
  tableRowHeader: "transition text-left",
  tableRowItems: "cursor-auto",
  tableHeader: "border-b border-stone-600 p-3 text-sm",
  tableCell: "p-3 text-sm",
  tableCellDetail: "p-3 text-sm text-stone-600 cursor-pointer",
};

export const TableLearning: React.FC<Props> = ({
  headers,
  data,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const [selectedQuestId, setSelectedQuestId] = useState<number>(-1);
  const [openQuestModal, setOpenQuestModal] = useState<boolean>(false);
  const handleDelete = (id: number) => {
    setSelectedQuestId(id);
  };
  const handleOpenQuest = (id: number) => {
    setSelectedQuestId(id);
    setOpenQuestModal(true);
  };
  return (
    <>
      {openQuestModal ? (
        <QuestModal setOpenQuestModal={setOpenQuestModal} />
      ) : (
        <div className="w-full flex flex-col gap-4">
          {slice.length ? (
            <>
              <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                  <tr>
                    {headers.map((item, index) => (
                      <th key={index} className={styles.tableHeader}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slice.map((item) => (
                    <tr className={styles.tableRowItems} key={item.id}>
                      <td className={styles.tableCell}>{item.id}</td>
                      <td className={styles.tableCell}>{item.name}</td>
                      <td
                        className={styles.tableCell + " flex justify-between"}
                      >
                        <button
                          className="flex items-center gap-2 border py-2 px-4 rounded-lg border-[#3ddabe] bg-[#3ddabe] text-white hover:text-[#3ddabe] hover:bg-white"
                          onClick={() => handleOpenQuest(item.id)}
                        >
                          <IoMdOpen size={28} />
                          Open
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(item.id)}
                        >
                          <RiDeleteBinLine size={28} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <TableFooter
                range={range}
                slice={slice}
                setPage={setPage}
                page={page}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-4 text-neutral-400 text-xl">
              <Image
                src={"/no-data.jpg"}
                alt="no-data"
                width={500}
                height={500}
              />
              No data!
            </div>
          )}
        </div>
      )}
    </>
  );
};
