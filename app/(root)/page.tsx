"use client"

import { useStoreModalStore } from "@/hooks/use-store-modal";
import { useEffect, useState } from "react";

export default function Home() {
  const onOpen = useStoreModalStore((state) => state.onOpen);
  const isOpen = useStoreModalStore((state) => state.isOpen);
  
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return (
    <div className="p-4">
      Root page
    </div>
  );
}
