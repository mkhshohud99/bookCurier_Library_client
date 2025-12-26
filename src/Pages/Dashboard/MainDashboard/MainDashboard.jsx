import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router';

const MainDashboard = () => {
    const { user } = useContext(AuthContext)
    const [books, setBooks] = useState([])
    const axiosInstance = useAxios();

    const userName = user?.displayName;

    useEffect(() => {
        axiosInstance.get(`/books/${user?.email}`)
            .then(res => {
                setBooks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosInstance, user])
    return (
        <div className="text-white mt-5">
            <h1 className="text-3xl font-bold">Hello, MR/MRS {userName}, here is your all books</h1>
            <div className='grid grid-cols-3 gap-5 mx-10 my-5 contain-content'>
                {
                    books.map(book =>
                        <div key={book._id} className="card bg-base-100 w-96 shadow-sm">
                            <figure>
                                <img className='h-[300px] w-fit'
                                    src={book.image}
                                    alt="Books" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{book.name}</h2>
                                <h2 className='font-bold'>{book.author}</h2>
                                <div className='flex justify-between'>
                                    <button className='font-semibold'>
                                        <span className='text-2xl'>৳</span> {book.price}
                                    </button>
                                    <button>{book.status}</button>
                                </div>
                                {/* <div className="card-actions justify-end">
                                    <Link to={`/books/id/${book?._id}`}><button className="btn btn-primary">Order Now</button></Link>

                                </div> */}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MainDashboard;