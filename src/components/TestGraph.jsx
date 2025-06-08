import ReactApexChart from "react-apexcharts";

function TestGraph({ graphData }) {
  const options = {
    chart: {
      type: "bar",
      height: "100%",
      width: "100%",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    colors: ["#1A56DB"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 8,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: graphData.categories || [],
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: true },
    grid: { show: false },
    tooltip: { shared: true, intersect: false },
    fill: { opacity: 1 },
  };

  const series = [
    {
      name: "Sales",
      data: graphData.sales || [],
    },
  ];

  return (
    <div style={{width: "100%", height: "100%"}}>
      <ReactApexChart options={options} series={series} type="bar" height={320} />
    </div>
  );
}

export default TestGraph;