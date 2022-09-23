import React, { useState } from 'react'
import ShowDepartment from './ShowDepartment'
import DeleteGroupView from './DeleteGroupView'
import Header from '../../../../component/Header'
export default function MainView() {
    const [isEdit, setEdit] = useState(false)
    const [delGroupInfo, setGroupInfo] = useState({})

    const changeEdit = (edit: boolean, record?: any) => {
        setEdit(edit)
        setGroupInfo(record)
    }
    return (

        <div>
            <Header title='解散部门或小组' explain='该操作将解散已有的部门或小组,请谨慎操作并确保部门及小组已经无员工,否则将清除原有的员工信息' />
            <br />
            {
                !isEdit ? <ShowDepartment change={changeEdit} /> : <DeleteGroupView change={changeEdit} GroupInfo={delGroupInfo} />
            }

        </div>
    )

}