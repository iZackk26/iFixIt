// src/components/charts/RegistrosPorMesChart.tsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaCalendarAlt } from "react-icons/fa"; // Importa el icono deseado de react-icons

interface RegistrosPorMesData {
  series: number[];
  categories: string[];
}

const RegistrosPorMesChart: React.FC = () => {
  const [chartData, setChartData] = useState<RegistrosPorMesData>({
    series: [],
    categories: [],
  });

  useEffect(() => {
    // Datos estáticos para ahora. En el futuro, reemplaza con una llamada a una API.
    const data: RegistrosPorMesData = {
      series: [120, 150, 170, 140, 180, 200, 190, 220, 210, 230, 250, 240],
      categories: [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
      ],
    };

    setChartData(data);
  }, []);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "line",
      height: 240,
      zoom: {
        enabled: false,
      },
    },
    colors: ["#6366F1"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: "Meses",
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
        text: "Número de Registros",
      },
      min: 0,
      max: 300,
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
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Registros",
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
          <FaCalendarAlt className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Registros por Mes
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Número de reparaciones registradas cada mes
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height={240}
        />
      </CardBody>
    </Card>
  );
};

export default RegistrosPorMesChart;
