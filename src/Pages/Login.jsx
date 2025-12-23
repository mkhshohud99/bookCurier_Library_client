import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
// import { FcGoogle } from "react-icons/fc";


const Login = () => {

    const { setUser, /* handleGoogleSignin*/ } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;

        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                navigate(location.state)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // const googleSignin=()=>{
    //     handleGoogleSignin()
    //     .then((result) => {
    //             const user = result.user;
    //             setUser(user);
    //             navigate(location.state)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    const handleForgate=()=>{
        if(!email){
            return navigate(`/forgetPass/examle:a@b.c`)
        }
        return  navigate(`/forgetPass/${email}`)

    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit} className="fieldset">
                            <label className="label">Email</label>
                            <input onChange={(e)=> setEmail(e.target.value)}  name='email' type="email" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input name='password' type="password" className="input" placeholder="Password" />
                            <div><button onClick={handleForgate} className="link link-hover">Forgot password?</button></div>
                            {/* <button onClick={googleSignin} className="btn"><FcGoogle /> Signup with google</button> */}
                            <div><span>Don't have an account?</span> <Link to={'/singup'} className='text-blue-500'>Register</Link></div>
                            <button  className="btn btn-neutral mt-4">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;