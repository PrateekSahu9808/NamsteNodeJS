import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center align-middle my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div className="p-8 flex gap-4 flex-col">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Enter Email here "
                class="input input-bordered w-full max-w-xs"
                onChange={e => setEmailId(e.target.value)}
              />
            </label>
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                placeholder="Enter Password here "
                class="input input-bordered w-full max-w-xs"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </div>

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
