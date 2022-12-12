import React, { useState } from 'react'
import ShowGroupView from './showGroupView'
import EditGroup from './editGroupView'

export default function EditGroupView() {
    const [isedit, setEdit] = useState(false)
    const changeEdit = (edit: boolean) => {
        setEdit(edit)
    }

    return (
        <div>
            <div style={{ display: isedit ? "none" : "block" }}>
                <ShowGroupView change={changeEdit} />
            </div>
            <div style={{ display: isedit ? "block" : "none" }}>
                <EditGroup change={changeEdit} />
            </div>
        </div>
    )

}