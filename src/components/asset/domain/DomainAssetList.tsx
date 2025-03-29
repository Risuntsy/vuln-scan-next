import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AssetTable from "../common/AssetTable";
import AssetFilters from "../common/AssetFilters";
import { Badge } from "#/components";

interface DomainAsset {
    id: string;
    domain: string;
    status: "active" | "inactive";
    createdAt: string;
    updatedAt: string;
    ipAddresses: string[];
}

interface DomainAssetListProps {
    projectId?: string; // 可选，如果提供则只显示该项目的资产
    initialData?: DomainAsset[]; // 可选的初始数据
}

export default function DomainAssetList({ projectId, initialData }: DomainAssetListProps) {
    const searchParams = useSearchParams();
    const [data, setData] = useState<DomainAsset[] | undefined>(initialData);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const pageSize = 10;

    // 定义表格列
    const columns = [
        {
            header: "域名",
            accessorKey: "domain" as keyof DomainAsset
        },
        {
            header: "状态",
            accessorKey: "status" as keyof DomainAsset,
            cell: (item: DomainAsset) => (
                <Badge variant={item.status === "active" ? "default" : "secondary"}>
                    {item.status === "active" ? "活跃" : "不活跃"}
                </Badge>
            )
        },
        {
            header: "IP地址",
            accessorKey: "ipAddresses" as keyof DomainAsset,
            cell: (item: DomainAsset) => (
                <div className="flex flex-wrap gap-1">
                    {item.ipAddresses.map((ip) => (
                        <Badge key={ip} variant="outline">
                            {ip}
                        </Badge>
                    ))}
                </div>
            )
        },
        {
            header: "创建时间",
            accessorKey: "createdAt" as keyof DomainAsset,
            cell: (item: DomainAsset) => new Date(item.createdAt).toLocaleString()
        }
    ];

    // 获取数据的函数
    const fetchData = async () => {
        if (initialData) return;

        setIsLoading(true);
        try {
            // 构建API请求URL，根据是否有projectId来决定
            let url = projectId
                ? `/api/projects/${projectId}/assets/domains?page=${pageIndex + 1}&pageSize=${pageSize}`
                : `/api/assets/domains?page=${pageIndex + 1}&pageSize=${pageSize}`;

            // 添加其他查询参数
            const status = searchParams.get("status");
            if (status) {
                url += `&status=${status}`;
            }

            const response = await fetch(url);
            const result = await response.json();

            setData(result.data);
            setPageCount(Math.ceil(result.total / pageSize));
        } catch (error) {
            console.error("Failed to fetch domain assets:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 当依赖项变化时重新获取数据
    useEffect(() => {
        fetchData();
    }, [projectId, pageIndex, searchParams]);

    // 处理行点击
    const handleRowClick = (item: DomainAsset) => {
        // 导航到域名详情页
        window.location.href = projectId
            ? `/dashboard/project/${projectId}/assets/domains/${item.id}`
            : `/dashboard/assets/domains/${item.id}`;
    };

    return (
        <div className="space-y-4">
            {/* <AssetFilters 
        filters={[
          {
            name: "status",
            label: "状态",
            options: [
              { label: "全部", value: "" },
              { label: "活跃", value: "active" },
              { label: "不活跃", value: "inactive" }
            ]
          }
        ]}
      /> */}

            <AssetTable
                data={data}
                isLoading={isLoading}
                columns={columns}
                onRowClick={handleRowClick}
                pagination={{
                    pageIndex,
                    pageSize,
                    pageCount,
                    onPageChange: setPageIndex
                }}
            />
        </div>
    );
}
