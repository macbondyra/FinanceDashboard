import Image from "next/image";
import HeaderMenu from "./header";
import { Card } from "@/components/ui/card";
import { StatusCard } from "@/components/ui/statuscard";
import { ChartPieLabelList } from "@/components/chart-pie-label-list";
import { ChartLineDefault } from "@/components/chart-line-default";
import TableComponent from "@/components/ui/tableComponent";
export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <HeaderMenu/>
      <div className="grid grid-cols-4 grid-rows-[auto_1fr] gap-4 p-4 flex-1">
        <StatusCard />
        <StatusCard />
        <StatusCard />
        <StatusCard />
        <div className="col-span-3 grid grid-cols-3 gap-4">
          <ChartPieLabelList/>
          <div className="col-span-2">
            <ChartLineDefault/>
          </div>
        </div>
        <Card className="col-span-1">
          <TableComponent></TableComponent>
        </Card>
      </div>
    </main>
  );
}
