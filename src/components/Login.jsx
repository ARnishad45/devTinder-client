import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("mark69@gmail.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data.data);
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "An unexpected error occurred");// fix the validations 
      // console.error(err);
    }
  };

  const handelSignUp = async () => {
    try {

      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        email,  
        password,
        phoneNumber
      }, { withCredentials: true });

      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile");

    } catch (err) {
      setError(err?.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <>

      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="w-full p-6 bg-base-300 border-t-4 border-gray-300 rounded-md shadow-md border-top lg:max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-300">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form className="space-y-4">
            {
              <>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Email</span>
                  </label>
                  <input type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email Address" className="w-full input input-bordered" />
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Password</span>
                  </label>
                  <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter Password" className="w-full input input-bordered" />
                </div>
              </>
            }

            {
              !isLogin &&
              <>
                <div>
                  <label className="label">
                    <span className="text-base label-text">First Name</span>
                  </label>
                  <input type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder="First Name" className="w-full input input-bordered" />
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Last Name</span>
                  </label>
                  <input type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Enter Password" className="w-full input input-bordered" />
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Phone Number</span>
                  </label>
                  <input type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    placeholder="Phone Number" className="w-full input input-bordered" />
                </div>
              </>
            }

            <div>
              <button className="btn btn-block btn-primary" onClick={(e) => {
                e.preventDefault(); 
                isLogin ? handelLogin() : handelSignUp();
              }}
              >{isLogin ? "Login" : "Sign Up"}</button>
            </div>

            <p className="text-s text-center text-gray-400 hover:text-blue-500 " onClick={() => setIsLogin((value) => !value)}>{isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
