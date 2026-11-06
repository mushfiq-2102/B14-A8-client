import { toast } from "@/components/ui/toast";

export const notifySuccess = (title: string, description?: string) =>
  toast.add({ title, description, type: "success" });

export const notifyError = (title: string, description?: string) =>
  toast.add({ title, description, type: "error" });
