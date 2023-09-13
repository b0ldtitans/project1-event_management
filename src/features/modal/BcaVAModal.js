import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaymentSuccessModal from "./paymentSuccessModal";

export default function BcaVAModal({ isOpen, onClose, selectedBank }) {
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [remainingTime, setRemainingTime] = useState(86400);
  const [formattedTime, setFormattedTime] = useState("24:00:00");
  const totalPrice = useSelector((state) => state.transaction.totalPrice);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCekStatusClick = () => {
    setShowSuccessModal(true);
  };

  const copyToClipboard = () => {
    const virtualAccountInput = document.getElementById("virtualAccountInput");

    if (virtualAccountInput) {
      virtualAccountInput.select();

      try {
        document.execCommand("copy");
        alert("Nomor Virtual Account berhasil disalin!");
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        try {
          navigator.clipboard
            .writeText(virtualAccountInput.value)
            .then(() => {
              alert("Nomor Virtual Account berhasil disalin!");
            })
            .catch((err) => {
              console.error(
                "Failed to copy to clipboard using Clipboard API:",
                err
              );
              alert("Gagal menyalin Nomor Virtual Account.");
            });
        } catch (clipboardError) {
          console.error("Clipboard API not supported:", clipboardError);
          alert("Gagal menyalin Nomor Virtual Account.");
        }
      }
    }
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const toggleAccordion = (index) => {
    if (index === accordionOpen) {
      setAccordionOpen(null);
    } else {
      setAccordionOpen(index);
    }
  };

  const accordionItems = [
    {
      title: "ATM BCA",
      content: (
        <div>
          <ol>
            <li>1. Masukkan Kartu ATM & PIN </li>
            <li>
              2. Pilih Menu Transaksi Lainnya &gt; Transfer &gt; ke Rekening BCA
              Virtual Account{" "}
            </li>
            <li>
              3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di
              akun anda
            </li>
            <li>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai{" "}
            </li>
            <li>5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan </li>
            <li>6. Ikuti transaksi untuk menyelesaikan transaksi </li>
            <li>7. Simpan struk transaksi sebagai bukti pembayaran </li>
          </ol>
        </div>
      ),
    },
    {
      title: "m-BCA (BCA Mobile)",
      content: (
        <div>
          <ol>
            <li>1. Masukkan Kartu ATM & PIN </li>
            <li>
              2. Pilih Menu Transaksi Lainnya &gt; Transfer &gt; ke Rekening BCA
              Virtual Account{" "}
            </li>
            <li>
              3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di
              akun anda
            </li>
            <li>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai{" "}
            </li>
            <li>5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan </li>
            <li>6. Ikuti transaksi untuk menyelesaikan transaksi </li>
            <li>7. Simpan struk transaksi sebagai bukti pembayaran </li>
          </ol>
        </div>
      ),
    },
    {
      title: "Internet Banking BCA",
      content: (
        <div>
          <ol>
            <li>1. Masukkan Kartu ATM & PIN </li>
            <li>
              2. Pilih Menu Transaksi Lainnya &gt; Transfer &gt; ke Rekening BCA
              Virtual Account{" "}
            </li>
            <li>
              3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di
              akun anda
            </li>
            <li>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai{" "}
            </li>
            <li>5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan </li>
            <li>6. Ikuti transaksi untuk menyelesaikan transaksi </li>
            <li>7. Simpan struk transaksi sebagai bukti pembayaran </li>
          </ol>
        </div>
      ),
    },
    {
      title: "Kantor Bank BCA",
      content: (
        <div>
          <ol>
            <li>1. Masukkan Kartu ATM & PIN </li>
            <li>
              2. Pilih Menu Transaksi Lainnya &gt; Transfer &gt; ke Rekening BCA
              Virtual Account{" "}
            </li>
            <li>
              3. Masukkan 5 angka kode perusahaan dan nomor HP yang terdaftar di
              akun anda
            </li>
            <li>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai{" "}
            </li>
            <li>5. Masukkan Jumlah Transfer sesuai dengan Total Tagihan </li>
            <li>6. Ikuti transaksi untuk menyelesaikan transaksi </li>
            <li>7. Simpan struk transaksi sebagai bukti pembayaran </li>
          </ol>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setRemainingTime(remainingTime - 1);
        setFormattedTime(formattedTime);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

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
        <div className=" flex flex-col justify-center items-center top-0 mb-6">
          <p className="text-lg font-semibold">Selesaikan Pembayaran Dalam</p>
          <p>
            <p>{formattedTime}</p>
          </p>
        </div>
        <div className="flex flex-col border rounded p-1 justify-between border-b-2">
          <div className="border-b flex flex-row justify-between">
            <h1 className="font-semibold  text-center text-lg text-gray-700">
              BCA Virtual Account
            </h1>
            <img
              className="w-12 m-1 p-1"
              src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
              alt=""
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col py-5">
              <h6>Nomor Virtual Account</h6>
              <h1
                className="text-lg font-semibold text-orange-600"
                value="807708111443805"
              >
                807708111443805
              </h1>
            </div>
            <button
              className="text-orange-600 text-xl p-[0px] font-semibold text-md "
              onClick={copyToClipboard}
            >
              Salin
            </button>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <p className="p-2 text-lg font-semibold text-orange-600">
                Total:
              </p>
            </div>
            <div>
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

        <div>
          {accordionItems.map((item, index) => (
            <div key={index} className="mb-2">
              <div
                className={`flex justify-between cursor-pointer  border-gray-200 ${
                  index === accordionOpen && "border-orange-600"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <h2 className="font-semibold py-2">{item.title}</h2>
                <svg
                  className={`w-4 h-4 mt-2 transition-transform transform ${
                    index === accordionOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {index === accordionOpen && (
                <div className="py-2">{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value="807708111443805"
        id="virtualAccountInput"
        style={{ position: "absolute", left: "-9999px" }}
        readOnly
      />
      {showSuccessModal && (
        <PaymentSuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
}
