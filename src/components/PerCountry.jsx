import Chart from "react-apexcharts";

const PerCountry = ({ info }) => {
  const AllCountries = [...new Set(info.map((item) => item.country))];

  const visitors = AllCountries.map((item) =>
    info
      .filter((filters) => filters.country === item)
      .reduce((acc, curr) => {
        return acc + (curr.adults + curr.children + curr.babies);
      }, 0)
  );

  const options = {
    chart: {
      id: "basic-bar",
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        vertical: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#333"],
      },
      offsetY: -20,
    },
    xaxis: {
      categories: AllCountries,
    },
  };

  const series = [
    {
      name: "visitors",
      data: visitors,
    },
  ];

  return (
    <div className="graph">
      <div className="heading">No. of Visitors visiting per Country</div>
      <Chart options={options} series={series} type="bar" width="100%" />
    </div>
  );
};

export default PerCountry;
