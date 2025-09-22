import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Shield, Smartphone } from "lucide-react"
import { formatDate, mockNews, type NewsItem } from "@/lib/mock-data"

const getNewsIcon = (type: NewsItem["type"]) => {
  switch (type) {
    case "promotion":
      return <Gift className="h-4 w-4 text-green-500" />
    case "security":
      return <Shield className="h-4 w-4 text-blue-500" />
    case "update":
      return <Smartphone className="h-4 w-4 text-purple-500" />
  }
}

const getNewsColor = (type: NewsItem["type"]) => {
  switch (type) {
    case "promotion":
      return "bg-green-100 text-green-800"
    case "security":
      return "bg-blue-100 text-blue-800"
    case "update":
      return "bg-purple-100 text-purple-800"
  }
}

export function NewsFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>News & Updates</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockNews.map((news) => (
            <div key={news.id} className="p-3 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getNewsIcon(news.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{news.title}</h4>
                    <Badge variant="secondary" className={`text-xs ${getNewsColor(news.type)}`}>
                      {news.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{news.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(news.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
