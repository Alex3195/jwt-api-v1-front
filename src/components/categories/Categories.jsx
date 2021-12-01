import NavigationBar from "../../layouts/navigation-bar/NavigationBar";
import { useEffect, useState } from "react";
import CategoryService from "../../services/CategoryService";
import {
    TreeGridComponent, ColumnsDirective, ColumnDirective,
    Inject, Page, Sort, Filter
} from "@syncfusion/ej2-react-treegrid";
import './index.css';
const arrayChild = [];
export default function Categories() {
    const [data, setData] = useState([]);
    function addCategories() {
        console.log("cld addCategory");
    }
    function getChildData(list) {
        list.map((item) => {
            if (item.children) {
                if (item.level > 0) {
                    item.id = item.id.toString
                    arrayChild.push(item)
                }
                return getChildData(item.children);
            }
            return item;
        })
        return arrayChild;


    }

    useEffect(() => {
        CategoryService.getCategories().then((response) => {
            let array = [];
            let dataObj = getChildData(response.data);
            dataObj.forEach((item, index) => {
                array.push([{ ...item, children: item.children }])
            })
            console.log(array);
            setData(dataObj)
        }).catch((error) => {
            console.log(error);
        })
    })
    return (
        <>
            <NavigationBar />
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col col-md-6">
                                <h5 className="card-title">Categories</h5>
                            </div>
                            <div className="col col-md-5">
                                <button onClick={addCategories()} className="btn btn-md btn-block btn-primary float-end"><i className='bi bi-plus-circle'><span className='badge bg-secondary"'>Add category</span></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <TreeGridComponent dataSource={data}
                            childMapping="children"
                            children={data.children}
                            treeColumnIndex={1}
                            allowPaging={true}
                            allowSorting={true}
                            allowFiltering={true}>
                            <Inject services={[Page, Sort, Filter]} />
                            <ColumnsDirective>
                                <ColumnDirective field="name" headerText="Name">
                                </ColumnDirective>
                                <ColumnDirective field="example" headerText="Example">
                                </ColumnDirective>
                                <ColumnDirective field="description" headerText="Description">
                                </ColumnDirective>
                            </ColumnsDirective>
                        </TreeGridComponent>
                    </div>
                </div>
            </div>
        </>
    )
}