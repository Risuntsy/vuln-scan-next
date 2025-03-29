export interface ProjectModel {
    id?: string;
    domain: string;
    tags: string[];
    cluster: string;
    historyData: number;
    targets: string;
    portType: "all" | "common" | "web" | "custom";
    ports: string[];
    notifications: boolean;
    associateSubdomains: boolean;
    associateIPs: boolean;
    associateCertIPs: boolean;
    isPublic: boolean;
    enableScanning: boolean;
    logoUrl?: string;
    description?: string;
}
