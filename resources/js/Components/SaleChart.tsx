import React from "react";
import { Head } from "@inertiajs/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface SalesReportProps {
  salesData: { month: number; total_sales: number }[];
}

const SalesReport: React.FC<SalesReportProps> = ({ salesData }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format sales data to display month names
  const formattedData = salesData.map((item) => ({
    month: months[item.month - 1], // Convert month number to name
    total_sales: item.total_sales,
  }));

  return (
    <div className="p-6">
      <Head title="Sales Report" />
      <h1 className="text-2xl font-bold mb-4">Monthly Sales Report</h1>

      <div className="bg-white shadow-lg rounded-lg p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total_sales" stroke="#4F46E5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesReport;
