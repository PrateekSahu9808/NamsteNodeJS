import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("prateek@gmail.com");
  const [password, setPassword] = useState("prateek@S08");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setShowToast(true); // Show toast
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error?.response?.data?.error);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Login successful!</span>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div className="p-8 flex gap-4 flex-col">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Enter Email here"
                className="input input-bordered w-full max-w-xs"
                onChange={e => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Enter Password here"
                className="input input-bordered w-full max-w-xs"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="text-red-500">{error}</div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
