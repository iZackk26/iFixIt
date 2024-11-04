// src/components/charts/TopEmpleadosChart.tsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaUsers } from "react-icons/fa"; // Icono para representar empleados

interface TopEmpleadosData {
  series: number[];
  labels: string[];
}

const TopEmpleadosChart: React.FC = () => {
  const [chartData, setChartData] = useState<TopEmpleadosData>({
    series: [],
    labels: [],
  });

  useEffect(() => {
    // Datos estáticos de ejemplo. Reemplaza con una llamada a una API si es necesario.
    const data: TopEmpleadosData = {
      series: [50, 40, 30, 20], // Número de reparaciones
      labels: ["Empleado A", "Empleado B", "Empleado C", "Empleado D"], // Nombres de los empleados
    };

    setChartData(data);
  }, []);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      height: 240,
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}`,
      style: {
        colors: ["#fff"],
      },
    },
    colors: ["#3B82F6"], // Color azul para las barras
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: chartData.labels,
      title: {
        text: "Empleados",
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "Número de Reparaciones",
      },
      min: 0,
      max: 60,
      tickAmount: 6,
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `${val} reparaciones`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 200,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Reparaciones",
      data: chartData.series,
    },
  ];

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <FaUsers className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Top Empleados en Reparaciones
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Los 4 empleados con más reparaciones realizadas
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={240}
        />
      </CardBody>
    </Card>
  );
};

export default TopEmpleadosChart;
