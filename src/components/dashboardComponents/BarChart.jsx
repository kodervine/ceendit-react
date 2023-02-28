import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useGlobalContext } from "@/context/AppContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { invoiceFormState } = useGlobalContext();
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: invoiceFormState.allInvoiceData.map((items) => items.dateDue),
      datasets: [
        {
          label: "Invoices",
          data: invoiceFormState.allInvoiceData.map((items) => {
            return items.itemContainer.reduce(
              (acc, item) =>
                acc +
                parseFloat(item.itemQty || 0) * parseFloat(item.itemPrice || 0),
              0
            );
          }),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Invoice Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [invoiceFormState]);
  return (
    <>
      <Box
        width={{ sm: "90vw", md: "60vw" }}
        height={{ sm: "50vh", md: "70vh" }}
      >
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </>
  );
};

export default BarChart;
