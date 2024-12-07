// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function ButtonDelete() {
  return (
    <Button variant="destructive" className="hover:bg-red-600">
      <Trash className="-ms-1 me-2 opacity-80" size={16} strokeWidth={2} aria-hidden="true" />
      Elimina
    </Button>
  );
}
