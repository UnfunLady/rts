import { attendanceApi } from "../api"
interface employeLeave {
    employeLeaveData: [],
    editLeaveData: {}
    count: number,
    page: number,
    size: number
}

export class employeLeaveInit {
    employeLeave: employeLeave = {
        employeLeaveData: [],
        editLeaveData: {},
        count: 0,
        page: 1,
        size: 8
    }
}

export const getEmployeLeaveData = async (data: employeLeaveInit, setData: Function) => {
    const res: any = await attendanceApi.reqGetEmployeLeavePage({ page: data.employeLeave.page, size: data.employeLeave.size });
    if (res.code === 200) {
        data.employeLeave.employeLeaveData = res.employeLeaveData;
        data.employeLeave.count = res.count;
        setData({ ...data })
        console.log(data.employeLeave);

    }
}