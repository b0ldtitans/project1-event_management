import { useDispatch, useSelector } from "react-redux";
import { setModalContent } from "../features/modal/modalSlice";
import api from "../api";
import { useNavigate } from "react-router-dom";

function validateForm() {
  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");

  let isValid = true;

  if (!nameValue.trim()) {
    nameError.textContent = "Name is required!";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  if (!emailValue.trim()) {
    emailError.textContent = "Email is required!";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  return isValid;
}

export default function Register() {
  const activeEvent = useSelector((state) => state.event.activeEvent);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function registerForEvent(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const referralCode = document.getElementById("referral_code").value;

    if (referralCode) {
      const referralCodes = await api.get("/referral_codes");

      const referral = referralCodes.data.find(
        (code) => code.code === referralCode
      );

      if (!referral) {
        alert("Invalid referral code");
        return;
      }

      if (referral.user_id === user.id) {
        alert("Cannot use your own referral code!");
        return;
      }
      try {
        const userWhoCreatedReferral = await api.get(
          `/users/${referral.user_id}`
        );

        await api.patch(`/users/${referral.user_id}`, {
          points: userWhoCreatedReferral.data.points + 10,
        });

        await api.patch(`/users/${user.id}`, {
          points: user.points + 10,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, points: user.points + 10 })
        );
      } catch {
        alert("Failed to create referral coe");
      }
    }

    dispatch(setModalContent("referral"));
    navigate(`/checkout/${activeEvent.eventId}`);
  }

  return (
    <div class="flex flex-col items-center lg:h-[70%] mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-black">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-orange-900 md:text-2xl dark:text-white">
            Register for {activeEvent.eventName}
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Christina"
                class="bg-orange-50 border border-orange-300 text-orange-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="true"
              />
              <span id="nameError" class="text-red-500 text-xs"></span>
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
              >
                Your email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-orange-50 border border-orange-300 text-orange-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required="true"
              />
              <span id="emailError" class="text-red-500 text-xs"></span>
            </div>

            <div>
              <label
                for="referral_code"
                class="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
              >
                Referral code
              </label>
              <input
                type="text"
                name="referral_code"
                id="referral_code"
                class="bg-orange-50 border border-orange-300 text-orange-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="12345"
                required=""
              />
            </div>

            <button
              onClick={registerForEvent}
              class="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
