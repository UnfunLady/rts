import React, { useEffect, useState } from 'react'
import Header from '../../../../component/Header'
import MainView from './MainView'
import { initIndexData, getDeptInfo } from '../../../../type/employeSalary'
export default function SalaryIndexView() {
    const [data, setData] = useState(new initIndexData())
    useEffect(() => {
        getDeptInfo(data, setData)

    }, [])
    return (
        <div style={{ margin: "20px" }}>
            <div className="Header">
                <Header title="薪资管理说明" explain="薪资一般为无责任底薪+完成绩效的百分比以及各种补贴的总和" />
            </div>
            <div className="MainView" style={{ marginTop: "50px" }}>
                <MainView deptList={data.initIndexData.deptList} />
            </div>
        </div>
    )

}