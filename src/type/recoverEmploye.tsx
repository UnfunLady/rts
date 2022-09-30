import { message } from 'antd'
import { recoverEmploye } from '../api'

interface recoverType {
    tableData: Array<any>,
    allRecoverEmploye: Array<any>,
    page: number,
    size: number,
    count: number
}

export class recoverInit {
    recoverData: recoverType = {
        tableData: [],
        allRecoverEmploye: [],
        page: 1,
        size: 8,
        count: 0
    }
}
// 获取删除的员工信息
export const getAllRecoverEmployeByPage = async (data: recoverInit, setData: Function) => {
    const res: any = await recoverEmploye.getRecoverEmployeByPage({ page: data.recoverData.page, size: data.recoverData.size })
    if (res.code === 200) {
        data.recoverData.allRecoverEmploye = res.results
        data.recoverData.count = res.count
        data.recoverData.tableData = data.recoverData.allRecoverEmploye.map((employe: any) => {
            return {
                key: employe.employno,
                ...employe
            }
        })
        setData({ ...data })
    } else {
        message.error('获取信息失败')
    }
}
// 恢复信息
export const confirmRecoverEmploye = async (record: any) => {
    const res: any = await recoverEmploye.reqRecoverEmploye(record);
    if (res.code === 200) {
        message.success('恢复成功！')
        return true
    } else {
        message.error('恢复失败')
        return false
    }
}