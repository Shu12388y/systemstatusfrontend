import  { useEffect, useState } from "react";
import axios from "axios";


const App = () => {
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await axios.get("https://systemstatusbackend.onrender.com/system-info");
        setSystemInfo(response.data);
      } catch (err) {
        setError("Failed to fetch system information.");
      } finally {
        setLoading(false);
      }
    };

    fetchSystemInfo();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-white text-lg animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          System Information Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPU Usage */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2">CPU Usage</h2>
            <p className="text-3xl font-bold text-emerald-400">
              {systemInfo.cpu_usage}
            </p>
          </div>

          {/* RAM Usage */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2">RAM Usage</h2>
            <div className="space-y-1">
              <p>Total: {systemInfo.ram.total}</p>
              <p>Used: {systemInfo.ram.used}</p>
              <p className="text-emerald-400 font-bold">
                Percentage: {systemInfo.ram.percent}
              </p>
            </div>
          </div>

          {/* Battery Status */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Battery Status</h2>
            <div className="space-y-1">
              <p>
                Percentage:{" "}
                {systemInfo.battery.percent === "No battery"
                  ? "No Battery"
                  : `${systemInfo.battery.percent}%`}
              </p>
              <p>
                Plugged In:{" "}
                <span
                  className={`font-bold ${
                    systemInfo.battery.plugged_in
                      ? "text-emerald-400"
                      : "text-red-500"
                  }`}
                >
                  {systemInfo.battery.plugged_in ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>

          {/* Python Version */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Python Version</h2>
            <p className="text-3xl font-bold text-emerald-400">
              {systemInfo.python_version}
            </p>
          </div>

          {/* Location */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            {systemInfo.location.error ? (
              <p className="text-red-500">{systemInfo.location.error}</p>
            ) : (
              <p>
                {systemInfo.location.city || "N/A"},{" "}
                {systemInfo.location.region || "N/A"},{" "}
                {systemInfo.location.country || "N/A"} (IP:{" "}
                {systemInfo.location.ip || "N/A"})
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
