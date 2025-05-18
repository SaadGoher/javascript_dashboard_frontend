import React from "react";

const InputField = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  required,
}) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
    </div>
  );
};

export default InputField;



{/* <div className="input-group">
<label>Password</label>
<input
  type="password"
  placeholder="••••••••"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
</div> */}