import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const TemperatureChart = ({ hourly = [] }) => {
  if (!hourly || hourly.length === 0) return null;

  const chartData = hourly.map((item) => ({
    time:
      item.time ||
      new Date(item.dt_txt).toLocaleTimeString("en-IN", {
        hour: "numeric",
        hour12: true,
      }),

    temp:
      item.temp ??
      item.main?.temp ??
      0,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-[35px] border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-3xl"
    >
      <h2 className="mb-6 text-3xl font-bold text-white">
        🌡 Temperature Trend
      </h2>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.15)"
            />

            <XAxis
              dataKey="time"
              tick={{
                fill: "#fff",
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fill: "#fff",
                fontSize: 12,
              }}
              unit="°"
            />

            <Tooltip
              contentStyle={{
                background: "#1f2937",
                borderRadius: "12px",
                border: "none",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#38bdf8"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#38bdf8",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TemperatureChart;