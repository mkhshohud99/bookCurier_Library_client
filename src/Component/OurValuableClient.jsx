import React from 'react';
import img1 from './../assets/img/icons/customers.png'
import img2 from './../assets/img/icons/email.png'
import img3 from './../assets/img/icons/projects.png'
import img4 from './../assets/img/icons/ribon.png'

const OurValuableClient = () => {
    return (
        <div>
            <div className='px-4 py-5'>
                <h3 className="flex justify-center font-bold text-3xl ">Our Clients</h3>
                <p className='flex justify-center'>There are many variations of passages of  available, but the majority have suffered
                    alteration.</p>
            </div>

            <div className='flex justify-between px-10 py-2'>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
                
            </div>

            <div className="facts">
                <h3 className="flex justify-center font-bold text-3xl mt-10">Some Facts</h3>
                <p className='flex justify-center m-5'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                    alteration.</p>
                <div className="flex justify-between px-10 py-2 mb-10">
                    <div class="flex justify-center items-center flex-col border-2 p-5 hover:bg-sky-500">
                        <h4 className="fact-title">590</h4>
                        <p>Clients Worked</p>
                        <img src={img1} alt="" srcset="" />
                    </div>
                    <div class="flex justify-center items-center flex-col border-2 p-5 hover:bg-sky-500">
                        <h4 class="fact-title">22578</h4>
                        <p>Email Send</p>
                        <img src={img2} alt="" srcset="" />
                    </div>
                    <div class="flex justify-center items-center flex-col border-2 p-5 hover:bg-sky-500">
                        <h4 className="fact-title">1458</h4>
                        <p>Project Finished</p>
                        <img src={img3} alt="" srcset="" />
                    </div>
                    <div class="flex justify-center items-center flex-col border-2 p-5 hover:bg-sky-500">
                        <h4 className="fact-title">54</h4>
                        <p>Awards Winnings</p>
                        <img src={img4} alt="" srcset="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurValuableClient;