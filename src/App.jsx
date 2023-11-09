import PerCountry from "./components/PerCountry";
import PerDay from "./components/PerDay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { data } from "./data.js";
import "./App.css";
import Sparkline from "./components/Sparkline";
import { useState } from "react";
import { Button } from "@mui/material";

function App() {
  const [info, setInfo] = useState(data);
  const [selectedDateS, setSelectedDateS] = useState(null);
  const [selectedDateE, setSelectedDateE] = useState(null);
  const minDateS = new Date(2015, 6, 1);
  const maxDateS = new Date(2015, 7, 31);
  const minDateE = new Date(2015, 6, 1);
  const maxDateE = new Date(2015, 7, 31);

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

    if (selectedDateE < selectedDateS)
      alert("Wrong selection of date or the date is not present in the data");
    else {
      const filtered = data.filter((item) => {
        const arri =
          item.arrival_date_year +
          "-" +
          monthToNumber[item.arrival_date_month] +
          "-" +
          item.arrival_date_day_of_month;
        const arr = new Date(arri);
        return arr >= selectedDateS && arr <= selectedDateE;
      });
      setInfo(filtered);
    }
  };
  return (
    <div className="app">
      <div className="graph">
        <div className="heading">
          Choose a date range for which the data will be displayed.
        </div>
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
      </div>
      <PerCountry info={info} />
      <PerDay info={info} />
      <Sparkline info={info} />
    </div>
  );
}

export default App;
