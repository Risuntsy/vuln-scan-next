import { cn } from "#/libs/utils";
import { Info, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, Label, Switch } from "../ui";

export const FormSection = ({ children, ...props }: { children: React.ReactNode; props?: any }) => (
  <div className={`space-y-2 mt-4 ${props}`}>{children}</div>
);

export const FormLabel = ({ label, required = false }: { label: string; required?: boolean }) => (
  <Label className="font-medium">
    {label} {required && <span className="text-red-500">*</span>}
  </Label>
);

export const FormGrid = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) => (
  <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)} {...props}>
    {children}
  </div>
);

export const FormField = ({
  label,
  required = false,
  className,
  children,
  ...props
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  props?: any;
}) => (
  <div className={cn("space-y-2", className)} {...props}>
    <FormLabel label={label} required={required} />
    {children}
  </div>
);

export const WarningAlert = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
  <Alert className="mb-2 text-sm bg-amber-50 border-amber-200">
    {icon === "info" ? (
      <Info className="h-4 w-4 mr-2 flex-shrink-0" />
    ) : (
      <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
    )}
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);

export const SwitchOption = ({
  id,
  label,
  checked,
  onChange
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center space-x-2">
    <Switch id={id} checked={checked} onCheckedChange={onChange} />
    <Label htmlFor={id} className="cursor-pointer">
      {label}
    </Label>
  </div>
);

export const Divider = ({ className = "my-6" }: { className?: string }) => (
  <div className={`border-t border-gray-200 ${className}`} />
);

export const ImagePreview = ({
  url,
  placeholder,
  height = "h-20"
}: {
  url: string;
  placeholder: string;
  height?: string;
}) => (
  <div className={`${height} border rounded-md flex items-center justify-center bg-muted/20`}>
    {url ? (
      <img src={url} alt="Preview" className="max-h-full max-w-full object-contain" />
    ) : (
      <span className="text-sm text-muted-foreground">{placeholder}</span>
    )}
  </div>
);
