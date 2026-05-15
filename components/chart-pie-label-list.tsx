"use client"

import { Pie, PieChart, LabelList } from "recharts"
import { TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {Transaction} from "@/components/types/Transaction"

export function CategoryPieChart({ transactions }: { transactions: Transaction[] }) {
  // 1. Filtrowanie i agregacja danych
  const aggregatedData = transactions
    .filter((t) => t.amount < 0) // Tylko wydatki
    .reduce((acc, curr) => {
      const category = curr.category || "Inne"
      const amount = Math.abs(curr.amount)
      
      const existing = acc.find((item) => item.category === category)
      if (existing) {
        existing.amount += amount
      } else {
        acc.push({ category, amount, fill: "" })
      }
      return acc
    }, [] as { category: string; amount: number; fill: string }[])
    .map((item, index) => ({
      ...item,
      fill: `var(--chart-${(index % 5) + 1})`, // Przypisanie koloru z CSS
    }))

  // 2. Dynamiczny config dla kolorów i etykiet
  const chartConfig = aggregatedData.reduce((acc, curr) => {
    acc[curr.category] = {
      label: curr.category,
      color: curr.fill,
    }
    return acc;
  }, { amount: { label: "Suma" } } as ChartConfig)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Podział Wydatków</CardTitle>
        <CardDescription>Kategorie rozpoznane przez AI</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
            />
            <Pie
              data={aggregatedData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <LabelList
                dataKey="category"
                className="fill-foreground"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Największa kategoria: {aggregatedData.sort((a, b) => b.amount - a.amount)[0]?.category}
        </div>
        <div className="text-muted-foreground leading-none">
          Dane bazują na {transactions.length} transakcjach
        </div>
      </CardFooter>
    </Card>
  )
}