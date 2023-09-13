import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import PaymentSuccessModal from "../modal/paymentSuccessModal";

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardNumberChange = (event) => {
    const inputNumber = event.target.value.replace(/\s/g, "");
    const formattedNumber = formatCardNumber(inputNumber);
    setCardNumber(formattedNumber);
    detectCardType(formattedNumber);
    if (/[^0-9 ]/.test(formattedNumber)) {
      setError("Card number should only contain numbers");
    } else {
      setError("");
    }
  };

  const formatCardNumber = (number) => {
    const formatted = number
      .replace(/\s/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.trim();
  };

  const detectCardType = (number) => {
    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;

    if (visaPattern.test(number)) {
      setCardType("Visa");
    } else if (mastercardPattern.test(number)) {
      setCardType("MasterCard");
    } else if (amexPattern.test(number)) {
      setCardType("Amex");
    } else {
      setCardType("");
    }
  };

  return (
    <form className="max-w-full flex flex-col p-2">
      <h2 className="text-2xl mx-3 my-5 font-bold">Credit Card</h2>
      <div className="mr-3">
        <label className="mb-5 mx-3" htmlFor="cardNumber">
          {" "}
          Card Number
        </label>
        <div className="ml-3 flex items-center border border-gray-300 rounded-md p-2">
          <input
            required
            type="card"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="19"
            placeholder="Enter your card number"
            className="border-transparent w-full p-1 focus:border-transparent"
          />
          {cardType === "Visa" && <FaCcVisa size={30} />}
          {cardType === "MasterCard" && <FaCcMastercard size={30} />}
          {cardType === "Amex" && <FaCcAmex size={30} />}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {/*Name on Card*/}
      <div className="mx-3">
        <label className="mb-5" htmlFor="cardName">
          Name on Card:{" "}
        </label>
        <input
          required
          type="text"
          id="cardName"
          placeholder="Enter The Name on Card"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      {/*Expriation Date*/}
      <div>
        <div className="mx-3">
          <label className="mb-5" htmlFor="cardExpiry">
            Expiration Date:{" "}
          </label>
          <input
            required
            type="text"
            id="cardExpiry"
            placeholder="MM / YY"
            pattern="(0[1-9]|1[0-2]) \/ \d{2}"
            maxLength="7"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={(e) => {
              const value = e.target.value;
              const month = value.slice(0, 2);
              if (parseInt(month) > 12) {
                e.target.value = "12 / ";
              } else {
                e.target.value = value;
              }
            }}
          />
        </div>
      </div>
      {/* CVV */}
      <div>
        <div className="mx-3">
          <label className="mb-5" htmlFor="cardCvv">
            CVV:{" "}
          </label>
          <input
            required
            type="text"
            id="cardCvv"
            placeholder="CVV"
            pattern="\d{3,4}"
            maxLength="3"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <div className="items-center flex justify-start ml-1 mt-3">
        <button
          className="text-white font-bold bg-orange-600 border-1 rounded-lg max-w-full flex items-center  justify-center p-2 m-2 "
          type="submit"
          onClick={toggleModal}
        >
          Submit
        </button>
      </div>
      {isModalOpen && <PaymentSuccessModal />}
    </form>
  );
};

export default CreditCardForm;
