import React from "react";
import { Head } from "@inertiajs/react";
import { ResponsiveLine } from "@nivo/line";
import Navbar from "../Components/Navbar";
import useFetchCurrentUsers from "../Hooks/useFetchCurrentUser";

interface SalesReportProps {
    salesData: { month: number; total_sales: number }[];
}

const SalesReport: React.FC<SalesReportProps> = ({ salesData }) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Convert sales data to Nivo format
    const formattedData = [
        {
            id: "Sales",
            color: "hsl(217, 70%, 50%)",
            data: salesData.map((item) => ({
                x: months[item.month - 1], // Convert month number to name
                y: Number(item.total_sales),
            })),
        },
    ];



    return (
        <>
            <Navbar />

            <div className="p-6">
                {/* <Head title="Sales Report" /> */}
                <h1 className="text-2xl font-bold mb-4">
                    Monthly Sales Report
                </h1>

                <div className="bg-white shadow-lg rounded-lg p-4">
                    {salesData.length > 0 ? (
                        <div className="h-[400px] w-full">
                            <ResponsiveLine
                                data={formattedData}
                                margin={{
                                    top: 50,
                                    right: 50,
                                    bottom: 50,
                                    left: 50,
                                }}
                                xScale={{ type: "point" }}
                                yScale={{ type: "linear", min: 0, max: "auto" }}
                                axisLeft={{
                                    legend: "Sales",
                                    legendPosition: "middle",
                                    legendOffset: -40,
                                }}
                                axisBottom={{
                                    legend: "Month",
                                    legendPosition: "middle",
                                    legendOffset: 30,
                                }}
                                colors={(d) => d.color}
                                pointSize={10}
                                pointColor={{ theme: "background" }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: "serieColor" }}
                                useMesh={true}
                            />
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            No sales data available.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SalesReport;
