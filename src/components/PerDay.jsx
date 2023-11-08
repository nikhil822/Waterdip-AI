import { useState } from "react";
import { data } from "../data.js";
import Chart from "react-apexcharts";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PerDay = () => {
  const [info, setInfo] = useState(data);
  const [selectedDateS, setSelectedDateS] = useState(null);
  const [selectedDateE, setSelectedDateE] = useState(null);
  const minDateS = new Date(2015, 6, 1);
  const maxDateS = new Date(2015, 7, 31);
  const minDateE = new Date(2015, 6, 1);
  const maxDateE = new Date(2015, 7, 31);

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

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: allDays,
    },
  };
  const series = [
    {
      name: "visitors",
      data: visitors,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const monthToNumber = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    var date1 =
      selectedDateS.getFullYear() +
      "-" +
      (selectedDateS.getMonth() + 1) +
      "-" +
      selectedDateS.getDate();
    var date2 =
      selectedDateE.getFullYear() +
      "-" +
      (selectedDateE.getMonth() + 1) +
      "-" +
      selectedDateE.getDate();
    console.log(date1);
    console.log(date2);
    if (date1 > date2)
      alert("Wrong date or the date is not present in the data");
    else {
      const filtered = data.filter((item) => {
        const arri =
          item.arrival_date_year +
          "-" +
          monthToNumber[item.arrival_date_month] +
          "-" +
          item.arrival_date_day_of_month;
        return arri >= date1 && arri <= date2;
      });
      console.log(filtered);
      setInfo(filtered);
    }
  };

  return (
    <div className="graph-indiv">
      <div className="heading">No. of Visitors visiting per Country</div>
      <form onSubmit={handleSubmit}>
        <label style={{ margin: "10px" }}>Start Date: </label>
        <DatePicker
          selected={selectedDateS}
          onChange={(date) => setSelectedDateS(date)}
          minDate={minDateS}
          maxDate={maxDateS}
          placeholderText="Start Date"
          className="select"
        />
        <label style={{ margin: "10px" }}>End Date: </label>
        <DatePicker
          selected={selectedDateE}
          onChange={(date) => setSelectedDateE(date)}
          minDate={minDateE}
          maxDate={maxDateE}
          placeholderText="End Date"
          className="select"
        />
        <Button variant="contained" type="submit">
          Filter
        </Button>
      </form>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        className="height"
      />
    </div>
  );
};

export default PerDay;
