import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import { Locale } from "#/i18n";
import { useLanguageRoute } from "#/routes";
import Link from "next/link";
interface ServiceType {
  category: string;
  items: Array<{
    name: string;
    count: number;
  }>;
}

interface ServiceTypeListProps {
  data: ServiceType[];
  lang: Locale;
}

export function ServiceTypeList({ data, lang }: ServiceTypeListProps) {
  const r = useLanguageRoute(lang);

  return (
    <Card>
      <CardHeader>
        <CardTitle>资产服务类型</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((category) => (
            <div key={category.category} className="space-y-2">
              <h3 className="font-medium text-lg">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                    {/* TODO: 跳转 */}
                    <Link href={"TODO"}>
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
