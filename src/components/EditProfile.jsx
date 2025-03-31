import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./userCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

// make about text area
// make gender dropdown
// add phone number with dropdown
// enhance ui as much as possible

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //Clear Error
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          gender,
          age,
          photoUrl,
          //   skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-10">
        <div className="flex justify-center my-32">
          <div className="card bg-base-200 text-neutral-content w-96">
            <div className="card-body items-center text-center">
              <h1 className="card-title">Edit Profile</h1>
              <label className="input validator">
                <input
                  type="string"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>

              <label className="input validator">
                <input
                  type="string"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>

              <label className="input validator">
                <input
                  type="string"
                  placeholder="Photo Url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  required
                />
              </label>

              <label className="input validator">
                <input
                  type="string"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </label>

              <label className="input validator">
                <input
                  type="string"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </label>

              <label className="input validator">
                <input
                  type="string"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                />
              </label>

              <p className="text-red-500 ">{error}</p>
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, about, photoUrl, age, gender }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
