"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "#/i18n";
import { projectDetails } from "#/api";

import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { DASHBOARD_ROUTE, PROJECT_ROUTE, useLanguageRoute } from "#/config";
import Header from "#/components/main/header";
import ProjectForm from "#/components/project/project-form";
import { ProjectModel } from "#/model";

export default function ProjectEditPage({ params }: { params: Promise<{ id: string; lang: Locale }> }) {
  const { id, lang } = use(params);
  const r = useLanguageRoute(lang);
  const router = useRouter();

  const project = projectDetails.find((p) => p.id === id) || projectDetails[0];

  const handleSubmit = async (projectData: ProjectModel) => {
    // Handle form submission
    console.log("Form submitted");
    router.push(r(`/dashboard/projects/${id}`));
  };

  return (
    <div className="flex-1">
      <Header
        routes={[
          { name: "仪表盘", href: DASHBOARD_ROUTE },
          { name: "扫描任务", href: r(PROJECT_ROUTE) },
          { name: "编辑项目" }
        ]}
      >
        <Button variant="ghost" size="icon" className="mr-2 sm:mr-4" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span>
          <h1 className="text-xl sm:text-2xl font-bold">编辑项目</h1>
          <p className="text-muted-foreground text-sm">
            项目ID:{" "}
            <Badge variant="outline" className="ml-1">
              {project.id}
            </Badge>
          </p>
        </span>
      </Header>

      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <ProjectForm onSubmit={handleSubmit} isEditing initialData={project} />
      </div>
    </div>
  );
}
