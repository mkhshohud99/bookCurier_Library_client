import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { addToDB } from '../../Component/Utillity/addToDb';

const AB = () => {
    const { user } = useContext(AuthContext)
    const [books, setBooks] = useState([])
    const axiosSecure = useAxiosSecure()

    const [search , setSerch] = useState('');
    const filteredItem = books.filter((item) => `${item.name}`.toLowerCase().includes(search.toLowerCase()))

    // console.log(filteredItem);

    const handleAddBook=(id)=>{
        addToDB(id)
    }

    useEffect(() => {
        axiosSecure.get(`/all-books`)
            .then(res => {
                setBooks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosSecure, user])

    return (
        <div className="text-white mt-5">
            <div className='flex justify-between mx-10'>
                <div>
                    <h3 className='text-white font-bold'>Total books: {filteredItem.length}</h3>
                </div>
                <div>
                    <input className=' font-bold px-5 border-2 rounded-2xl' onChange={(e)=> setSerch(e.target.value)} type='text' placeholder='Search here'></input>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-5 mx-10 my-5 contain-content'>
                {
                    filteredItem.map(book =>
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
                                <div className="card-actions flex justify-between">
                                    <Link onClick={()=>handleAddBook(`${book?._id}`)}><button className="btn btn-success">Add to Wishlist</button></Link>
                                    <Link to={`/books/id/${book?._id}`}><button className="btn btn-primary">Order Now</button></Link>

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