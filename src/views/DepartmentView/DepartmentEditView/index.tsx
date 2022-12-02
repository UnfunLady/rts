import React from 'react'
import { Outlet } from 'react-router-dom'
import MainView from './MainView'
import Header from '../../../component/Header'
export default function DepartmentEditView() {
    return (

        <div style={{ margin: "30px" }}>
            <Header title="部门管理" explain="该功能是针对部门的一系列管理操作" />
            <MainView />
            <Outlet />
        </div>
    )

}