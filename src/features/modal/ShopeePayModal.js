import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaymentSuccessModal from "./paymentSuccessModal";

export default function BcaVAModal({ isOpen, onClose, selectedBank }) {
  const totalPrice = useSelector((state) => state.transaction.totalPrice);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCekStatusClick = () => {
    setShowSuccessModal(true);
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-16 rounded lg:w-[60%] lg:h-[95%] h-full w-full">
        <div>
          <button
            className=" p-3 font-bold text-orange-600 text-2xl"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex flex-col border rounded p-1 justify-between border-b-2">
          <div className="border-b flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center ">
                <li className="flex items-center text-black">
                  <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-orange-600 rounded-full shrink-0 ">
                    1
                  </span>
                  <span>Buka aplikasi OVO di Smartphone anda</span>
                  <svg
                    class="w-3 h-3 ml-2 sm:ml-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 12 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m7 9 4-4-4-4M1 9l4-4-4-4"
                    />
                  </svg>
                </li>
                <li className="flex items-center text-black">
                  <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-orange-600 rounded-full shrink-0 ">
                    2
                  </span>
                  Klik pada gambar "QR Code"
                  <svg
                    class="w-3 h-3 ml-2 sm:ml-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 12 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m7 9 4-4-4-4M1 9l4-4-4-4"
                    />
                  </svg>
                </li>
                <li className="flex items-center text-black">
                  <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-orange-600 rounded-full shrink-0">
                    3
                  </span>
                  Scan QR Code di bawah ini
                </li>
              </ol>
            </div>
            <img
              className="lg:w-[80px] m-1 p-1 lg:h-[40px] mr-3"
              src="https://1.bp.blogspot.com/-n_jPjNl97nw/YIJ78WnloPI/AAAAAAAACks/xPjLQ2YpcXwyPf64C708UExQOrJitxHSgCNcBGAsYHQ/w1200-h630-p-k-no-nu/ShopeePay.png"
              alt="Shopeepay"
            />
          </div>
          <div className="flex flex-row justify-center">
            <img src="https://i.imgur.com/BaixoFZ.png" alt="QR Code" />
          </div>
          <div className="flex flex-row justify-between border-t p-1">
            <div>
              <p className="p-2 text-lg font-semibold text-orange-600">
                Total:
              </p>
            </div>
            <div className="p-1">
              {totalPrice === "Free" ? (
                <p className="p-2 text-lg font-semibold text-orange-600">
                  Rp. 0 (FREE)
                </p>
              ) : (
                <span className="text-lg font-semibold text-orange-600">
                  {formatter.format(totalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleCekStatusClick}
            className="px-5 py-2 my-5 bg-white border-orange-600 border p-3 text-orange-600 font-semibold rounded hover:bg-gray-100 hover:shadow-md"
          >
            Cek Status Pembayaran
          </button>
        </div>
      </div>
      {showSuccessModal && (
        <PaymentSuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
}
