import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export function LineChart({
  title,
  name,
  data,
  days,
  dataLabels,
}: {
  title: string;
  name: string;
  data: number[];
  days: string[];
  dataLabels: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    series: [
      {
        name: name,
        data: data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: dataLabels,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: title,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: days,
      },
    },
  });

  return (
    <div>
      <div id="chart" className="w-[600px]">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="line"
          height={395}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
