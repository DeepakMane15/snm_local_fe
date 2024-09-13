"use client"
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import NoDataFound from "@/app/components/common/no-data-found";
import { SadhsangatDataModel } from "@/app/constants/models/sadhsangatDataModel";
import { SortByMaster, SortType, TableColumnModel } from "@/app/constants/AppEnum";
import TablePagination from "@mui/material/TablePagination";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { TableSortLabel } from "@mui/material";

interface TableProps {
  data: SadhsangatDataModel[];
  columns: TableColumnModel[];
  totalPages: number;
  page: number; // Current page number
  rowsPerPage: number; // Rows per page
  setPage: (page: number) => void; // Setter for page number
  setRowsPerPage: (rows: number) => void; // Setter for rows per page
  sortBy: SortByMaster;
  sortType: SortType;
  onSort: (sortBy: SortByMaster) => void; // Function to handle sorting
}

const PopularProducts = ({ 
  data,
  columns,
  totalPages,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  sortBy,
  sortType,
  onSort, }: TableProps) => {

  const formatCellValue = (value: any) => {
    if (value instanceof Date) {
      return value.toLocaleDateString(); // Format Date as string
    }
    return value?.toString(); // Convert other values to string if necessary
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page on rows per page change
  };

  return (
    <>
      <div className="relative w-full break-words">
        <div className="overflow-x-auto">
          {data?.length ? (
            <>
              <Table hoverable>
                <Table.Head>
                  {columns.map((column: TableColumnModel, colIndex) => (
                    <Table.HeadCell key={colIndex} >
                      {column.isSortable ? (
                        <TableSortLabel
                          active={sortBy === column.key} // Highlight if it's the sorted column
                          direction={sortBy === column.key ? sortType : 'asc'} // Set sort direction
                          onClick={() => onSort(column.key)} // Trigger sort when clicked
                        >
                          {column.value}
                        </TableSortLabel>
                      ) : (
                        column.value
                      )}
                      {column?.child && (
                        <div>
                          {column.child.value}
                        </div>
                      )}
                    </Table.HeadCell>

                  ))}
                </Table.Head>
                <Table.Body className="divide-y divide-border dark:divide-darkborder">
                  {data.map((item, index) => (
                    <Table.Row key={index}>
                      {columns.map((column: TableColumnModel, colIndex) => (
                        <Table.Cell key={colIndex} className="whitespace-nowrap" style={{ width: '140px' }}>
                          <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                            <h6 className="text-sm opacity-80">{formatCellValue(item[column.key])}</h6> {/* Format values */}
                            {column.child && (
                              <h6 className="text-sm opacity-80">
                                {item[column.child.key]}
                              </h6>
                            )}
                          </div>
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              {/* Pagination Controls */}
              <TablePagination
                component="div"
                count={totalPages}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]} // Options for rows per page
              />
            </>
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </>
  );
};

export default PopularProducts;
