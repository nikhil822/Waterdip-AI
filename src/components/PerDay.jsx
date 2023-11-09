import Chart from "react-apexcharts";

const PerDay = ({ info }) => {
  const allDays = [
    ...new Set(info.map((item) => item.arrival_date_day_of_month)),
  ];

  const visitors = allDays.map((item) =>
    info
      .filter((filters) => filters.arrival_date_day_of_month === item)
      .reduce((acc, curr) => {
        return acc + (curr.adults + curr.children + curr.babies);
      }, 0)
  );

  var options = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        text: "Number of Visitors",
      },
    },
    xaxis: {
      // type: "datetime",
      categories: allDays,
      title: {
        text: "Date",
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val;
        },
      },
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
      <div className="heading">No. of Visitors visiting per Day</div>
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        className="height"
      />
    </div>
  );
};

export default PerDay;
