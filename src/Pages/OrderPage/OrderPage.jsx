import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';

const OrderPage = () => {
    const { id } = useParams();
    const {user}= useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [order, setOrder] = useState([])


    useEffect(() => {
        axiosSecure.get(`/books/id/${id}`)
            .then(res => {
                setOrder(res.data);
            }).catch(err => {
                console.log(err)
            })
    }, [axiosSecure, id])



    const { image, name, author, status, price, _id } = order;

     const handelOrder = async () => {

    try {
      const res = await axiosSecure.post('/orders',
        {name: name,
        author: author,
        price: price,
        image: image,
        bookId: _id,
        CustomerEmail: user?.email,}
    );
    console.log(res.data);
      
      if(res.data.acknowledged == true){
        toast.success('Order place Successfully!')
      }

      // optional: reset form
      
    } catch (error) {
      console.error("Failed to add book", error);
    }
  };



    return (
        <div>
            <div className="bg-base-100 shadow-sm flex justify-center gap-10">
                <figure>
                    <img className='h-[500px] w-[500px]:'
                        src={image}
                        alt="image" />
                </figure>
                <div className=" gap-5 flex flex-col justify-center">
                    <h2 className="card-title">{name}</h2>
                    <p className='card-title items-start'>Written By: {author}</p>
                    <p>Ability: {status}</p>
                    <p>Price: {price}</p>
                
                    <div className="card-actions justify-start">
                        <button onClick={() => handelOrder()} className="btn btn-primary">Order Confirm</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderPage;