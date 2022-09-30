import { message } from 'antd'
import { recoverGroup } from '../api'
interface recoverType {
    tableData: Array<any>,
    allRecoverGroup: Array<any>,
    page: number,
    size: number,
    count: number
}

export class recoverInit {
    recoverData: recoverType = {
        tableData: [],
        allRecoverGroup: [],
        page: 1,
        size: 8,
        count: 0
    }
}

// 获取删除的小组信息
export const getAllRecoverGroupByPage = async (data: recoverInit, setData: Function) => {
    const res: any = await recoverGroup.getRecoverGroupByPage({ page: data.recoverData.page, size: data.recoverData.size })
    if (res.code === 200) {
        data.recoverData.allRecoverGroup = res.results
        data.recoverData.count = res.count
        data.recoverData.tableData = data.recoverData.allRecoverGroup.map((group: any) => {
            return {
                key: group.id,
                ...group
            }
        })
        setData({ ...data })
    } else {
        message.error('获取信息失败')
    }
}

// 恢复删除的小组

export const reqRecoverGroup = async (record: object) => {
    const res: any = await recoverGroup.recoverGroup(record)
    if (res.code === 200) {
        message.success('小组恢复成功')
        return true
    } else {
        message.error('部门恢复失败')
        return false
    }
}