"use client";
import FilterUser from "@/app/moderator/manage-accounts/filter-user";
import TableListUser from "@/app/moderator/manage-accounts/table-list-user";
import React, { useState } from "react";

export default function ManageAccounts() {
  const [filters, setFilters] = useState({ role: "all", status: "all" });

  const handleFilterChange = (newFilters: { role: string; status: string }) => {
    setFilters(newFilters);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-around mb-4">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Quản lý tài khoản người dùng
        </h1>
        {/* Filter user */}
        <FilterUser onFilterChange={handleFilterChange} />
      </div>
      {/* Table data with pagination */}
      <TableListUser filters={filters} />
    </div>
  );
}
