import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DeleteDepartmentView() {

    return (

        <div style={{ margin: "30px" }}>
            <Outlet />
        </div>
    )

}