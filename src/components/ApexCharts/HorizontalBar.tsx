import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export function HorizontalChart({
  data,
  categorys,
}: {
  data: number[];
  categorys: string[];
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    series: [
      {
        data: data,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categorys,
      },
    },
  });

  return (
    <div>
      <div id="chart" className="w-lg">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="bar"
          height={410}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
