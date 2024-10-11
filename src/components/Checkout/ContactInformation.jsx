import React, { useState, useEffect } from 'react';

// List of countries with their corresponding country codes
const countries = [
  { name: "United States", code: "+1" },
  { name: "Canada", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "India", code: "+91" },
  { name: "Japan", code: "+81" },
  { name: "China", code: "+86" },
  { name: "Brazil", code: "+55" },
  { name: "Bangladesh", code: "+880" },
  { name: "Pakistan", code: "+92" },
  { name: "South Africa", code: "+27" },
  { name: "Russia", code: "+7" },
  // Add more countries and codes here as needed...
];

const ContactInformation = ({ onCustomerInfoChange }) => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    countryCode: '',
  });

  useEffect(() => {
    onCustomerInfoChange(contactInfo);
  }, [contactInfo, onCustomerInfoChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(country => country.name === e.target.value);
    setContactInfo((prev) => ({
      ...prev,
      country: selectedCountry ? selectedCountry.name : '',
      countryCode: selectedCountry ? selectedCountry.code : ''
    }));
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md mb-6">
      <h1 className="text-2xl font-bold mb-4">Contact Information</h1>

      <div className="mb-4">
        <input
          className="w-full p-2 border-b-2 border-gray-300 outline-none"
          type="text"
          name="email"
          placeholder="Email"
          value={contactInfo.email}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={contactInfo.firstName}
          onChange={handleChange}
        />
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={contactInfo.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          name="address"
          placeholder="Address"
          value={contactInfo.address}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="text"
          name="city"
          placeholder="City"
          value={contactInfo.city}
          onChange={handleChange}
        />
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={contactInfo.postalCode}
          onChange={handleChange}
        />
      </div>

      {/* Country Dropdown */}
      <div className="mb-4">
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          name="country"
          value={contactInfo.country}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Phone number with country code */}
      <div className="mb-4 flex">
        <input
          className="p-2 border border-gray-300 rounded-md w-1/4 mr-2"
          type="text"
          name="countryCode"
          value={contactInfo.countryCode}
          readOnly
          placeholder="Code"
        />
        <input
          className="w-3/4 p-2 border border-gray-300 rounded-md"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={contactInfo.phoneNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ContactInformation;
