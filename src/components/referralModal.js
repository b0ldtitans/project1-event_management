import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";

export default function Referral() {
  const [code, setCode] = useState("BLANK");

  useEffect(() => {
    const newCode = (Math.random() + 1).toString(36).substring(7);
    setCode(newCode);
    api.post("/referral_codes", {
      code: newCode,
      user_id: user.id,
    });
  }, []);

  const activeEvent = useSelector((state) => state.event.activeEvent);
  const user = useSelector((state) => state.user.user);

  return (
    <div className="text-white gap-5 flex flex-col w-full justify-center items-center mt-[25%]">
      <h2 className="text-3xl">
        Congratulations, you have registered for {activeEvent.eventName}
      </h2>
      <p className="text-2xl">Your referral code is {code}</p>
      <p className="text-2xl">Share it with your friends:</p>
      <div className="flex gap-10">
        <a
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?u=My%20referral%20code%20is%20${code}.%20Use%20it%20to%20sign%20up%20for%20interesting%20events%20on%20the%20Purwadhika%20events%20site!`}
        >
          <img
            className="w-[50px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
          ></img>
        </a>
        <a
          target="_blank"
          href={`https://wa.me/?text=My%20referral%20code%20is%20${code}.%20Use%20it%20to%20sign%20up%20for%20interesting%20events%20on%20the%20Purwadhika%20events%20site!`}
        >
          <img
            className="w-[50px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png"
          ></img>
        </a>
        <a
          target="_blank"
          href={`http://twitter.com/share?text=My%20referral%20code%20is%20${code}.%20Use%20it%20to%20sign%20up%20for%20interesting%20events%20on%20the%20Purwadhika%20events%20site!`}
        >
          <img
            className="w-[50px]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFKQ_iQeCIVeiUzl8Q5fYEDs_RqZa7toIA5Qsi8jtgQ&s"
          ></img>
        </a>
      </div>
    </div>
  );
}
