import React from "react";

const AuthInput = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    className="w-full p-3 border border-black rounded-sm placeholder-gray-500"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
  />
);

export default AuthInput;
