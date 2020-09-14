import { auth } from './firebase';
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        console.log("Clicked signin");
        console.log("email: " + email)
        console.log("password: " + password)

        //firebase magic
        auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log("Auth", auth);
            if(auth) {
                history.push('/');
            }
        })
        .catch(err => alert(err.message));
    }
    

    const register = (e) => {
        e.preventDefault();
        console.log("Clicked Register");

        //firebase magic
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(auth);
            if (auth) {
                history.push('/');
            }
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    return (
        <div className="login">
            <div className="login_container">
                <Link to="/">
                    <img 
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png" 
                    alt="Amazon logo"
                    />
                </Link>

                <div className="login_form">
                    <form action="">
                        <h1 className="login__title">Sign-in</h1>
                        <label htmlFor="email">E-mail</label>
                        <input type="text" className="email" value={email} onChange={e => setEmail(e.target.value)}/>

                        <label htmlFor="password">Password</label>
                        <input type="password" className="password" value={password} onChange={e => setPassword(e.target.value)}/>

                        <button className="login__signIn" type="submit" onClick={signIn}>Sign-in</button>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        
                        <button className="login__register" type="submit" onClick={register}>Create your Amazon Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;