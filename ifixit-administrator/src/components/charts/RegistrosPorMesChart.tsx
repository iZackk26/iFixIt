import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

interface RegistrosPorMesData {
  series: number[];
  categories: string[];
}

const getMonthName = (monthString: string): string => {
  const [year, month] = monthString.split("-"); // Dividir el string "YYYY-MM"
  const date = new Date(Number(year), Number(month) - 1, 1); // Crear la fecha manualmente
  return date.toLocaleString('en-US', { month: 'long' }); // Obtener el nombre completo del mes
};


const RegistrosPorMesChart: React.FC = () => {
  const [chartData, setChartData] = useState<RegistrosPorMesData>({
    series: [],
    categories: [],
  });

  const fetchMonthlyRegistrations = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY; // Ajusta la URL de tu API
      const response = await axios.get(`${apiUrl}registration/by-month`); // Endpoint que te devuelve los datos

      const data = response.data; // Suponiendo que esta es la estructura de la respuesta
      const categories = data.map((entry: any) => getMonthName(entry.month)); 
      const series = data.map((entry: any) => Number(entry.totalregistrations)); // Extrae las cantidades de registros

      // Actualizar los datos del gráfico
      setChartData({ categories, series });
    } catch (err) {
      console.error("Error fetching monthly registrations:", err);
    }
  };

  useEffect(() => {
    fetchMonthlyRegistrations(); // Llamar a la API al montar el componente
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
