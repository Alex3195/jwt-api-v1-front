import NavigationBar from "../../layouts/navigation-bar/NavigationBar";
import { useEffect, useState } from "react";
import GroupService from "../../services/GroupService";
export default function Group() {
    const [group, setGroup] = useState([]);
    let dataArray = [];
    function getChild(obj) {
        if (!obj.children[0]) {
            dataArray.push(obj.children[0])
            obj.children.map(item=>{
                console.log(item);
            })
            return getChild(obj.children[0])
        }
        return obj;
    }
    useEffect(() => {

        GroupService.getGroups().then(res => {
            setGroup(res.data);
            let obj = getChild(res.data[0]);
            dataArray.push(obj);

        }).catch(error => {
            console.log(error);
        });
            console.log(dataArray,'----');

    },[1])
    return (
        <>
            <NavigationBar />
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col col-md-6">
                                <h5 className="card-title">Groups</h5>
                            </div>
                            <div className="col col-md-6">
                                <button className="btn bnt-block btn-primary float-end"><i className='bi bi-plus-circle'><span className='badge bg-secondary"'>Add group</span></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Example</th>
                                    <th>Description</th>
                                    <th>Children</th>
                                    <th style={{ width: '200px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {group.map((it, index) => {
                                    let obj = it.children[0];
                                    setGroup(it.children)
                                    return (
                                        <tr key={index}>
                                            <td>{it.id}</td>
                                            <td>{it.name}</td>
                                            <td>{it.example}</td>
                                            <td>{it.description}</td>
                                            <td>{obj.name}</td>
                                            <td>
                                                <div className="row">
                                                    <div className="col col-md-3">
                                                        <button className="btn btn-block btn-warning"><i className="bi bi-pen"></i></button>
                                                    </div>
                                                    <div className="col col-md-3">
                                                        <button className="btn btn-block btn-danger"><i className="bi bi-trash"></i></button>
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