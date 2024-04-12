import React, { useEffect, useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

function OrderStatus(props) {
  const { status } = props;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    function percentStatus(){
        switch (status) {
          case "Đang chờ xác nhận":
            setPercent(0);
            break;
          case "Đã xác nhận đơn":
            setPercent(25);
            break;
          case "Đã gửi Ship":
            setPercent(50);
            break;
          case "Đã giao hàng":
            setPercent(100);
            break;
          default:
            setPercent(0);
        }
    }
    percentStatus();
  }, [status]);
  const renderOrderStatus = (status) => {
    let step = 0;
    let imageSource = "";

    switch (status) {
      case "Đang chờ xác nhận":
        step = 0;
        imageSource =
          "./assets/order-icon/notes.png"
        break;
      case "Đã xác nhận đơn":
        step = 25.0;
        imageSource =
          "./assets/order-icon/registered.png";
        break;
      case "Đã gửi Ship":
        step = 50.0;
        imageSource =
          "./assets/order-icon/delivery.png";
        break;
      case "Đã giao hàng":
        step = 100;
        imageSource =
          "./assets/order-icon/check-mark.png";
        break;
      default:
        step = 0;
        imageSource = "";
        break;
    }
    return (
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{
              filter: `grayscale(${accomplished ? 0 : 80}%)`,
              width: "25px",
            }}
            src={imageSource}
            alt={status}
          />
        )}
      </Step>
    );
  };

  return (
    <ProgressBar
      percent={percent}
      filledBackground="linear-gradient(to right, #bad8f7, #0080ff)"
    >
      {renderOrderStatus("Đang chờ xác nhận")}
      {renderOrderStatus("Đã xác nhận đơn")}
      {renderOrderStatus("Đã gửi Ship")}
      {renderOrderStatus("Đã giao hàng")}
    </ProgressBar>
  );
}

export default OrderStatus;
