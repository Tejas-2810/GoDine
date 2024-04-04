import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./common.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const emailRef = useRef();

  const { getAuthData, isSessionValid } = useAuth();
  const reqCancelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionValid()) {
      navigate(getAuthData()?.role === "user" ? "/" : "/dashboard", {
        replace: true,
      });
    }

    emailRef.current.focus();
  }, []);

  function validateEmailAndSet(e) {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(email)) {
      setValidEmail(true);
      setEmail(email);
    } else {
      setValidEmail(false);
    }
  }

  // handle pending request
  async function handleSubmit(e) {
    e.preventDefault();

    const em = email;
    const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
    const forgot_password_endpoint =
      process.env.REACT_APP_FORGOT_PASSWORD_ENDPOINT ||
      "api/auth/forgotPassword";

    reqCancelRef.current?.abort();
    reqCancelRef.current = new AbortController();

    if (em !== "" && validEmail) {
      const url = `${server_url}/${forgot_password_endpoint}`;
      const data = { email: em };
      const response = await axios
        .post(url, data, { signal: reqCancelRef.current?.signal })
        .then((response) => response)
        .catch((err) => {
          if (axios.isCancel(err)) {
            return err;
          }
          if (axios.isAxiosError(err)) {
            return err.response;
          }
          return err;
        });

      // in case request is aborted
      if (axios.isCancel(response)) {
        console.log("Forgot password aborted");
        return;
      }

      if (
        response.status === 404 ||
        response.status === 200 ||
        response.data.status === "success"
      ) {
        alert("Password reset link may be sent to the email provided");
      } else {
        alert("Please try again after sometime");
      }
      navigate("/signin", { replace: true });
    } else {
      alert("Please enter valid email");
      window.location.reload();
    }
  }

  return (
    <div className="forgot-password-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="card forgot-password-card glass">
              <h1 style={{ color: "#333333" }}>Forgot Password</h1>
              <form>
                <div className="form-group m-1">
                  <label>Enter email</label>
                  <input
                    type="text"
                    ref={emailRef}
                    className="form-control"
                    onInput={validateEmailAndSet}
                  />
                  {validEmail ? null : (
                    <small style={{ color: "red" }}>
                      Please enter valid email
                    </small>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary m-1"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
