import React, { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router-dom';
import { addToDB } from '../../Component/Utillity/addToDb';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const AB = () => {

    const { user, } = useContext(AuthContext)
    const axiosInstance = useAxios()
    const [search, setSearch] = useState('');

    const handleAddBook = (id) => {
        addToDB(id)
    }

    const { data: books = [] } = useQuery({
        queryKey: ['books', search, user?.email],

       

        queryFn: async () => {
            const res = await axiosInstance.get(`/all-books?search=${search}`);
            return res.data;
        }
    })

  

    return (
        <div className="text-white mt-5">
            <div className='flex justify-between mx-10'>
                <h3>Total books: {books.length}</h3>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    className='px-5 border-2 rounded-2xl'
                    type='text'
                    placeholder='Search here'
                />
            </div>

            <div className='grid grid-cols-3 gap-5 mx-10 my-5'>
                {
                    books.map(book =>
                        <div key={book._id} className="card bg-base-100 w-96 shadow-sm">
                            <figure>
                                <img className='h-[300px]' src={book.image} alt="Books" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{book.name}</h2>
                                <h2 className='font-bold'>{book.author}</h2>

                                <div className="card-actions flex justify-between">
                                    <button
                                        onClick={() => handleAddBook(book._id)}
                                        className="btn btn-success">
                                        Add to Wishlist
                                    </button>

                                    <Link to={`/books/id/${book._id}`}>
                                        <button className="btn btn-primary">
                                            Order Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AB;