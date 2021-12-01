import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from '../../services/UserService.js';
import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LongFunComp() {
    let navigate = useNavigate();
    
    const [formValue, setFormValue] = useState({
        username: '',
        password: '',
        submitted: false,
        message: "",
        messageType: "",
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };
    function handleSubmit(e) {
        e.preventDefault()
        setFormValue({ submitted: true })
        const username = formValue.username;
        const password = formValue.password;
        console.log('cll',formValue.username,formValue.password);
        console.log(username,password);
        if (username && password) {
            UserService.checkLogin(username, password).then(res => {

                localStorage.setItem("token", JSON.stringify(res.data))
                localStorage.setItem("isAuthorized", true);
                console.log('called');
                navigate('user');
                

            }).catch((error) => {
                this.setState({
                    message: "Invalid username or password.",
                    messageType: "error"
                })
            })
        }
    }

    return (
        <>
            <div className="bg-img">
                <div className='div-center'>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Login</h5>
                        </div>
                        <div className="card-body">
                            <form id="login-form">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">User name</label>
                                    <input onChange={handleChange} id="username" name="username" className="form-control" type="text" placeholder="Please enter username" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input onChange={handleChange} className="form-control" type="password" name="password" id="password" placeholder="Please enter password" />
                                </div>
                            </form>
                        </div>
                        <div className="card-body">
                            <input className='form-check-input' type="checkbox" />

                            <label className="form-check-label" htmlFor="exampleCheck1"> &nbsp; Remember me &nbsp;</label>

                            <label className="forgot-password">
                                <a href="#/"> Forgot?</a>
                            </label>
                        </div>
                        <div className='card-footer'>
                            <button onClick={handleSubmit} className='btn btn-lg btn-block btn-success'>Sign in</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}