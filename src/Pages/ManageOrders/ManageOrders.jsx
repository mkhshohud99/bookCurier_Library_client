import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageOrders = () => {


    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/orders/${user?.email}`)
            .then(res => {
                setOrders(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosSecure, user])

    // console.log(books);



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
                            <th>Customer's E-mail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order =>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={order.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                            <div>
                                                <div className="font-bold">{order.name}</div>
                                            </div>

                                    </td>
                                    <td>
                                        {order.author}
                                    </td>
                                    <td>{order.status}</td>
                                    <td>{order.price}</td>
                                    <td>{order.email}</td>
                                    <th>
                                        <button className="btn btn-error btn-xs">Placed</button>
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

export default ManageOrders;