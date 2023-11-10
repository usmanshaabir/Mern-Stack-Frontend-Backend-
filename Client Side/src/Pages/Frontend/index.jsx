import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserData from './UserData'
import AddData from './AddData'

export default function index() {
    return (
        <>
            <Routes>
                <Route index element={<UserData />} />
                <Route path='addUser' element={<AddData />} />
            </Routes>
        </>
    )
}
