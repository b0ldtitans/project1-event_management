import React, { useState } from "react";
import OvoModal from "../modal/OvoModal";
import GoPayModal from "../modal/GoPayModal";
import ShopeePayModal from "../modal/ShopeePayModal";
import DanaModal from "../modal/DanaModal";

function EWalletForm() {
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
    <section className="p-4">
      <div className="grid grid-cols-4 justify-center items-center gap-4 my-2 mx-5">
        <div className="w-16 p-2 border place-items-center rounded-md hover:shadow-md hover:scale-95 cursor-pointer">
          <img
            className=""
            src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg"
            alt="OVO"
            onClick={() => openModal("OVO")}
          />
        </div>
        <div className="w-16 p-2 border place-items-center rounded-md hover:shadow-md hover:scale-95 cursor-pointer">
          <img
            className=""
            src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg"
            alt="Gopay"
            onClick={() => openModal("Gopay")}
          />
        </div>
        <div className="w-16 p-2 border place-items-center rounded-md hover:shadow-md hover:scale-95 cursor-pointer">
          <img
            className=""
            src="https://1.bp.blogspot.com/-n_jPjNl97nw/YIJ78WnloPI/AAAAAAAACks/xPjLQ2YpcXwyPf64C708UExQOrJitxHSgCNcBGAsYHQ/w1200-h630-p-k-no-nu/ShopeePay.png"
            alt="ShopeePay"
            onClick={() => openModal("ShopeePay")}
          />
        </div>
        <div className="w-16 p-2 border place-items-center rounded-md hover:shadow-md hover:scale-95 cursor-pointer">
          <img
            className=""
            src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg"
            alt="Dana"
            onClick={() => openModal("Dana")}
          />
        </div>
      </div>
      {isModalOpen && selectedBank === "OVO" && (
        <OvoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedBank={selectedBank}
        />
      )}
      {isModalOpen && selectedBank === "Gopay" && (
        <GoPayModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedBank={selectedBank}
        />
      )}
      {isModalOpen && selectedBank === "ShopeePay" && (
        <ShopeePayModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedBank={selectedBank}
        />
      )}
      {isModalOpen && selectedBank === "Dana" && (
        <DanaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedBank={selectedBank}
        />
      )}
    </section>
  );
}

export default EWalletForm;
