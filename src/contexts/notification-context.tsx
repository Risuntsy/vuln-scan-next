"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { errorToast, successToast, infoToast } from "#/components";
import { Toaster } from "sonner";

interface Notification {
  message: string;
  type: "success" | "error" | "info";
}

interface NotificationContextType {
  setNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (notification) {
      const { message, type = "info" } = notification;
      switch (type) {
        case "error":
          errorToast(message);
          break;
        case "info":
          infoToast(message);
          break;
        default:
          successToast(message);
      }
      setNotification(null);
    }
  }, [pathname]);

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      {children}

      <Toaster />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
