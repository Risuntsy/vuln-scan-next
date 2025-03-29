import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import { Locale } from "#/i18n";
interface StatisticsItem {
    name: string;
    count: number;
}

interface StatisticsCategory {
    title: string;
    description: string;
    items: StatisticsItem[];
}

interface StatisticsListProps {
    data: StatisticsCategory[];
    lang: Locale;
}

export function StatisticsList({ data, lang }: StatisticsListProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((category) => (
                <Card key={category.title}>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>{category.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {category.items.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between py-2 border-b last:border-0"
                                >
                                    <span className="text-sm">{item.name}</span>
                                    <Badge variant="secondary">{item.count}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
