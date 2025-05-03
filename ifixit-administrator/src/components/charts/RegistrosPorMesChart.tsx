import React, { useState /*, useEffect */ } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaCalendarAlt } from "react-icons/fa";
// import axios from "axios"; 

interface RegistrosPorMesData {
  series: number[];
  categories: string[];
}

const getMonthName = (monthString: string): string => {
  const [year, month] = monthString.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleString("en-US", { month: "long" });
};

// Datos quemados para cubrir un año (junio 2024 – mayo 2025)
const dummyMonthlyRegistrations = [
  { month: "2024-06", totalrepairs: 15 },
  { month: "2024-07", totalrepairs: 18 },
  { month: "2024-08", totalrepairs: 20 },
  { month: "2024-09", totalrepairs: 22 },
  { month: "2024-10", totalrepairs: 25 },
  { month: "2024-11", totalrepairs: 27 },
  { month: "2024-12", totalrepairs: 30 },
  { month: "2025-01", totalrepairs: 32 },
  { month: "2025-02", totalrepairs: 35 },
  { month: "2025-03", totalrepairs: 38 },
  { month: "2025-04", totalrepairs: 40 },
  { month: "2025-05", totalrepairs: 42 },
];

const RegistrosPorMesChart: React.FC = () => {
  // Inicializamos el chartData directamente con los datos quemados
  const [chartData] = useState<RegistrosPorMesData>({
    series: dummyMonthlyRegistrations.map((entry) => entry.totalrepairs),
    categories: dummyMonthlyRegistrations.map((entry) =>
      getMonthName(entry.month)
    ),
  });

  // Función y efecto comentados para mantenerlos en el código
  /*
  const fetchMonthlyRegistrations = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.get(`${apiUrl}registration/by-month`);
      const data = response.data;
      const categories = data.map((e: any) => getMonthName(e.month));
      const series = data.map((e: any) => Number(e.totalrepairs));
      setChartData({ categories, series });
    } catch (err) {
      console.error("Error fetching monthly registrations:", err);
    }
  };

  useEffect(() => {
    fetchMonthlyRegistrations();
  }, []);
  */

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      toolbar: { show: false },
      type: "line",
      height: 240,
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 0 },
    xaxis: {
      categories: chartData.categories,
      title: { text: "Meses" },
      axisTicks: { show: false },
      axisBorder: { show: false },
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
      title: { text: "Número de Registros" },
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
      padding: { top: 5, right: 20 },
    },
    fill: { opacity: 0.8 },
    tooltip: { theme: "dark" },
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

