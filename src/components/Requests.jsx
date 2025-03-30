import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);


    const reviewRequest = async (status, _id) => {
        try {

            const res = await axios.post(BASE_URL + "/request/review/"  + status + "/" + _id, {}, { withCredentials: true });

            dispatch(removeRequest(_id));

        } catch (err) {
            console.error(err);
        }
    };

    const fetchRequests = async () => {
        const res = await axios.get(BASE_URL + "/user/request/recieved", {
            withCredentials: true,
        })
        console.log(res.data.connectionRequest);
        dispatch(addRequests(res.data?.connectionRequest))
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0) return <h1 className='flex justify-center my-10'>No Requests Found!</h1>;

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-2xl text-white'>Requests</h1>

            {requests.map((request) => {
                const { firstName, lastName, about, gender, age, photoUrl } = request.fromUserId;

                return (
                    <div key={request._id}
                        className="m-4 p-4 gap-2 bg-base-300 w-1/2 mx-auto flex rounded-md"
                    >
                        <div><img src={photoUrl} alt="photo" className='w-16 h-16 rounded-full' /></div>

                        <div className="text-left mx-2 ">
                            <h2 className='font-semibold text-l '>{firstName + " " + lastName}</h2>
                            <p>{about}</p>
                            {age && gender && <p>{age + "," + gender}</p>}
                        </div>
                        <div className='ml-auto my-auto'>
                            <button className="btn btn-primary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>

                            <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                        </div>

                    </div>
                )
            })}

        </div>
    )
}

export default Requests