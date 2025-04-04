import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handelLogout = async () => {
    try{
      await axios.post(BASE_URL + '/logout', {}, {withcredentials: true})
      dispatch(removeUser());
      return navigate("/login");
    } catch (err){
      console.error(err);//redirect to error page
    }
  };

  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        { user && (
        <div className="flex">
            <div className="mt-2">Welcome <span className='text-purple-400'>{user.firstName}</span>!</div>
            <div className="dropdown dropdown-end mx-4 flex ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-10 w-42 p-2 shadow"
            >
              <li> 
                <Link to="/profile"  className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handelLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
          )}
      </div>
    </>
  )
}

export default NavBar
