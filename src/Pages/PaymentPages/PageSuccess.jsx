import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PageSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        axiosSecure.post(`/success-payment?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data);
            
        })
    },[axiosSecure, sessionId])

    return (
        <div className='flex justify-center items-center'>
            Your Payment Received
            Thank You!!!!!
        </div>
    );
};

export default PageSuccess;