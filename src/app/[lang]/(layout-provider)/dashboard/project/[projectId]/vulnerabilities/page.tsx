import { TableBody, TableCell } from "#/components/ui/table"

import { projectDetails } from "#/api";
import { Card } from "#/components/ui/card";

import { CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "#/components/ui/table";
import { Badge, Button } from "#/components";
import { ExternalLink } from "lucide-react";

export default function ProjectVulnerabilitiesPage() {
  const project = projectDetails[0 ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>漏洞管理</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>漏洞名称</TableHead>
              <TableHead>严重程度</TableHead>
              <TableHead>域名</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>端口</TableHead>
              <TableHead>URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {project.vulnerabilities.map((vuln, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{vuln.id}</TableCell>
                <TableCell>{vuln.name}</TableCell>
                <TableCell>
                  {vuln.severity === "high" ? (
                    <Badge variant="destructive">高危</Badge>
                  ) : vuln.severity === "medium" ? (
                    <Badge className="bg-yellow-500 text-white hover:bg-yellow-400">中危</Badge>
                  ) : (
                    <Badge variant="outline">低危</Badge>
                  )}
                </TableCell>
                <TableCell>{vuln.domain}</TableCell>
                <TableCell>{vuln.ip}</TableCell>
                <TableCell>{vuln.port}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="truncate max-w-[200px]">{vuln.url}</span>
                    <Button variant="ghost" size="icon" asChild className="ml-2">
                      <a href={vuln.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
