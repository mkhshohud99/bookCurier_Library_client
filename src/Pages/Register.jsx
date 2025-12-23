import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../firebase/firebase.config';
import toast from 'react-hot-toast';
// import { FcGoogle } from "react-icons/fc";

const Register = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { registerWithEmailAndPassword, setUser, /* handleGoogleSignin */ } = useContext(AuthContext);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;
        const role = e.target.role.value;
        const photoUrl = e.target.photoUrl;
        const file = photoUrl.files[0]

        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        if (pass.length < 6) {
            return alert('Password must have 6 letter');
        }
        if (!upperCase.test(pass)) {
            return alert('Password must have Uppercase letter');
        }
        if (!lowerCase.test(pass)) {
            return alert('Password must have Lowercase letter');
        }

        const res = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=5a45477102df111cb02a4e4abd8e3b88`, { image: file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })


        const imgURL = res.data.data.display_url

        const formData = {
            email,
            pass,
            name,
            imgURL,
            role

        }


        if (res.data.success == true) {
            registerWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: imgURL
                    }).then(() => {
                        console.log(auth.currentUser);

                        axios.post('http://localhost:5000/users', formData)
                            .then(res => {
                                console.log(res.data);
                            }).catch((err) => {
                                console.log(err);

                            })
                        setUser(userCredential.user)
                        toast.success('Account Created Successfully!')
                        navigate(location.state == '/signup' ? '/' : location.state)
                    }).catch((err) => {
                        console.log(err)
                    });
                })
                .catch((err) => {
                    console.log(err)
                });
        }

    }

    // const googleSignin=()=>{
    //     handleGoogleSignin()
    //     .then((result) => {
    //             const user = result.user;
    //             setUser(user);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit} className="fieldset">
                            <label className="label">Name</label>
                            <input name='name' type="text" className="input" placeholder="Your full Name" />
                            <label className="label">Email</label>
                            <input name='email' type="email" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input name='password' type="password" className="input" placeholder="Password" />
                            <label className="label">Photo URL</label>
                            <input name='photoUrl' type="file" className="input" placeholder="Past Photo URL" />
                            <select name='role' defaultValue="Choose your role" className="select">
                                <option disabled={true}>Choose Your Role</option>
                                <option value='seller'>Seller</option>
                                <option value='buyer'>Buyer</option>
                            </select>
                            <div><Link to="/forgetPass" className="link link-hover">Forgot password?</Link></div>
                            {/* <button onClick={googleSignin} className="btn"><FcGoogle /> Signup with google</button> */}
                            <div><span>Already have an account?</span> <Link className='text-blue-500' to={'/login'}>Login</Link></div>
                            <button className="btn btn-neutral mt-4">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;