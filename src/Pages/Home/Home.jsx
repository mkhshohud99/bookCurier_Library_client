import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Home = () => {
    const [books, setBooks] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/books')
            .then(res => {
                setBooks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosSecure])


    return (
        <div className='grid grid-cols-3 gap-5 mx-10 my-5 contain-content '>
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
                            <div className="card-actions justify-end">
                                <Link to={`/books/id/${book?._id}`}><button className="btn btn-primary">Order Now</button></Link>

                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Home;