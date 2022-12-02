import React, { FC, useState } from 'react'
import ShowDepartment from './ShowDepartment'
import EditDepartment from './EditDepartment'
import EditGroupView from './EditGroupView'
import PubSub from 'pubsub-js'
import { editDepartmentDataInit } from '../../../../type/department'
const MainView: FC = () => {
    const [data, setData] = useState(new editDepartmentDataInit())
    // changeEdit属性
    const changeEdit = (edit: boolean, record: any) => {
        data.editDeptData.editDeptData = record
        data.editDeptData.isEdit = edit
        setData({ ...data })
    }
    const changeShow = (edit: boolean) => {
        data.editDeptData = {
            editDeptData: [],
            isEditGroup: false,
            isEdit: edit,
            isUpload: false
        }
        setData({ ...data })
    }
    const changeGroup = (edit: boolean) => {
        data.editDeptData.isEditGroup = edit
        PubSub.publish('editDno', data.editDeptData.editDeptData.dno)
        setData({ ...data })
    }

    return (
        <div style={{ marginTop: "40px" }}>
            <div style={{ display: !data.editDeptData.isEdit && !data.editDeptData.isEditGroup ? "block" : "none" }}>
                <ShowDepartment change={changeEdit} />
            </div>
            <div style={{ display: data.editDeptData.isEdit && !data.editDeptData.isEditGroup ? "block" : "none" }}>
                <EditDepartment editDeptData={data.editDeptData.editDeptData} change={changeShow} changeGroup={changeGroup} />
            </div>
            <div style={{ display: data.editDeptData.isEditGroup ? "block" : "none" }}>
                <EditGroupView />
            </div>
        </div>
    )


}
export default MainView