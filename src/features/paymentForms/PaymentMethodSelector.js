import React, { useState } from "react";
import { FaCreditCard, FaWallet } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
//form
import CreditCardForm from "./CreditCards";
import EWalletForm from "./EWalletForm";
import VirtualAccountForm from "./VirtualAccountForm";

function PaymentMethodSelector() {
  const [selectedPayment, setSelectedPayment] = useState("creditCardCheckout");
  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  let selectedPaymentMethod;
  if (selectedPayment === "creditCardCheckout") {
    selectedPaymentMethod = <CreditCardForm />;
  } else if (selectedPayment === "E-WalletCheckout") {
    selectedPaymentMethod = <EWalletForm />;
  } else if (selectedPayment === "virtualAccountCheckout") {
    selectedPaymentMethod = <VirtualAccountForm />;
  } else if (selectedPayment === "QRIS") {
    selectedPaymentMethod = <VirtualAccountForm />;
  }

  return (
    <section id="checkoutPage" className="">
      <div id="paymentMethods">
        <div className="" id="payment-method">
          <h6 className="font-bold my-3">Pilih Metode Pembayaran</h6>
          <div className="border-2 hover:shadow-sm rounded-md">
            <div
              className={`flex-row cursor-pointer hover:bg-gray-100 flex border-b p-3 w-full ${
                selectedPayment === "creditCardCheckout" ? "selected" : ""
              }`}
              onClick={() => handlePaymentSelection("creditCardCheckout")}
            >
              <input
                type="radio"
                className="flex default-radio-1 mr-2 cursor-pointer"
                id="creditCardCheckout"
                name="paymentMethod"
                checked={selectedPayment === "creditCardCheckout"}
              />
              <label
                className="flex items-center cursor-pointer"
                htmlFor="creditCardCheckout"
              >
                Kartu Kredit&nbsp;&nbsp;
                <FaCreditCard />
              </label>
            </div>
            <div
              className={`flex-row cursor-pointer hover:bg-gray-100 flex border-b p-3 w-full ${
                selectedPayment === "E-WalletCheckout" ? "selected" : ""
              }`}
              onClick={() => handlePaymentSelection("E-WalletCheckout")}
            >
              <input
                type="radio"
                className="flex default-radio-1 mr-2 cursor-pointer"
                id="E-WalletCheckout"
                name="paymentMethod"
                checked={selectedPayment === "E-WalletCheckout"}
              />
              <label
                className="flex items-center cursor-pointer"
                htmlFor="E-WalletCheckout"
              >
                E-Wallet&nbsp;&nbsp;
                <FaWallet />
              </label>
            </div>
            <div
              className={`flex-row cursor-pointer hover:bg-gray-100 flex border-b p-3 w-full ${
                selectedPayment === "virtualAccountCheckout" ? "selected" : ""
              }`}
              onClick={() => handlePaymentSelection("virtualAccountCheckout")}
            >
              <input
                type="radio"
                className="flex default-radio-1 mr-2 cursor-pointer"
                id="virtualAccountCheckout"
                name="paymentMethod"
                checked={selectedPayment === "virtualAccountCheckout"}
              />
              <label
                className="flex items-center cursor-pointer"
                htmlFor="virtualAccountCheckout"
              >
                Virtual Account&nbsp;&nbsp;
                <FaMoneyBillTransfer />
              </label>
            </div>
          </div>
        </div>
        <div className="border-2 rounded-xl mt-5">{selectedPaymentMethod}</div>
      </div>
    </section>
  );
}

export default PaymentMethodSelector;
