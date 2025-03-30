import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true },);
            console.log(res.data.data);
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);


    if (!connections) return;

    if (connections.length === 0) return <h1>No Connections Found!</h1>;

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-2xl text-white'>Connections</h1>

            {connections.map((connection) => {
                const { firstName, lastName, about, gender, age, photoUrl } = connection;

                return (
                    <div key={connection._id}
                        className="m-4 p-4 gap-4 bg-base-300 w-1/2 mx-auto flex rounded-md"
                    >
                        <div><img src={photoUrl} alt="photo" className='w-16 h-16 rounded-full' /></div>

                        <div className="text-left mx-2 ">
                            <h2 className='font-semibold text-l '>{firstName + " " + lastName}</h2>
                            <p>{about}</p>
                            {age && gender && <p>{age + "," + gender}</p>}
                            </div>
                            
                    </div>
                )
            })}

        </div>
    )
}

export default Connections