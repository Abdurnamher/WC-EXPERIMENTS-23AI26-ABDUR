import React, { useState } from "react";

/*
 RegistrationForm features:
 - Fields: Full Name, Email, Password, Confirm Password, Phone, Gender, DOB, Address
 - Basic validation: required fields, email format, password length & match, phone digits
 - Saves submitted users to localStorage (key: "users")
 - Shows simple success message after submit
*/

const initial = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  dob: "",
  address: ""
};

export default function RegistrationForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = (values) => {
    const errs = {};
    if (!values.fullName.trim()) errs.fullName = "Full name is required";
    if (!values.email) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Invalid email";
    if (!values.password) errs.password = "Password required";
    else if (values.password.length < 6) errs.password = "At least 6 characters";
    if (values.password !== values.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!values.phone) errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(values.phone)) errs.phone = "Enter 10 digit phone";
    if (!values.gender) errs.gender = "Select gender";
    if (!values.dob) errs.dob = "Select date of birth";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    // save user to localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userToSave = { ...form, id: Date.now() };
    users.push(userToSave);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccessMsg("Registration successful!");
    setForm(initial);
    setErrors({});
    // optionally open console to see saved users: console.log(users)
  };

  return (
    <form className="reg-form" onSubmit={handleSubmit} noValidate>
      {successMsg && <div className="success">{successMsg}</div>}

      <label>
        Full Name
        <input name="fullName" value={form.fullName} onChange={handleChange} />
        {errors.fullName && <small className="err">{errors.fullName}</small>}
      </label>

      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <small className="err">{errors.email}</small>}
      </label>

      <div className="row">
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {errors.password && <small className="err">{errors.password}</small>}
        </label>

        <label>
          Confirm Password
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <small className="err">{errors.confirmPassword}</small>}
        </label>
      </div>

      <div className="row">
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="1234567890" />
          {errors.phone && <small className="err">{errors.phone}</small>}
        </label>

        <label>
          Gender
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <small className="err">{errors.gender}</small>}
        </label>
      </div>

      <label>
        Date of Birth
        <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        {errors.dob && <small className="err">{errors.dob}</small>}
      </label>

      <label>
        Address
        <textarea name="address" value={form.address} onChange={handleChange} rows="3" />
      </label>

      <div className="actions">
        <button type="submit">Register</button>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            setForm(initial);
            setErrors({});
            setSuccessMsg("");
          }}
        >
          Reset
        </button>
      </div>

      <hr />
      <small>Saved users in localStorage (for demo)</small>
    </form>
  );
}
