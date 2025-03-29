import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import Image from "next/image";
import { Locale } from "#/i18n";
interface ServiceIcon {
    name: string;
    icon: string;
    count: number;
}

interface ServiceIconGridProps {
    data: ServiceIcon[];
    lang: Locale;
}

export default function ServiceIconGrid({ data, lang }: ServiceIconGridProps) {
    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle>服务图标</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                    {data.map((service) => (
                        <div
                            key={service.name}
                            className="flex flex-col items-center justify-center p-2 rounded-md border hover:bg-muted/50 transition-colors hover:shadow-sm cursor-pointer group"
                        >
                            <div className="relative w-8 h-8 mb-2 group-hover:scale-110 transition-transform">
                                <Image
                                    src={service.icon}
                                    alt={service.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 32px) 100vw, 32px"
                                    priority
                                />
                            </div>
                            <span className="text-xs font-medium text-center mb-1 line-clamp-1">{service.name}</span>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                {service.count}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
