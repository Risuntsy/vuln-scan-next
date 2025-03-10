import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "#/components";
import { SidebarTrigger } from "#/components";
import React from "react";

export default function Header({
  title,
  description,
  routes,
  children
}: {
  title: string;
  description: string;
  routes?: { name: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 p-6 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {routes && (
          <Breadcrumb>
            <BreadcrumbList>
            {routes.map(({ name, href }, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem key={index}>
                  {href ? <BreadcrumbLink href={href}>{name}</BreadcrumbLink> : <BreadcrumbPage>{name}</BreadcrumbPage>}
                </BreadcrumbItem>   
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      </div>
      
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>

    </div>
  );
}
