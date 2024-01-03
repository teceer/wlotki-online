"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
type ClientPortalInterface = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};
const ClientPortal = ({ children, selector, show }: ClientPortalInterface) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  if (!mounted) {
    return null;
  }

  if (!ref.current) {
    return null;
  }

  return createPortal(children, ref.current);
};
export default ClientPortal;
