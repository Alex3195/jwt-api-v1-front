import React from "react"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"
import LoginFunComp from "./auth/LoginFunComponent";
import Categories from "./categories/Categories";
import Group from "./group/Groups";
import UserForm from "./users/UserForm";
import UserList from './users/UserList';


export default function MainApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginFunComp />} />

                <Route path="/user" element={<UserList />} />

                <Route path="/user/:id" element={<UserForm title={"Edit user"} />} />

                <Route path="/user/add" element={<UserForm title={"Add user"} />} />

                <Route path="/categories" element={<Categories />} />

                <Route path="/group" element={<Group />} />
            </Routes>
        </BrowserRouter >
    )
}