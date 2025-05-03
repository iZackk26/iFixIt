import React, { useState /*, useEffect */ } from "react";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaTasks } from "react-icons/fa";
import axios from "axios"; // mantenemos la importación por si decides reactivar la llamada

interface EstadoReparacionesData {
  series: number[];
  labels: string[];
}

// Datos quemados: incluye también "completado" pero luego filtramos
const dummyStatusData = [
  { status: "pendiente", totalregistrations: 12 },
  { status: "en proceso", totalregistrations: 18 },
  { status: "completado", totalregistrations: 30 },
];

const EstadoReparacionesChart: React.FC = () => {
  // Filtramos "completado" y preparamos labels/series
  const filtered = dummyStatusData.filter((item) => item.status !== "completado");
  const [chartData] = useState<EstadoReparacionesData>({
    labels: filtered.map((item) => item.status),
    series: filtered.map((item) => item.totalregistrations),
  });

  // Función y efecto comentados para mantenerlos en el código
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`${apiUrl}registration/by-status`);
        const filteredData = response.data.filter((item: any) => item.status !== "completado");
        const labels = filteredData.map((item: any) => item.status);
        const series = filteredData.map((item: any) => Number(item.totalregistrations));
        setChartData({ labels, series });
      } catch (err) {
        console.error('Error fetching registration status data:', err);
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
    dataLabels: { enabled: false },
    colors: ["#10B981"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: chartData.labels,
      title: { text: "Estado" },
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
      title: { text: "Cantidad" },
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
          <Typography variant="small" color="gray" className="max-w-sm font-normal">
            Distribución de reparaciones por estado
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart options={chartOptions} series={series} type="bar" height={240} />
      </CardBody>
    </Card>
  );
};

export default EstadoReparacionesChart;

