"use client";

import * as React from "react";
import { useQueryMedia } from "@/hooks/use-query-media";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { cn } from "cn";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ModalProps {
  open?: boolean;

  onOpenChange?: (open: boolean) => void;

  title?: React.ReactNode;

  description?: React.ReactNode;

  children?: React.ReactNode;

  trigger?: React.ReactNode;

  footer?: React.ReactNode;

  className?: string;

  dialogClassName?: string;

  drawerClassName?: string;

  showCloseButton?: boolean;

  showSwipeHandle?: boolean;

  breakpoint?: string;
}

const Modal = ({ open, onOpenChange, title, description, children, trigger, footer, className, dialogClassName, drawerClassName, showCloseButton = true, showSwipeHandle = true, breakpoint = "(max-width: 768px)" }: ModalProps) => {
  const isMobile = useQueryMedia(breakpoint);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle={showSwipeHandle}>
        {trigger && <DrawerTrigger render={React.isValidElement(trigger) ? trigger : undefined}>{!React.isValidElement(trigger) ? trigger : undefined}</DrawerTrigger>}
        <DrawerContent className={cn(className, drawerClassName)}>
          {title || description ? (
            <DrawerHeader>
              {title ? <DrawerTitle>{title}</DrawerTitle> : <DrawerTitle className="sr-only">Modal</DrawerTitle>}
              {description && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>
          ) : (
            <DrawerTitle className="sr-only">Modal</DrawerTitle>
          )}
          <div className={cn("overflow-y-auto px-4 pb-4", !(title || description) && "pt-4")}>{children}</div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={React.isValidElement(trigger) ? trigger : undefined}>{!React.isValidElement(trigger) ? trigger : undefined}</DialogTrigger>}
      <DialogContent className={cn(className, dialogClassName)} showCloseButton={showCloseButton}>
        {title || description ? (
          <DialogHeader>
            {title ? <DialogTitle>{title}</DialogTitle> : <DialogTitle className="sr-only">Modal</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        ) : (
          <DialogTitle className="sr-only">Modal</DialogTitle>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
