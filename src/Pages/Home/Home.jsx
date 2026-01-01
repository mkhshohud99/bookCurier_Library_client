import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

const Home = () => {
    const [books, setBooks] = useState([])
    const [totalRequest, setTotalRequest] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(9)
    const [currentPage, setCurrentPage] = useState(1)
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get(`/books?page=${currentPage - 1}&size=${itemPerPage}`)
            .then(res => {
                setBooks(res.data.request)
                setTotalRequest(res.data.totalRequest)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosInstance, currentPage, itemPerPage])

    const numberOfPage = Math.ceil(totalRequest / itemPerPage)
    const pages = [...Array(numberOfPage).keys()].map(e => e + 1)

    const handlePrev = () =>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }
    const handleNext = () =>{
        if(currentPage<pages.length){
            setCurrentPage(currentPage+1)
        }
    }

    console.log(books)
    console.log(totalRequest)
    console.log(pages)

    return (
        <div>
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
                                    <Link to={`/books/id/${book._id}`}><button className="btn btn-primary">Order Now</button></Link>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='flex justify-center my-12 gap-4'>
                <button onClick={handlePrev} className="btn">Prev</button>
                {
                    pages.map(page =>
                        <button className={`btn ${page === currentPage ? 'bg-[#435585] text-white' : ''}`} key={page} onClick={() => setCurrentPage(page)}>
                            {page}
                        </button>
                    )
                }
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default Home;