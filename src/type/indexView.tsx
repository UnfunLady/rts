import { mainView } from '../api';
import * as echarts from 'echarts';
import { message } from 'antd';
type EChartsOption = echarts.EChartsOption
// 主页数据
export interface mainViewData {
    deptInfo: [],
    DetailData: {
        // 部门总数
        companyDeptCount: number,
        // 小组总数
        companyGroupCount: number,
        // 员工总数
        companyEmployeCount: number,
        // 平均工资
        companyAvgSalary: number,
        // 男生占比
        BoyGrilsPercentage: string,
    },
    showData: Array<Object>
}
export class indexViewDataInit {
    mainViewData: mainViewData = {
        deptInfo: [],
        DetailData: {
            companyDeptCount: 0,
            companyGroupCount: 0,
            companyEmployeCount: 0,
            companyAvgSalary: 0,
            BoyGrilsPercentage: '0%'
        },
        showData: [
            {
                id: 1,
                title: '公司部门数量',
                num: null,
                color: '#ffa352',
            },
            {
                id: 2,
                title: '公司小组数量',
                num: null,
                color: '#791618',
            },
            {
                id: 3,
                title: '公司员工数量',
                num: null,
                color: '#e44a3d',
            },
            {
                id: 4,
                title: '公司平均底薪',
                num: null,
                color: '#333333',
            },
            {
                id: 5,
                title: '公司男性占比',
                num: null,
                color: '#34aa70',
            },
        ]
    }
}

export const getOneChart = async (dom: HTMLElement | null) => {
    const res: any = await mainView.getDeptInfo();
    if (res.code === 200) {
        var chartDom = dom!
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;
        option = {
            title: {
                text: res.title,
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    animationDuration: 2500,
                    name: '单位:人数',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    data: res.deptInfo,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        show: false,
                        position: 'inner',
                        color: 'white',
                    }
                }
            ]
        };
        option && myChart.setOption(option);
    } else {
        message.error('获取数据失败！')
    }
}
export const getTwoChart = async (dom: HTMLElement | null) => {
    const res: any = await mainView.getDeptDetailInfo();
    if (res.code === 200) {
        // 部门名字集合
        const nameData = [] as any[]
        // 平均薪资集合
        const avgData = [] as any[]
        // 部门总人数集合
        const countData = [] as any[]
        // 部门小组数集合
        const groupData = [] as any[]
        res.deptDetailInfo.forEach((item: any) => {
            nameData.push(item.name)
            avgData.push(item.avg)
            countData.push(item.count)
            groupData.push(item.groupCount)
        })
        var chartDom = dom!;
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;
        option = {
            animationDuration: 2500,
            title: {
                text: '各部门细节'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['平均工资', '总人数', '部门小组数']
            },
            grid: {
                left: '3%',
                right: '2%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: nameData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '平均工资',
                    type: 'line',
                    stack: 'Total',
                    data: avgData
                },
                {
                    name: '总人数',
                    type: 'line',
                    stack: 'Total',
                    data: countData
                },
                {
                    name: '部门小组数',
                    type: 'line',
                    stack: 'Total',
                    data: groupData
                },
            ]
        };
        option && myChart.setOption(option);
    } else {
        message.error('获取信息失败!')
    }
}

export const initData = (data: any) => {
    data.mainViewData.showData[0]['num'] = data.mainViewData.DetailData['companyDeptCount']
    data.mainViewData.showData[1]['num'] = data.mainViewData.DetailData['companyGroupCount']
    data.mainViewData.showData[2]['num'] = data.mainViewData.DetailData['companyEmployeCount']
    data.mainViewData.showData[3]['num'] = data.mainViewData.DetailData['companyAvgSalary']
    data.mainViewData.showData[4]['num'] = data.mainViewData.DetailData['BoyGrilsPercentage']
}
export const getCompanyDetail = async (data: indexViewDataInit, setData: Function) => {
    const res: any = await mainView.getDetail()
    if (res.code === 200) {
        data.mainViewData.DetailData = res.detailData
        setData({ ...data })
        initData(data)
    } else {
        message.error('获取信息失败!')
    }

}