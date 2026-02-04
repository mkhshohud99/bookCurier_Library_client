import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([])
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) return;
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }, [axiosSecure, user])
    console.log(users);


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name of Book</th>
                            <th>Name Of Author</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.imgURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>

                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">Edit</button>
                                        <button className="btn btn-error btn-xs">Block</button>
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;