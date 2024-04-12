import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import { selectRevenue } from "../../Redux/apiRequest";
import Modal from "react-bootstrap/Modal";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
function RevenueDaySelect() {
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedTimeStart, setSelectedTimeStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);
  const [revenueArray, setRevenueArray] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState("");
  const [show, setShow] = useState(false);

  const startDay = new Date(`${selectedDateStart}T${selectedTimeStart}`);
  const endDay = new Date(`${selectedDateEnd}T${selectedTimeEnd}`);

  const handleTimeChangeStart = (event) => {
    setSelectedTimeStart(event.target.value);
  };
  const handleDateChangeStart = (event) => {
    setSelectedDateStart(event.target.value);
  };
  const handleTimeChangeEnd = (event) => {
    setSelectedTimeEnd(event.target.value);
  };
  const handleDateChangeEnd = (event) => {
    setSelectedDateEnd(event.target.value);
  };
  const handleClose = () => setShow(false);
  const handleSearchRevenue = (e) => {
    e.preventDefault();
    const Day = {
      startDay: startDay,
      endDay: endDay,
    };
    selectRevenue(Day).then((data) => {
      setShow(true);
      console.log(data);
      setRevenueArray(data.revenueArray);
      setTotalRevenue(data.totalRevenue);
    });
  };

  return (
    <div>
      <Form onSubmit={handleSearchRevenue}>
        <h3>Tìm doanh số</h3>
        <div className="start">
          <p>Ngày Bắt đầu</p>
          <TextField
            sx={{ m: 1, marginLeft: 0 }}
            id="date"
            required
            label="Ngày Tháng"
            type="date"
            value={selectedDateStart}
            onChange={handleDateChangeStart}
            InputLabelProps={{
              shrink: true,
            }}
            className="han-nop"
          />
          <TextField
            sx={{ m: 1 }}
            id="time"
            required
            label="Thời Gian"
            type="time"
            value={selectedTimeStart}
            onChange={handleTimeChangeStart}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min step, can be changed as needed
            }}
            className="han-nop"
          />
        </div>
        <div className="start">
          <p>Ngày Kết thúc</p>
          <TextField
            sx={{ m: 1, marginLeft: 0 }}
            id="date"
            required
            label="Ngày Tháng"
            type="date"
            value={selectedDateEnd}
            onChange={handleDateChangeEnd}
            InputLabelProps={{
              shrink: true,
            }}
            className="han-nop"
          />
          <TextField
            sx={{ m: 1 }}
            id="time"
            required
            label="Thời Gian"
            type="time"
            value={selectedTimeEnd}
            onChange={handleTimeChangeEnd}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min step, can be changed as needed
            }}
            className="han-nop"
          />
        </div>

        <div className="text-center">
          <Button variant="dark" type="submit">
            Tìm 
          </Button>
        </div>
      </Form>

      {show && (
        <div>
          <Modal size="lg" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Doanh số : {totalRevenue?.toLocaleString()}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BarChart width={760} height={300} data={revenueArray}>
                <XAxis dataKey="date" stroke="#8884d8" />
                <YAxis />
                <Tooltip />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="totalRevenue" fill="#FFBA08" barSize={30} />
              </BarChart>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default RevenueDaySelect;
