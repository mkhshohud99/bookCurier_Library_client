import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../firebase/firebase.config';
import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios';

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { registerWithEmailAndPassword, setUser } = useContext(AuthContext);
    const axiosInstance = useAxios(); // ✅ Hook MUST be here

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;
        const role = e.target.role.value;
        const file = e.target.photoUrl.files[0];

        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;

        if (pass.length < 6) {
            return toast.error('Password must have 6 characters');
        }
        if (!upperCase.test(pass)) {
            return toast.error('Password must have an uppercase letter');
        }
        if (!lowerCase.test(pass)) {
            return toast.error('Password must have a lowercase letter');
        }

        try {

            // ✅ IMG UPLOAD START
            const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
            const url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

            const formDataImg = new FormData();
            formDataImg.append("image", file);

            const imgRes = await axios.post(url, formDataImg);

            if (imgRes.data.success !== true) {
                return toast.error("Image Upload Failed!");
            }

            const imgURL = imgRes.data.data.display_url;
            // ✅ IMG UPLOAD END


            // ✅ FIREBASE REGISTER
            const userCredential = await registerWithEmailAndPassword(email, pass);

            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: imgURL
            });

            const userData = {
                email,
                name,
                imgURL,
                role
            };

            await axiosInstance.post('/users', userData);

            setUser(userCredential.user);
            toast.success('Account Created Successfully!');

            navigate(location.state ? location.state : "/");

        } catch (err) {
            console.log(err);
            toast.error("Registration Failed!");
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit} className="fieldset">

                            <label className="label">Name</label>
                            <input name='name' type="text" className="input" placeholder="Your full Name" required />

                            <label className="label">Email</label>
                            <input name='email' type="email" className="input" placeholder="Email" required />

                            <label className="label">Password</label>
                            <input name='password' type="password" className="input" placeholder="Password" required />

                            <label className="label">Photo</label>
                            <input name='photoUrl' type="file" className="input" required />

                            <select name='role' defaultValue="Choose your role" className="select" required>
                                <option disabled>Choose Your Role</option>
                                <option value='seller'>Seller</option>
                                <option value='buyer'>Buyer</option>
                            </select>

                            <div>
                                <Link to="/forgetPass" className="link link-hover">Forgot password?</Link>
                            </div>

                            <div>
                                <span>Already have an account?</span>
                                <Link className='text-blue-500' to={'/login'}> Login</Link>
                            </div>

                            <button className="btn btn-neutral mt-4">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
