import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export function StackedBarChart({
  data,
  days,
}: {
  data: { name: string; data: number[] }[];
  days: string[];
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    series: data,
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end", // 'around', 'end'
          borderRadiusWhenStacked: "last", // 'all', 'last'
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        categories: days,
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  return (
    <div>
      <div id="chart" className="w-2xl">
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
