import { apiClient, BaseResponse } from "#/libs/api-client";

export async function getAssetStatistics() {
    return apiClient.get<BaseResponse<AssetStatisticsResponse>>("/asset/statistics/data");
}

export async function getTaskData({
    search = "",
    pageIndex = 1,
    pageSize = 10
}: {
    search?: string;
    pageIndex?: number;
    pageSize?: number;
}) {
    return apiClient.post<
        BaseResponse<{
            list: TaskData[];
            total: number;
        }>
    >("/task/data", { search, pageIndex, pageSize });
}

export async function getVersionData() {
    return apiClient.get<BaseResponse<VersionDataResponse>>("/system/version");
}

export async function updateSystem(server: string, scan: string, key: string) {
    return apiClient.post<BaseResponse<VersionDataResponse>>("/system/update", { server, scan, key });
}

export async function getNodeData() {
    return apiClient.get<
        BaseResponse<{
            list: NodeData[];
        }>
    >("/node/data");
}

interface NodeData {
    name: string;
    running: number;
    finished: number;
    state: number;
    cpuNum: number;
    memNum: number;
    updateTime: string;
    maxTaskNum: string;
    urlThread: string;
    urlMaxNum: string;
}

interface AssetStatisticsResponse {
    data: {
        asetCount: number;
        subdomainCount: number;
        sensitiveCount: number;
        urlCount: number;
        vulnerabilityCount: number;
    };
}

interface VersionDataResponse {
    list: { name: string; cversion: string; lversion: string; msg: string }[];
}

interface TaskData {
    id: string;
    name: string;
    taskNum: string;
    progress: string;
    creatTime: string;
    endTime: string;
}
