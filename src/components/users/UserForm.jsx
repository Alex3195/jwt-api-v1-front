import NavigationBar from "../../layouts/navigation-bar/NavigationBar";
import { useState, useEffect } from "react";
import User from "../../model/User";
import UserService from "../../services/UserService";
import { useNavigate, useLocation } from "react-router-dom";
export default function UserForm(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        username: '',
        password: '',
        submitted: false,
        role: '',
    });
    useEffect(() => {
        if (location.state) {
            if (location.state.id) {
                UserService.getUserById(location.state.id).then(res => {
                    let user = res.data;
                    document.getElementById('id').value = user.id;
                    document.getElementById("username").value = user.username;
                    document.getElementById("password").value = user.password;
                    document.getElementById("role").value = user.role;

                    setFormValue({ username: user.username, password: user.password, role: user.role })
                }).catch(error => {
                    console.log(error);
                })
            }
        }

    },[])
    const handleChange = (e) => {
            console.log('onchange');
        const { name, value } = e.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("called submit");
        setFormValue({ submitted: true })

        const username = formValue.username !== undefined ? formValue.username : document.getElementById("username").value;
        const password = formValue.password !== undefined ? formValue.password : document.getElementById("password").value;
        const role = formValue.role !== undefined ? formValue.role : document.getElementById("role").value;

        const user: User = {
            username: username,
            password: password,
            role: role,
        }
        if(location.state){
            UserService.update(user).then(res => {
                navigate("/user");
            }).catch(error => {
                console.log(error);
            })
        }else{
            UserService.save(user).then(res => {
                navigate("/user");
            }).catch(error => {
                console.log(error);
            })
        }
        console.log(user)
    }
    return (
        <>
            <NavigationBar />
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">{props.title}</h5>
                    </div>
                    <div className="card-body">
                        <form className="form">
                            <input type={"hidden"} id="id" />
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">User name</label>
                                <input onChange={handleChange} name="username" autoComplete="false" type="text" id="username" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input onChange={handleChange} id="password" autoComplete="new-password" type="password" name="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select onChange={handleChange} name="role" id="role" className="form-control">
                                    <option value={"EMPTY"}></option>
                                    <option value={"ADMIN"}>Admin</option>
                                    <option value={"CUSTOMER"}>Customer</option>
                                    <option value={"USER"}>User</option>
                                </select>
                            </div>
                            <div className="mb-3 ">
                                <button onClick={handleSubmit} className="btn btn-lg btn-block btn-success float-end">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}