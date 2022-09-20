import React from 'react'
import Header from '../../../component/Header'
import GroupMainView from './MainView'
export default function AddGroupView() {
    return (
        <div style={{ margin: "30px" }}>
            <Header title='组织新团队' explain='选择员工以组成新的部门团队,添加前请仔细确认一致' />
            <GroupMainView />
        </div>
    )

}