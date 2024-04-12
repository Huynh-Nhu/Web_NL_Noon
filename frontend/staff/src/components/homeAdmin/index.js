import { useEffect, useState } from "react";
import { Card, CardBody } from "react-bootstrap";
import { getAccount } from "../../Redux/apiRequest";
import React from "react";

import "../homeAdmin/homeAmin.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import RevenueDaySelect from "../RevenueDaySelect";
function HomeAdmin() {
  const [numberUser, setNumberUser] = useState("");
  const [order, setOrder] = useState("");
  const [orderShip, setOrderShip] = useState("");
  const [revenue, setRevenue] = useState("");

  const [priceDaily, setPriceDaily] = useState([]);
  const [chart, setChart] = useState([]);
  const [chartRevenue, setChartRevenue] = useState([]);
  const [chartRevenueQuarter, setChartRevenueQuarter] = useState([]);

  const [selectedChart, setSelectedChart] = useState("month");

  const handleChartSelect = (event) => {
    console.log(event.target.value);
    setSelectedChart(event.target.value);
  };
  useEffect(() => {
    getAccount().then((data) => {
      setNumberUser(data?.customer);
      setPriceDaily(data?.orderDaily);
      setChart(data?.data);
      setOrder(data?.order);
      setOrderShip(data?.orderShip);
      setChartRevenue(data?.revenue);
      setChartRevenueQuarter(data?.revenueQuarter);
      setRevenue(data?.revenueTotalShop);
    });
  }, []);
  return (
    <div className="mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <Card style={{ maxWidth: "18rem" }}>
            <CardBody>
              <div className="row card-home-account card-home-account">
                <div className="col-6 card-img-account">
                  <img
                    style={{ width: "100px" }}
                    src="assets/img/user/group.png"
                  />
                </div>
                <div className="col-6 card-account ">
                  <p>{numberUser}</p>
                  <p>Khách hàng </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col">
          <Card style={{ maxWidth: "18rem" }}>
            <CardBody>
              <div className="row card-home-account">
                <div className="col-6  card-img-account">
                  <img
                    style={{ width: "100px" }}
                    src="assets/img/user/revenue-growth.png"
                  />
                </div>
                <div className="col-6 card-account">
                  {priceDaily.length > 0 ? (
                    <div>
                      <p>
                        {priceDaily?.map((price, index) => (
                          <p key={index}> {price?.tongThu}</p>
                        ))}
                      </p>
                      <p>Doanh số/1day</p>
                    </div>
                  ) : (
                    <div>
                      <p>0</p>
                      <p>Doanh số</p>
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col">
          <Card style={{ maxWidth: "18rem" }}>
            <CardBody>
              <div className="row card-home-account">
                <div className="col-6  card-img-account">
                  <img
                    style={{ width: "100px" }}
                    src="assets/img/user/checklist.png"
                  />
                </div>
                <div className="col-6 card-account">
                  <p>{orderShip}</p>
                  <p>Đơn hàng/1day</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="col">
          <Card style={{ maxWidth: "18rem" }}>
            <CardBody>
              <div className="row card-home-account">
                <div className="col-6  card-img-account">
                  <img
                    style={{ width: "100px" }}
                    src="assets/img/user/order.png"
                  />
                </div>
                <div className="col-6 card-account">
                  <p>{order}</p>
                  <p>Tổng đơn hàng</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col">
          <Card style={{ maxWidth: "18rem" }}>
            <CardBody>
              <div className="row card-home-account">
                <div className="col-6  card-img-account">
                  <img
                    style={{ width: "100px" }}
                    src="assets/img/user/profit-up.png"
                  />
                </div>
                <div className="col-6 card-account">
                  <p>{revenue.toLocaleString()}</p>
                  <p>Tổng doanh số</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="select-revenue">
        <Card>
          <CardBody>
            <RevenueDaySelect />
          </CardBody>
        </Card>
      </div>
      <div className="chart-home">
        {selectedChart === "daily" && (
          <div>
            <h3>Thông kê theo ngay trên tuần</h3>
            <div>
              <BarChart width={840} height={300} data={chart}>
                <XAxis dataKey="Day" stroke="#8884d8" />
                <YAxis width={80} />
                <Tooltip />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="Price" fill="#6dc170" barSize={30} />
              </BarChart>
            </div>
          </div>
        )}
        {selectedChart === "month" && (
          <div>
            <h3 style={{ color: "#146474" }}>Thông kê theo tháng</h3>
            <div>
              <BarChart width={800} height={300} data={chartRevenue}>
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis width={80} />
                <Tooltip />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="doanhSoThang" fill="#48CAE4" barSize={30} />
              </BarChart>
            </div>
          </div>
        )}

        {selectedChart === "quester" && (
          <div>
            <h3 style={{ color: "#8b0000" }}>Thông kê theo quý</h3>
            <div>
              <BarChart width={800} height={300} data={chartRevenueQuarter}>
                <XAxis dataKey="monthRange" stroke="#8884d8" />
                <YAxis width={80} />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="doanhSoQuy" fill="#FFBA08" barSize={30} />p{" "}
              </BarChart>
            </div>
          </div>
        )}

        <div className="radios-revenue">
          <label>
            <input
              type="radio"
              value="daily"
              checked={selectedChart === "daily"}
              onChange={handleChartSelect}
            />
            Ngày
          </label>
          <label>
            <input
              type="radio"
              value="month"
              checked={selectedChart === "month"}
              onChange={handleChartSelect}
            />
            Tháng
          </label>
          <label>
            <input
              type="radio"
              value="quester"
              checked={selectedChart === "quester"}
              onChange={handleChartSelect}
            />
            Quý
          </label>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
