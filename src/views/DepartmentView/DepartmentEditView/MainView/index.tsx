import React, { FC, useState } from 'react'
import ShowDepartment from './ShowDepartment'
import EditDepartment from './EditDepartment'
import { editDepartmentDataInit } from '../../../../type/department'
const MainView: FC = () => {
    const [data, setData] = useState(new editDepartmentDataInit())
    // changeEdit属性
    const change = (edit: boolean, record: any) => {
        data.editDeptData.editDeptData = record
        data.editDeptData.isEdit = edit
        setData({ ...data })
    }
    return (
        <div style={{ marginTop: "40px" }}>
            <div style={{ display: data.editDeptData.isEdit ? "none" : "block" }}>
                <ShowDepartment change={change} />
            </div>
            <div style={{ display: data.editDeptData.isEdit ? "block" : "none" }}>
                <EditDepartment editDeptData={data.editDeptData.editDeptData} />
            </div>

        </div>
    )


}
export default MainView