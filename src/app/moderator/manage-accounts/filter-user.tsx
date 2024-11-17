"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type FilterProps = {
  onFilterChange: (filters: { role: string; status: string }) => void;
};

type ToggleButtonProps = {
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

export default function FilterUser({ onFilterChange }: FilterProps) {
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    onFilterChange({ role, status: selectedStatus });
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    onFilterChange({ role: selectedRole, status });
  };

  const ToggleButton = ({
    value,
    selected,
    onChange,
    children,
  }: ToggleButtonProps) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={selected ? "default" : "outline"}
        className={`px-1.5 py-0.5 md:px-3 md:py-1.5 text-[10px] md:text-sm rounded-full ${
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-background text-foreground"
        }`}
        onClick={() => onChange(value)}
      >
        {children}
      </Button>
    </motion.div>
  );

  return (
    <Card className="w-full md:w-auto bg-gradient-to-br from-background to-secondary/10">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Vai trò</h3>
            <div className="flex flex-wrap gap-2">
              <ToggleButton
                value="all"
                selected={selectedRole === "all"}
                onChange={handleRoleChange}
              >
                Tất cả
              </ToggleButton>
              <ToggleButton
                value="user"
                selected={selectedRole === "user"}
                onChange={handleRoleChange}
              >
                Người dùng
              </ToggleButton>
              <ToggleButton
                value="expert"
                selected={selectedRole === "expert"}
                onChange={handleRoleChange}
              >
                Chuyên gia
              </ToggleButton>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Trạng thái</h3>
            <div className="flex flex-wrap gap-2">
              <ToggleButton
                value="all"
                selected={selectedStatus === "all"}
                onChange={handleStatusChange}
              >
                Tất cả
              </ToggleButton>
              <ToggleButton
                value="active"
                selected={selectedStatus === "active"}
                onChange={handleStatusChange}
              >
                Đã kích hoạt
              </ToggleButton>
              <ToggleButton
                value="inactive"
                selected={selectedStatus === "inactive"}
                onChange={handleStatusChange}
              >
                Chưa kích hoạt
              </ToggleButton>
              <ToggleButton
                value="banned"
                selected={selectedStatus === "banned"}
                onChange={handleStatusChange}
              >
                Bị vô hiệu hóa
              </ToggleButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
