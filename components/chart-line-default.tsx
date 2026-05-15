"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
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

const chartConfig = {
  amount: {
    label: "Suma wydatków",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TransactionLineChart({ transactions }: { transactions: Transaction[] }) {
  // Grupowanie wydatków (amount < 0) po dacie
  const chartData = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString("pl-PL", {
        month: "short",
        day: "numeric",
      })
      const existing = acc.find((item) => item.date === date)
      if (existing) {
        existing.amount += Math.abs(curr.amount)
      } else {
        acc.push({ date, amount: Math.abs(curr.amount) })
      }
      return acc
    }, [] as { date: string; amount: number }[])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historia Wydatków</CardTitle>
        <CardDescription>Dzienne podsumowanie kosztów</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis hide domain={["auto", "auto"]} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="amount"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-1)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}