// src/components/stats.tsx
import React from "react";
import { Typography } from "@material-tailwind/react";
import RegistrosPorMesChart from "../components/charts/RegistrosPorMesChart";
import EstadoReparacionesChart from "../components/charts/EstadoReparacionesChart";
import TopEmpleadosChart from "../components/charts/TopEmpleadosChart";

const Stats: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h2" className="text-3xl font-bold mb-6">
        Dashboard de Reportes del Taller
      </Typography>

      {/* Sección de Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegistrosPorMesChart />
        <EstadoReparacionesChart />
        <TopEmpleadosChart />
      </div>
  
    </div>
  );
};

export default Stats;