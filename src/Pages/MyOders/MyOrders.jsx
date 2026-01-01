import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import useAxios from '../../hooks/useAxios';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const axiosSecure = useAxiosSecure()
    const axiosInstance = useAxios();
    useEffect(() => {
        axiosSecure.get(`/my-orders/${user?.email}`)
            .then(res => {
                setOrders(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosSecure, user])
    const handlePayment = (id) => {
        // e.preventDefault();
        const orderItem = orders.find(order=>order._id == id)
        const price = orderItem.price;
        const customerEmail = orderItem.customerEmail;
        const customerName = user?.displayName;

        const formData = {
            price,
            customerEmail,
            customerName,
        }

        axiosInstance.post('/create-payment', formData)
        .then(res=>{
            window.location.href = res.data.url;
            console.log(res.data)
        })

    }

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
                            {/* <th>Customer's E-mail</th> */}
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
                                    {/* <td>{order.email}</td> */}
                                    <th className='flex gap-4'>
                                        <button onClick={()=>handlePayment(order._id)} className="btn btn-primary btn-xs">Payment</button>
                                        <button className="btn btn-error btn-xs">Delete</button>
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

export default MyOrders;