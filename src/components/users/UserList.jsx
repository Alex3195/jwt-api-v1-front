import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import UserService from '../../services/UserService';
import { useEffect, useState } from 'react';
import NavigationBar from '../../layouts/navigation-bar/NavigationBar';
import { useNavigate } from 'react-router-dom';

export default function UserList() {
    let navigate = useNavigate();
    const [users, setUser] = useState([]);
    useEffect(() => {
        UserService.getUsers().then((res) => {
            setUser(res.data)
        });
    }, [])

    const editUser = (id) => {
        let url = "/user/" + id;
        navigate(url, {state:{id:id}});
        console.log(url);
        // navigate(url);
    }
    const deleteUser = (id) => {
        console.log(id, "delete function");
    }
    const addUser = () => {
        navigate("/user/add");
    }

    return (
        <>
            <NavigationBar />
            <div className='container'>
                <div className="card">
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col col-md-6'>
                                <h5 className='card-title'>Users</h5>
                            </div>
                            <div className='col col-md-5'>
                                <button onClick={() => addUser()} className='btn btn-block btn-primary float-end'><i className='bi bi-plus-circle'><span className='badge bg-secondary"'>Add user</span></i></button>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User name</th>
                                    <th>Role</th>
                                    <th style={{ width: '200px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.role}</td>
                                            <td>

                                                <div className='row'>
                                                    <div className='col col-sm-3'>
                                                        <button type='button' onClick={() => editUser(item.id)} className='btn btn-warning'><i className="bi bi-pen"></i></button>
                                                    </div>
                                                    <div className='col col-sm-3'>
                                                        <button type='button' onClick={() => deleteUser(item.id)} className='btn btn-danger'><i className="bi bi-trash"></i></button>
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}