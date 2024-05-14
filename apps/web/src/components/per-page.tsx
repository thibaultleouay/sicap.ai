"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@sicap/ui";

interface PerPageProps {
  total: number;
  pathname?: string;
}

export function PerPage({ total, pathname = "cauta" }: PerPageProps) {
  const [value, setValue] = useState(total.toString());
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleValueChange = (value: string) => {
    setValue(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("perPage", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[70px]" aria-label="rezultate pe pagina">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );
}
