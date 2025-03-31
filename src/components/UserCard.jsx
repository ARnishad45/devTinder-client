import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, gender, age, photoUrl, skills
  } = user;
  const dispatch = useDispatch();

  const handelSendRequest = async (status, userId) => {
    try {
      console.log(userId);
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });

      dispatch(removeUserFromFeed(userId));

    } catch (err) {
      console.error(err);
    };
  };


  return (
    <>
      <div className="card bg-base-300 w-96 shadow-md">
        <figure>
          <img
            src={photoUrl}
            alt="user photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>
            {age + ", " + gender}
          </p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4 gap-2">
            <button className="btn btn-secondary" onClick={() => handelSendRequest("interested", _id)}>Interested </button>

            <button className="btn btn-primary" onClick={() => handelSendRequest("ignored", _id)}>Ignore </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
