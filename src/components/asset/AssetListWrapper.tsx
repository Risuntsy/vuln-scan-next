import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { Header, Button } from "#/components";
import { ArrowLeft } from "lucide-react";
import { DASHBOARD_ROUTE } from "#/config";

interface AssetListWrapperProps {
  title: string;
  description?: string;
  projectId?: string;
  assetType: "domain" | "port" | "website";
  children: ReactNode;
  breadcrumbs: Array<{ name: string; href?: string }>;
  actions?: ReactNode;
}

export default function AssetListWrapper({
  title,
  description,
  projectId,
  assetType,
  children,
  breadcrumbs,
  actions
}: AssetListWrapperProps) {
  const router = useRouter();
  
  return (
    <div className="flex-1">
      <Header routes={breadcrumbs}>
        <Button variant="ghost" size="icon" className="mr-2 sm:mr-4" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span>
          <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </span>
        {actions && <div className="ml-auto">{actions}</div>}
      </Header>

      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
} 