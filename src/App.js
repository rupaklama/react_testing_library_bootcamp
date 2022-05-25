import { useState } from "react";
import "./App.css";
import validator from "validator";

function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { email, password, confirmPassword } = form;

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = e => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      return setError("The email you input is invalid.");
    } else if (password.length < 5) {
      return setError("The password you entered should contain 5 or more characters.");
    } else if (password !== confirmPassword) {
      return setError("The passwords don't match. Try again.");
    } else {
      return setError("");
    }
  };

  return (
    <div className="container my-5">
      <form onClick={handleClick}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            name="password"
            className="form-control"
            id="password1"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            className="form-control"
            id="password2"
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
