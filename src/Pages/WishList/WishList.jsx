import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import { getStoredDB } from '../../Component/Utillity/addToDb';

const WishList = () => {
    const { user } = useContext(AuthContext)
    const [books, setBooks] = useState([])
    const axiosSecure = useAxiosSecure()
    const [list, setList] = useState([])

    useEffect(() => {
        axiosSecure.get(`/all-books`)
            .then(res => {
                setBooks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosSecure, user])

    
    


    useEffect(() => {
        const addedBooks = getStoredDB();
        const addedItem = books.filter(book=> addedBooks.includes(book._id))
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setList(addedItem)

    }, [books])

    console.log(list);

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
                            list.map(order =>
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

export default WishList;