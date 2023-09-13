import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { City, Country, State } from "country-state-city";
import Selector from "./Selector";

export default function BillingInfo() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  let countryData = Country.getAllCountries();
  const indonesiaCountry = countryData.find(
    (country) => country.name === "Indonesia"
  );
  const [stateData, setStateData] = useState(
    State.getStatesOfCountry(indonesiaCountry?.isoCode)
  );
  const [cityData, setCityData] = useState(
    City.getCitiesOfState(indonesiaCountry?.isoCode)
  );

  const [country, setCountry] = useState(indonesiaCountry);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const billingInfoSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Name is required")
      .min(2, "Tuliskan Nama Lenkap Anda"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Please enter a valid"),
    email: Yup.string()
      .required("Email is required")
      .email("Tuliskan E-Mail Valid"),
    address: Yup.string()
      .required("Address is required")
      .min(5, "Tuliskan Alamat Yang Valid"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^\d{5}$/, "Tuliskan Kode Pos Yang Valid"),
  });

  const formik = Formik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    validationSchema: billingInfoSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        postalCode: "",
      }}
      validationSchema={billingInfoSchema}
      onSubmit={(values) => {
        console.log("Form submitted with values:", values);
      }}
    >
      {(formik) => (
        <Form>
          <div>
            <h1 className="text-xl font-bold">Informasi Pembayaran</h1>
            <h6 className="text-xs">Transaksi Anda Aman dan Terenkripsi</h6>
          </div>
          <div className="flex flex-col mt-5 mx-2 border border-1 p-5 rounded-xl">
            <div className="flex-col flex">
              <label htmlFor="firstName">Nama Lengkap</label>
              <input
                className="shadow-md border border-gray-300 rounded-md p-2 w-full"
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="flex-col flex">
              <label htmlFor="email">Email</label>
              <input
                className="shadow-md border border-gray-300 rounded-md p-2 w-full"
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="flex-col flex">
              <label htmlFor="address">Alamat</label>
              <textarea
                className="shadow-md border border-gray-300 rounded-md"
                type="textarea"
                rows="4"
                cols="50"
                id="address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="error">{formik.errors.address}</div>
              ) : null}
            </div>
            {state && (
              <div className="">
                {" "}
                {/* Set a higher z-index for the province selector */}
                <p className="">Provinsi :</p>
                <Selector
                  className="border border-gray-300 rounded-md p-2 w-full"
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </div>
            )}
            {city && (
              <div className="">
                {" "}
                {/* Set a lower z-index for the city selector */}
                <p className="">Kota :</p>
                <Selector
                  className="border border-gray-300 rounded-md p-2 w-full"
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}

            <div className="flex-col flex">
              <label htmlFor="postalCode">Kode Pos</label>
              <input
                className="shadow-md border border-gray-300 rounded-md p-2 w-full"
                type="text"
                id="postalCode"
                name="postalCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.postalCode && formik.errors.postalCode ? (
                <div className="error">{formik.errors.postalCode}</div>
              ) : null}
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex">
                <input
                  className="p-2 mr-2"
                  type="checkbox"
                  name="tnc"
                  id="tnc"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  required
                />
                <label className="text-sm" htmlFor="tnc">
                  I Agree To The{" "}
                  <a className="text-sm text-orange-600" href="/">
                    {" "}
                    Terms and Condition
                  </a>
                </label>
              </div>
              <div className="flex">
                <input
                  className="p-2 mr-2"
                  type="checkbox"
                  name="newsletter"
                  id="newsletter"
                />
                <label className="text-sm" htmlFor="newsletter">
                  Subscribe To Newsletter
                </label>
              </div>
            </div>

            {acceptedTerms && <PaymentMethodSelector />}
          </div>
        </Form>
      )}
    </Formik>
  );
}
