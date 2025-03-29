export const domains = [
    {
        domain: "test.org",
        project: "TASK-1233",
        status: "active",
        discoveredAt: "2023-05-15",
        ips: [
            {
                ip: "192.0.2.1",
                ports: [80, 443],
                services: ["HTTP", "HTTPS"]
            }
        ]
    },
    {
        domain: "www.test.org",
        project: "TASK-1233",
        status: "active",
        discoveredAt: "2023-05-15",
        ips: [
            {
                ip: "192.0.2.1",
                ports: [80, 443],
                services: ["HTTP", "HTTPS"]
            }
        ]
    }
];

export const ips = [
    {
        ip: "93.184.216.34",
        cidr: "93.184.216.0/24",
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domains: ["example.com", "www.example.com"],
        ports: [
            {
                number: 80,
                service: "HTTP",
                web: {
                    url: "http://example.com",
                    title: "Example Domain",
                    server: "nginx/1.18.0"
                }
            },
            {
                number: 443,
                service: "HTTPS",
                web: {
                    url: "https://example.com",
                    title: "Example Domain",
                    server: "nginx/1.18.0"
                }
            },
            { number: 22, service: "SSH", web: null }
        ]
    },
    {
        ip: "93.184.216.35",
        cidr: "93.184.216.0/24",
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domains: ["api.example.com"],
        ports: [
            {
                number: 80,
                service: "HTTP",
                web: {
                    url: "http://api.example.com",
                    title: "API Documentation",
                    server: "nginx/1.18.0"
                }
            },
            {
                number: 443,
                service: "HTTPS",
                web: {
                    url: "https://api.example.com",
                    title: "API Documentation",
                    server: "nginx/1.18.0"
                }
            }
        ]
    },
    {
        ip: "93.184.216.36",
        cidr: "93.184.216.0/24",
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domains: ["blog.example.com"],
        ports: [
            {
                number: 80,
                service: "HTTP",
                web: {
                    url: "http://blog.example.com",
                    title: "Example Blog",
                    server: "Apache/2.4.41"
                }
            },
            {
                number: 443,
                service: "HTTPS",
                web: {
                    url: "https://blog.example.com",
                    title: "Example Blog",
                    server: "Apache/2.4.41"
                }
            },
            {
                number: 8080,
                service: "HTTP-Proxy",
                web: {
                    url: "http://blog.example.com:8080",
                    title: "Blog Admin",
                    server: "Apache/2.4.41"
                }
            }
        ]
    },
    {
        ip: "93.184.216.37",
        cidr: "93.184.216.0/24",
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domains: ["dev.example.com"],
        ports: [
            { number: 80, service: "HTTP", web: null },
            { number: 443, service: "HTTPS", web: null },
            { number: 3306, service: "MySQL", web: null }
        ]
    },
    {
        ip: "192.0.2.1",
        cidr: "192.0.2.0/24",
        project: "TASK-1233",
        discoveredAt: "2023-05-15",
        domains: ["test.org", "www.test.org"],
        ports: [
            {
                number: 80,
                service: "HTTP",
                web: {
                    url: "http://test.org",
                    title: "Test Organization",
                    server: "nginx/1.20.0"
                }
            },
            {
                number: 443,
                service: "HTTPS",
                web: {
                    url: "https://test.org",
                    title: "Test Organization",
                    server: "nginx/1.20.0"
                }
            }
        ]
    }
];

export const webAssets = [
    {
        url: "https://example.com",
        title: "Example Domain",
        server: "nginx/1.18.0",
        status: 200,
        technologies: ["nginx", "jQuery", "Bootstrap"],
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domain: "example.com",
        ip: "93.184.216.34",
        port: 443
    },
    {
        url: "http://example.com",
        title: "Example Domain",
        server: "nginx/1.18.0",
        status: 200,
        technologies: ["nginx", "jQuery", "Bootstrap"],
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domain: "example.com",
        ip: "93.184.216.34",
        port: 80
    },
    {
        url: "https://www.example.com",
        title: "Example Domain",
        server: "nginx/1.18.0",
        status: 200,
        technologies: ["nginx", "jQuery", "Bootstrap"],
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domain: "www.example.com",
        ip: "93.184.216.34",
        port: 443
    },
    {
        url: "https://api.example.com",
        title: "API Documentation",
        server: "nginx/1.18.0",
        status: 200,
        technologies: ["nginx", "Swagger", "Node.js"],
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domain: "api.example.com",
        ip: "93.184.216.35",
        port: 443
    },
    {
        url: "https://blog.example.com",
        title: "Example Blog",
        server: "Apache/2.4.41",
        status: 200,
        technologies: ["Apache", "WordPress", "PHP"],
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domain: "blog.example.com",
        ip: "93.184.216.36",
        port: 443
    },
    {
        url: "http://blog.example.com:8080",
        title: "Blog Admin",
        server: "Apache/2.4.41",
        status: 200,
        technologies: ["Apache", "WordPress", "PHP"],
        project: "TASK-1234",
        discoveredAt: "2023-05-15",
        domain: "blog.example.com",
        ip: "93.184.216.36",
        port: 8080
    },
    {
        url: "https://test.org",
        title: "Test Organization",
        server: "nginx/1.20.0",
        status: 200,
        technologies: ["nginx", "React", "Node.js"],
        project: "TASK-1233",
        discoveredAt: "2023-05-15",
        domain: "test.org",
        ip: "192.0.2.1",
        port: 443
    }
];

type ProjectStatus = "completed" | "in-progress" | "pending" | "failed";

export const projects: {
    id: string;
    domain: string;
    status: ProjectStatus;
    assets: { domains: number; ips: number; webs: number };
    vulnerabilities: { high: number; medium: number; low: number };
    createdAt: string;
    updatedAt: string;
}[] = [
    {
        id: "TASK-1234",
        domain: "example.com",
        status: "completed",
        assets: { domains: 12, ips: 24, webs: 8 },
        vulnerabilities: { high: 2, medium: 5, low: 8 },
        createdAt: "2023-05-15 14:30",
        updatedAt: "2023-05-15 15:45"
    },
    {
        id: "TASK-1233",
        domain: "test.org",
        status: "in-progress",
        assets: { domains: 8, ips: 16, webs: 6 },
        vulnerabilities: { high: 1, medium: 3, low: 5 },
        createdAt: "2023-05-15 13:20",
        updatedAt: "2023-05-15 13:20"
    },
    {
        id: "TASK-1232",
        domain: "demo.net",
        status: "in-progress",
        assets: { domains: 5, ips: 10, webs: 3 },
        vulnerabilities: { high: 0, medium: 2, low: 4 },
        createdAt: "2023-05-15 12:10",
        updatedAt: "2023-05-15 12:10"
    },
    {
        id: "TASK-1231",
        domain: "sample.io",
        status: "pending",
        assets: { domains: 0, ips: 0, webs: 0 },
        vulnerabilities: { high: 0, medium: 0, low: 0 },
        createdAt: "2023-05-15 11:00",
        updatedAt: "2023-05-15 11:00"
    },
    {
        id: "TASK-1230",
        domain: "dev.example.com",
        status: "completed",
        assets: { domains: 3, ips: 8, webs: 2 },
        vulnerabilities: { high: 1, medium: 2, low: 3 },
        createdAt: "2023-05-15 10:30",
        updatedAt: "2023-05-15 11:45"
    },
    {
        id: "TASK-1229",
        domain: "api.test.org",
        status: "completed",
        assets: { domains: 2, ips: 4, webs: 1 },
        vulnerabilities: { high: 0, medium: 1, low: 2 },
        createdAt: "2023-05-15 09:20",
        updatedAt: "2023-05-15 10:35"
    },
    {
        id: "TASK-1228",
        domain: "blog.demo.net",
        status: "failed",
        assets: { domains: 0, ips: 0, webs: 0 },
        vulnerabilities: { high: 0, medium: 0, low: 0 },
        createdAt: "2023-05-15 08:10",
        updatedAt: "2023-05-15 08:25"
    }
];

export const vulnerabilities = [
    {
        id: "VUL-001",
        name: "SQL注入漏洞",
        severity: "high",
        url: "https://api.example.com/users",
        project: "TASK-1234",
        status: "open",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-002",
        name: "XSS漏洞",
        severity: "medium",
        url: "https://blog.example.com/post",
        project: "TASK-1234",
        status: "open",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-003",
        name: "CSRF漏洞",
        severity: "medium",
        url: "https://example.com/account",
        project: "TASK-1234",
        status: "open",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-004",
        name: "信息泄露",
        severity: "low",
        url: "https://example.com/about",
        project: "TASK-1234",
        status: "fixed",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-005",
        name: "弱密码",
        severity: "low",
        url: "https://example.com/login",
        project: "TASK-1234",
        status: "fixed",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-006",
        name: "目录遍历",
        severity: "medium",
        url: "https://test.org/files",
        project: "TASK-1233",
        status: "open",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-007",
        name: "服务器信息泄露",
        severity: "low",
        url: "https://test.org",
        project: "TASK-1233",
        status: "open",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-008",
        name: "不安全的HTTP方法",
        severity: "low",
        url: "https://api.test.org",
        project: "TASK-1233",
        status: "fixed",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-009",
        name: "远程代码执行",
        severity: "high",
        url: "https://demo.net/upload",
        project: "TASK-1232",
        status: "open",
        discoveredAt: "2023-05-15"
    },
    {
        id: "VUL-010",
        name: "不安全的反序列化",
        severity: "high",
        url: "https://admin.demo.net/api",
        project: "TASK-1232",
        status: "open",
        discoveredAt: "2023-05-15"
    }
];

export const projectDetails = [
    {
        id: "TASK-1234",
        domain: "example.com",
        status: "completed",
        progress: 100,
        startTime: "2023-05-15 14:30",
        endTime: "2023-05-15 15:45",
        duration: "1小时15分钟",
        domains: [
            {
                name: "example.com",
                status: "active",
                ips: [
                    {
                        address: "93.184.216.34",
                        ports: [
                            {
                                number: 80,
                                service: "HTTP",
                                web: { title: "Example Domain", server: "nginx/1.18.0" }
                            },
                            {
                                number: 443,
                                service: "HTTPS",
                                web: { title: "Example Domain", server: "nginx/1.18.0" }
                            },
                            { number: 22, service: "SSH", web: null }
                        ]
                    }
                ]
            },
            {
                name: "www.example.com",
                status: "active",
                ips: [
                    {
                        address: "93.184.216.34",
                        ports: [
                            {
                                number: 80,
                                service: "HTTP",
                                web: { title: "Example Domain", server: "nginx/1.18.0" }
                            },
                            {
                                number: 443,
                                service: "HTTPS",
                                web: { title: "Example Domain", server: "nginx/1.18.0" }
                            }
                        ]
                    }
                ]
            },
            {
                name: "api.example.com",
                status: "active",
                ips: [
                    {
                        address: "93.184.216.35",
                        ports: [
                            {
                                number: 80,
                                service: "HTTP",
                                web: { title: "API Documentation", server: "nginx/1.18.0" }
                            },
                            {
                                number: 443,
                                service: "HTTPS",
                                web: { title: "API Documentation", server: "nginx/1.18.0" }
                            }
                        ]
                    }
                ]
            },
            {
                name: "blog.example.com",
                status: "active",
                ips: [
                    {
                        address: "93.184.216.36",
                        ports: [
                            {
                                number: 80,
                                service: "HTTP",
                                web: { title: "Example Blog", server: "Apache/2.4.41" }
                            },
                            {
                                number: 443,
                                service: "HTTPS",
                                web: { title: "Example Blog", server: "Apache/2.4.41" }
                            },
                            {
                                number: 8080,
                                service: "HTTP-Proxy",
                                web: { title: "Blog Admin", server: "Apache/2.4.41" }
                            }
                        ]
                    }
                ]
            },
            {
                name: "dev.example.com",
                status: "inactive",
                ips: [
                    {
                        address: "93.184.216.37",
                        ports: [
                            { number: 80, service: "HTTP", web: null },
                            { number: 443, service: "HTTPS", web: null },
                            { number: 3306, service: "MySQL", web: null }
                        ]
                    }
                ]
            }
        ],
        vulnerabilities: [
            {
                id: "VUL-001",
                name: "SQL注入漏洞",
                severity: "high",
                url: "https://api.example.com/users",
                domain: "api.example.com",
                ip: "93.184.216.35",
                port: 443
            },
            {
                id: "VUL-002",
                name: "XSS漏洞",
                severity: "medium",
                url: "https://blog.example.com/post",
                domain: "blog.example.com",
                ip: "93.184.216.36",
                port: 443
            },
            {
                id: "VUL-003",
                name: "CSRF漏洞",
                severity: "medium",
                url: "https://example.com/account",
                domain: "example.com",
                ip: "93.184.216.34",
                port: 443
            },
            {
                id: "VUL-004",
                name: "信息泄露",
                severity: "low",
                url: "https://example.com/about",
                domain: "example.com",
                ip: "93.184.216.34",
                port: 443
            },
            {
                id: "VUL-005",
                name: "弱密码",
                severity: "low",
                url: "https://example.com/login",
                domain: "example.com",
                ip: "93.184.216.34",
                port: 443
            }
        ]
    }
];

// 项目扫描任务的模拟数据
export const mockProjects = [
    {
        id: "proj-001",
        name: "全面资产扫描",
        description: "对 example.com 域名进行全面的资产发现和漏洞扫描",
        target: "example.com",
        createdAt: "2023-10-15T08:30:00Z",
        updatedAt: "2023-10-15T14:45:00Z",
        status: "running", // running, completed, scheduled, failed
        progress: 65, // 百分比
        owner: {
            id: "user-001",
            name: "管理员",
            username: "admin"
        },
        scanType: "comprehensive", // comprehensive, vulnerability, asset, custom
        schedule: {
            type: "once", // once, daily, weekly, monthly
            startTime: "2023-10-15T08:30:00Z",
            endTime: null,
            recurrence: null
        },
        scanSettings: {
            subdomainDiscovery: true,
            portScan: true,
            vulnerabilityScan: true,
            webCrawling: true,
            subdomainWordlist: "common-subdomains.txt",
            portScanRange: "1-1000,3306,8080-8090",
            scanThreads: 10,
            requestTimeout: 10,
            userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
        results: {
            assetsDiscovered: 45,
            vulnerabilitiesFound: 12,
            scanDuration: "06:15:30", // HH:MM:SS
            lastScanDate: "2023-10-15T14:45:00Z"
        },
        tags: ["生产环境", "高优先级", "外部资产"]
    },
    {
        id: "proj-002",
        name: "漏洞扫描",
        description: "针对 api.example.org 的定期安全漏洞扫描",
        target: "api.example.org",
        createdAt: "2023-09-20T10:15:00Z",
        updatedAt: "2023-10-14T11:30:00Z",
        status: "completed",
        progress: 100,
        owner: {
            id: "user-002",
            name: "安全工程师",
            username: "security_engineer"
        },
        scanType: "vulnerability",
        schedule: {
            type: "weekly",
            startTime: "2023-09-20T10:15:00Z",
            endTime: null,
            recurrence: {
                day: "Monday",
                time: "10:00:00"
            }
        },
        scanSettings: {
            subdomainDiscovery: false,
            portScan: true,
            vulnerabilityScan: true,
            webCrawling: true,
            subdomainWordlist: "",
            portScanRange: "80,443,8080,8443",
            scanThreads: 5,
            requestTimeout: 15,
            userAgent: "Mozilla/5.0 (compatible; SecurityScanner/1.0)"
        },
        results: {
            assetsDiscovered: 3,
            vulnerabilitiesFound: 5,
            scanDuration: "01:45:20",
            lastScanDate: "2023-10-14T11:30:00Z"
        },
        tags: ["API", "定期扫描"]
    },
    {
        id: "proj-003",
        name: "定期安全检查",
        description: "内部网络资产的安全状态检查",
        target: "internal.example.net",
        createdAt: "2023-08-05T09:00:00Z",
        updatedAt: "2023-10-05T09:00:00Z",
        status: "scheduled",
        progress: 0,
        owner: {
            id: "user-001",
            name: "管理员",
            username: "admin"
        },
        scanType: "custom",
        schedule: {
            type: "monthly",
            startTime: "2023-08-05T09:00:00Z",
            endTime: null,
            recurrence: {
                day: 5, // 每月第5天
                time: "09:00:00"
            }
        },
        scanSettings: {
            subdomainDiscovery: true,
            portScan: true,
            vulnerabilityScan: true,
            webCrawling: false,
            subdomainWordlist: "internal-domains.txt",
            portScanRange: "1-65535",
            scanThreads: 20,
            requestTimeout: 5,
            userAgent: "Internal-Security-Scanner/2.0"
        },
        results: {
            assetsDiscovered: 128,
            vulnerabilitiesFound: 23,
            scanDuration: "12:30:45",
            lastScanDate: "2023-10-05T09:00:00Z"
        },
        tags: ["内部网络", "月度检查", "全端口扫描"]
    },
    {
        id: "proj-004",
        name: "Web应用安全测试",
        description: "对公司电子商务网站进行安全测试",
        target: "shop.example.com",
        createdAt: "2023-10-10T13:20:00Z",
        updatedAt: "2023-10-10T16:45:00Z",
        status: "failed",
        progress: 35,
        owner: {
            id: "user-003",
            name: "Web安全专家",
            username: "web_security"
        },
        scanType: "vulnerability",
        schedule: {
            type: "once",
            startTime: "2023-10-10T13:20:00Z",
            endTime: null,
            recurrence: null
        },
        scanSettings: {
            subdomainDiscovery: false,
            portScan: false,
            vulnerabilityScan: true,
            webCrawling: true,
            subdomainWordlist: "",
            portScanRange: "80,443",
            scanThreads: 8,
            requestTimeout: 20,
            userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
        results: {
            assetsDiscovered: 1,
            vulnerabilitiesFound: 3,
            scanDuration: "00:45:30",
            lastScanDate: "2023-10-10T16:45:00Z"
        },
        tags: ["电子商务", "Web应用", "失败任务"],
        errorDetails: {
            errorCode: "TIMEOUT_ERROR",
            errorMessage: "扫描在执行过程中超时",
            failedAt: "2023-10-10T14:05:30Z",
            affectedComponents: ["Web爬虫模块"]
        }
    },
    {
        id: "proj-005",
        name: "新系统上线前安全评估",
        description: "新开发的CRM系统上线前的全面安全评估",
        target: "crm-dev.internal.example.com",
        createdAt: "2023-10-12T09:30:00Z",
        updatedAt: "2023-10-12T09:30:00Z",
        status: "scheduled",
        progress: 0,
        owner: {
            id: "user-004",
            name: "项目经理",
            username: "project_manager"
        },
        scanType: "comprehensive",
        schedule: {
            type: "once",
            startTime: "2023-10-20T10:00:00Z", // 未来的计划时间
            endTime: null,
            recurrence: null
        },
        scanSettings: {
            subdomainDiscovery: true,
            portScan: true,
            vulnerabilityScan: true,
            webCrawling: true,
            subdomainWordlist: "dev-domains.txt",
            portScanRange: "1-10000",
            scanThreads: 15,
            requestTimeout: 15,
            userAgent: "Security-Assessment-Tool/1.0"
        },
        results: null, // 尚未执行
        tags: ["上线前评估", "内部系统", "高优先级", "CRM"]
    }
];

// 单个项目的详细信息获取函数
export function getProjectById(id: string) {
    return mockProjects.find((project) => project.id === id) || null;
}

// 项目扫描结果的详细数据
export const mockProjectResults = {
    "proj-001": {
        assets: {
            domains: [
                { name: "example.com", ip: "192.168.1.1", discoveredAt: "2023-10-15T09:15:00Z" },
                { name: "api.example.com", ip: "192.168.1.2", discoveredAt: "2023-10-15T09:30:00Z" },
                { name: "dev.example.com", ip: "192.168.1.3", discoveredAt: "2023-10-15T10:45:00Z" }
            ],
            ips: [
                { address: "192.168.1.1", hostname: "example.com", discoveredAt: "2023-10-15T09:15:00Z" },
                { address: "192.168.1.2", hostname: "api.example.com", discoveredAt: "2023-10-15T09:30:00Z" },
                { address: "192.168.1.3", hostname: "dev.example.com", discoveredAt: "2023-10-15T10:45:00Z" },
                { address: "192.168.1.25", hostname: "db.internal.example.com", discoveredAt: "2023-10-15T11:20:00Z" }
            ],
            webServices: [
                {
                    url: "https://example.com",
                    title: "Example Company",
                    server: "nginx/1.20.1",
                    technologies: ["WordPress 5.9.3", "PHP 7.4", "jQuery 3.6.0"],
                    discoveredAt: "2023-10-15T09:20:00Z"
                },
                {
                    url: "https://api.example.com",
                    title: "API Documentation",
                    server: "nginx/1.20.1",
                    technologies: ["Swagger UI", "Node.js", "Express"],
                    discoveredAt: "2023-10-15T09:35:00Z"
                }
            ],
            ports: [
                {
                    ip: "192.168.1.1",
                    port: 80,
                    service: "http",
                    version: "nginx/1.20.1",
                    discoveredAt: "2023-10-15T09:18:00Z"
                },
                {
                    ip: "192.168.1.1",
                    port: 443,
                    service: "https",
                    version: "nginx/1.20.1",
                    discoveredAt: "2023-10-15T09:18:30Z"
                },
                {
                    ip: "192.168.1.2",
                    port: 80,
                    service: "http",
                    version: "nginx/1.20.1",
                    discoveredAt: "2023-10-15T09:32:00Z"
                },
                {
                    ip: "192.168.1.2",
                    port: 443,
                    service: "https",
                    version: "nginx/1.20.1",
                    discoveredAt: "2023-10-15T09:32:30Z"
                },
                {
                    ip: "192.168.1.3",
                    port: 22,
                    service: "ssh",
                    version: "OpenSSH 8.4",
                    discoveredAt: "2023-10-15T10:47:00Z"
                },
                {
                    ip: "192.168.1.3",
                    port: 80,
                    service: "http",
                    version: "Apache/2.4.46",
                    discoveredAt: "2023-10-15T10:48:00Z"
                },
                {
                    ip: "192.168.1.25",
                    port: 3306,
                    service: "mysql",
                    version: "MySQL 8.0.26",
                    discoveredAt: "2023-10-15T11:22:00Z"
                }
            ]
        },
        vulnerabilities: [
            {
                id: "vuln-001",
                name: "SQL注入漏洞",
                severity: "high",
                cvss: 8.5,
                description: "在登录页面发现SQL注入漏洞，可能导致未授权数据访问",
                affectedAsset: "app.example.com/login",
                discoveredAt: "2023-10-15T12:30:00Z",
                status: "open",
                details: {
                    payload: "' OR 1=1 --",
                    parameter: "username",
                    requestMethod: "POST",
                    responseCode: 200
                },
                remediation: "使用参数化查询或预处理语句处理用户输入"
            },
            {
                id: "vuln-002",
                name: "跨站脚本攻击 (XSS)",
                severity: "medium",
                cvss: 6.1,
                description: "在评论功能中发现存储型XSS漏洞",
                affectedAsset: "blog.example.com/comments",
                discoveredAt: "2023-10-15T13:15:00Z",
                status: "open",
                details: {
                    payload: "<script>alert('XSS')</script>",
                    parameter: "comment",
                    requestMethod: "POST",
                    responseCode: 200
                },
                remediation: "对用户输入进行HTML编码，实施内容安全策略(CSP)"
            },
            {
                id: "vuln-003",
                name: "信息泄露",
                severity: "low",
                cvss: 3.5,
                description: "API端点返回过多的用户信息",
                affectedAsset: "api.example.com/v1/users",
                discoveredAt: "2023-10-15T14:00:00Z",
                status: "open",
                details: {
                    responseData: "包含敏感字段如密码哈希、完整地址等",
                    requestMethod: "GET",
                    responseCode: 200
                },
                remediation: "限制API返回的字段，实施适当的访问控制"
            }
        ],
        scanLogs: [
            { timestamp: "2023-10-15T08:30:00Z", level: "INFO", message: "扫描任务已启动" },
            { timestamp: "2023-10-15T08:30:15Z", level: "INFO", message: "开始子域名发现" },
            { timestamp: "2023-10-15T09:15:00Z", level: "INFO", message: "发现域名: example.com (192.168.1.1)" },
            { timestamp: "2023-10-15T09:30:00Z", level: "INFO", message: "发现域名: api.example.com (192.168.1.2)" },
            { timestamp: "2023-10-15T10:45:00Z", level: "INFO", message: "发现域名: dev.example.com (192.168.1.3)" },
            { timestamp: "2023-10-15T11:00:00Z", level: "INFO", message: "子域名发现完成，共发现3个子域名" },
            { timestamp: "2023-10-15T11:01:00Z", level: "INFO", message: "开始端口扫描" },
            { timestamp: "2023-10-15T11:30:00Z", level: "INFO", message: "端口扫描完成，共发现7个开放端口" },
            { timestamp: "2023-10-15T11:31:00Z", level: "INFO", message: "开始Web服务识别" },
            { timestamp: "2023-10-15T12:00:00Z", level: "INFO", message: "Web服务识别完成，共发现2个Web服务" },
            { timestamp: "2023-10-15T12:01:00Z", level: "INFO", message: "开始漏洞扫描" },
            { timestamp: "2023-10-15T12:30:00Z", level: "WARNING", message: "在app.example.com/login发现SQL注入漏洞" },
            { timestamp: "2023-10-15T13:15:00Z", level: "WARNING", message: "在blog.example.com/comments发现XSS漏洞" },
            { timestamp: "2023-10-15T14:00:00Z", level: "INFO", message: "在api.example.com/v1/users发现信息泄露问题" },
            { timestamp: "2023-10-15T14:30:00Z", level: "INFO", message: "漏洞扫描完成，共发现3个漏洞" },
            { timestamp: "2023-10-15T14:45:00Z", level: "INFO", message: "扫描任务已完成" }
        ]
    }
    // 其他项目的结果数据...
};

// 可用的扫描配置模板
export const scanTemplates = [
    {
        id: "template-001",
        name: "标准全面扫描",
        description: "包含子域名发现、端口扫描、漏洞扫描和Web爬取的全面扫描配置",
        settings: {
            subdomainDiscovery: true,
            portScan: true,
            vulnerabilityScan: true,
            webCrawling: true,
            subdomainWordlist: "common-subdomains.txt",
            portScanRange: "1-1000,3306,8080-8090",
            scanThreads: 10,
            requestTimeout: 10,
            userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
    },
    {
        id: "template-002",
        name: "快速漏洞扫描",
        description: "针对已知资产的快速漏洞扫描，不包含资产发现",
        settings: {
            subdomainDiscovery: false,
            portScan: false,
            vulnerabilityScan: true,
            webCrawling: true,
            subdomainWordlist: "",
            portScanRange: "80,443",
            scanThreads: 5,
            requestTimeout: 15,
            userAgent: "Mozilla/5.0 (compatible; SecurityScanner/1.0)"
        }
    },
    {
        id: "template-003",
        name: "内部网络扫描",
        description: "针对内部网络的全端口扫描和漏洞评估",
        settings: {
            subdomainDiscovery: true,
            portScan: true,
            vulnerabilityScan: true,
            webCrawling: false,
            subdomainWordlist: "internal-domains.txt",
            portScanRange: "1-65535",
            scanThreads: 20,
            requestTimeout: 5,
            userAgent: "Internal-Security-Scanner/2.0"
        }
    }
];

// 可用的子域名字典列表
export const wordlists = [
    { id: "common-subdomains.txt", name: "常用子域名", count: 5000 },
    { id: "internal-domains.txt", name: "内部域名", count: 1000 },
    { id: "dev-domains.txt", name: "开发环境域名", count: 2000 },
    { id: "comprehensive.txt", name: "综合字典", count: 10000 }
];
