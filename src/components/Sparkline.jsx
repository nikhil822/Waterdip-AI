import Chart from "react-apexcharts";

const Sparkline = ({ info }) => {
  const allDays = [
    ...new Set(info.map((item) => item.arrival_date_day_of_month)),
  ];

  const visitorsAdult = allDays.map((item) =>
    info
      .filter((filters) => filters.arrival_date_day_of_month === item)
      .reduce((acc, curr) => {
        return acc + curr.adults;
      }, 0)
  );
  const totalAdult = visitorsAdult.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  const visitorsChildren = allDays.map((item) =>
    info
      .filter((filters) => filters.arrival_date_day_of_month === item)
      .reduce((acc, curr) => {
        return acc + curr.children;
      }, 0)
  );
  const totalChildren = visitorsChildren.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  const options1 = {
    chart: {
      type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 0.3,
    },
    colors: ["#DCE6EC"],
    title: {
      text: `${totalAdult}`,
      offsetX: 0,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: "Number of Adult visitors",
      offsetX: 0,
      style: {
        fontSize: "14px",
      },
    },
  };
  const series1 = [
    {
      name: "visitors",
      data: visitorsAdult,
    },
  ];

  const options2 = {
    chart: {
      type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 0.3,
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    title: {
      text: `${totalChildren}`,
      offsetX: 0,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: "Number of Children",
      offsetX: 0,
      style: {
        fontSize: "14px",
      },
    },
  };
  const series2 = [
    {
      name: "visitors",
      data: visitorsChildren,
    },
  ];

  return (
    <div className="graph">
      <div className="heading">No. of Visitors visiting per Day</div>
      <Chart
        options={options1}
        series={series1}
        type="area"
        width="100%"
        className="height"
      />
      <Chart
        options={options2}
        series={series2}
        type="area"
        width="100%"
        className="height"
      />
    </div>
  );
};

export default Sparkline;
