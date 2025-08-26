"use client";

import * as React from "react";
import { Button } from "../ui/button";

export const Dialog = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <dialog open={open} className="modal">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};
