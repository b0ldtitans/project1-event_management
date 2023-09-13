import React, { useState } from "react";
import BcaVAModal from "../modal/BcaVAModal";
import MandiriVAModal from "../modal/MandiriVAModal";
import BriVAModal from "../modal/BriVAModal";
import BniVAModal from "../modal/BniVAModal.js";

function VirtualAccountForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  const openModal = (bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBank(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 justify-center items-center gap-4 my-2 mx-5">
        <div className="w-16 p-2 border place-items-center rounded-md hover:shadow-md hover:scale-95 cursor-pointer">
          <img
            onClick={() => openModal("BCA")}
            className=""
            src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
            alt="Bank BCA"
          />
        </div>
        <div className="w-16 p-2 border place-items-center rounded-md hover:shadow-md hover:scale-95 cursor-pointer">
          <a href="#" className="">
            <img
              onClick={() => openModal("Mandiri")}
              className=""
              src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg"
              alt="Bank Mandiri"
            />
          </a>
        </div>
        <div className="w-16 p-2 border place-items-center rounded-md hover:shadow-md hover:scale-95 cursor-pointer">
          <a href="#" className="">
            <img
              onClick={() => openModal("BRI")}
              className=""
              src="https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg"
              alt="Bank BRI"
            />
          </a>
        </div>
        <div className="w-16 p-2 border place-items-center rounded-md hover:shadow-md hover:scale-95 cursor-pointer">
          <a href="#" className="">
            <img
              onClick={() => openModal("BNI")}
              className=""
              src="https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg"
              alt="Bank BNI"
            />
          </a>
        </div>
      </div>

      {isModalOpen && selectedBank === "BCA" && (
        <BcaVAModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedBank={selectedBank}
        />
      )}
      {isModalOpen && selectedBank === "Mandiri" && (
        <MandiriVAModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedBank={selectedBank}
        />
      )}
      {isModalOpen && selectedBank === "BRI" && (
        <BriVAModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedBank={selectedBank}
        />
      )}
      {isModalOpen && selectedBank === "BNI" && (
        <BniVAModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedBank={selectedBank}
        />
      )}
    </div>
  );
}

export default VirtualAccountForm;
