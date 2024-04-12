import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { addPay } from "../../service/apiCustomer";

function PayLayout(props) {
  const {calculateTotalPrice , handlePaypal} = props;
  const price = calculateTotalPrice()
  const  convertVNDtoUSD= (amountVND) => {
    const exchangeRate = 23000; // Tỷ giá hối đoái VND sang USD
    const amountUSD = amountVND / exchangeRate;
    return amountUSD;
  }
  
 
  const amountVND = parseInt(price, 10); // Chuyển đổi chuỗi thành số nguyên
  const amountUSD = convertVNDtoUSD(amountVND);
  const priceUSD = amountUSD.toFixed(2);

  const initialOptions = {
    clientId:
     "AZ87UF4V213_WxumP9kb8hi331mbE1ZzuMb7PY66k7J6PJRNRtA5IFJfrB_1GWWljUs-xQ2ZyZGYx-Xa",
    currency: "USD",
    intent: "capture",
  };
  const createOrder = (data) => {
    // Order is created on the server and the order id is returned
    return fetch("http://localhost:8080/pay/getAPIPaypal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        product: {
          cost: priceUSD
        }
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = (data) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch("http://localhost:8080/pay/capture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => {
      response.json().then(() => {
        handlePaypal(response.ok)
      })});
  };
  return (
    <div>
      <PayPalScriptProvider options={ initialOptions }>
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PayLayout;
