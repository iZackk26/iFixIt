import React, { useState /*, useEffect */ } from "react";
// import axios from "axios"; // se mantiene la importación por si reactivas la llamada
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaUsers } from "react-icons/fa";

interface EmployeeData {
  name: string;
  totalrepairs: number;
}

// 1) Datos quemados de ejemplo
const dummyEmployees: EmployeeData[] = [
  { name: "Ana García", totalrepairs: 48 },
  { name: "Luis Martínez", totalrepairs: 42 },
  { name: "María Gómez", totalrepairs: 35 },
  { name: "Carlos Pérez", totalrepairs: 28 },
  { name: "Sofía Rodríguez", totalrepairs: 22 },
  { name: "Jorge Sánchez", totalrepairs: 18 },
];

const TopEmpleadosChart: React.FC = () => {
  // 2) Inicializamos chartData con los datos quemados
  const [chartData] = useState<{
    series: number[];
    labels: string[];
  }>({
    labels: dummyEmployees.map((e) => e.name),
    series: dummyEmployees.map((e) => e.totalrepairs),
  });

  // 3) Función y efecto comentados para mantenerlos en el código
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`${apiUrl}registration/by-employee`);
        const labels = response.data.map((emp: EmployeeData) => emp.name);
        const series = response.data.map((emp: EmployeeData) => emp.totalrepairs);
        setChartData({ labels, series });
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      }
    };
    fetchData();
  }, []);
  */

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      toolbar: { show: false },
      type: "bar",
      height: 240,
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}`,
      style: { colors: ["#fff"] },
    },
    colors: ["#3B82F6"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 6,                // radio de las esquinas
        borderRadiusApplication: "end", // opcional: sólo al final de la barra
      },
    },
    xaxis: {
      categories: chartData.labels,
      title: { text: "Empleados" },
    },
    yaxis: {
      title: { text: "Número de Reparaciones" },
      min: 0,
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val} reparaciones` },
    },
    responsive: [
      {
        breakpoint: 768,
        options: { chart: { height: 200 } },
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
            Los empleados con más reparaciones realizadas
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart options={chartOptions} series={series} type="bar" height={240} />
      </CardBody>
    </Card>
  );
};

export default TopEmpleadosChart;

