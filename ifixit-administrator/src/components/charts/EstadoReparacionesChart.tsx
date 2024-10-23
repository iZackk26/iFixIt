// src/components/charts/EstadoReparacionesChart.tsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaTasks } from "react-icons/fa"; // Importa el icono deseado de react-icons

interface EstadoReparacionesData {
  series: number[];
  labels: string[];
}

const EstadoReparacionesChart: React.FC = () => {
  const [chartData, setChartData] = useState<EstadoReparacionesData>({
    series: [],
    labels: [],
  });

  useEffect(() => {
    // Datos estáticos para ahora. En el futuro, reemplaza con una llamada a una API.
    const data: EstadoReparacionesData = {
      series: [40, 35, 25], // Pendiente, En Proceso, Completado
      labels: ["Pendiente", "En Proceso", "Completado"],
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
      enabled: false,
    },
    colors: ["#10B981"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: chartData.labels,
      title: {
        text: "Estado",
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
        text: "Cantidad",
      },
      min: 0,
      max: 100,
      tickAmount: 5,
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
          <FaTasks className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Estado de Reparaciones
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Distribución de reparaciones por estado
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

export default EstadoReparacionesChart;
