import React from "react";

const UserCard = ({user}) => {
  // console.log(user);
  const { firstName, lastName, about, gender, age, photoUrl, skills
  } = user;
  
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
          { age && gender && <p>
            {age + ", " + gender}
          </p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4 gap-2">
            <button className="btn btn-secondary">Interested </button>
            <button className="btn btn-primary">Ignore </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
