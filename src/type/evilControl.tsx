import { message } from 'antd'
import { evilControl } from '../api'
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption
// 全国疫情信息
interface chinaInfo {
    title: string,
    allInfo: Array<Object>,
    evilData: any,
    updateTime: number | string,
    echarts: {
        xData: Array<string | number>,
        yData: {
            countData: Array<string | number>,
            moreData: Array<string | number>
        }
    }
}
export class chinaInfoInit {
    chinaInfo: chinaInfo = {
        title: "全国疫情数据(包含港澳台)",
        allInfo: [
            {
                id: 0,
                title: '境外输入',
                color: '#ffa352',
                data: []
            },
            {
                id: 1,
                title: '无症状感染者',
                color: '#791618',
                data: []
            },
            {
                id: 2,
                title: '现有确诊',
                color: '#e44a3d',
                data: []
            },
            {
                id: 3,
                title: '累计确诊',
                color: '#a31d13',
                data: []
            },
            {
                id: 4,
                title: '累计死亡',
                color: '#333333',
                data: []
            },
            {
                id: 5,
                title: '累计治愈',
                color: '#34aa70',
                data: []
            },
        ],
        evilData: {},
        updateTime: "",
        echarts: {
            xData: [],
            yData: {
                countData: [],
                moreData: []
            }
        }
    }
}
// 时间戳转日期
export const timestampToTime = (timestamp: number | string) => {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y: string, M: string, D: string, h: string, m: string, s: string | number;
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() + ''
    return Y + M + D + h + m + s;
}
// echarts
export const chart = (dom: HTMLElement | null, data: chinaInfoInit, setData: Function) => {
    if (dom && dom != null) {
        var myChart = echarts.init(dom);
        var option: EChartsOption;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#7F7D80',
                    },
                    label: {
                        precision: 0
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false, title: "数据展示" },
                    // magicType: { show: true, type: ['bar'] },
                    restore: { show: true },
                }
            },
            legend: {
                data: ['总数', '相较昨日']
            },
            xAxis: [
                {
                    type: 'category',
                    data: data.chinaInfo.echarts.xData,
                    axisPointer: {
                        type: 'shadow'
                    },
                }
            ],
            yAxis: [
                {
                    type: 'log',
                    name: '现存人数',
                    interval: 10000,
                    axisLabel: {
                        formatter: '{value} 人'
                    }
                },
                {
                    type: 'log',
                    name: '相较昨日',
                    interval: 10000,
                    axisLabel: {
                        formatter: '多{value} 人'
                    }
                }
            ],
            series: [
                {
                    name: '总数',
                    type: 'bar',
                    barWidth: 55,
                    tooltip: {
                        valueFormatter: function (value: any) {
                            return value + '人';
                        }
                    },
                    data: data.chinaInfo.echarts.yData.countData
                    , itemStyle: { color: '#ee6666' }
                },
                {
                    name: '相较昨日',
                    type: 'line',
                    yAxisIndex: 1,
                    lineStyle: {
                        // 折线颜色
                        color: '#1F5175',
                    },
                    itemStyle: {
                        // 圆圈颜色
                        color: '#1F5175'
                    },
                    tooltip: {
                        valueFormatter: function (value: any) {
                            return value > 0 ? '+' + value + '人' : value + '人';
                        }
                    },
                    data: data.chinaInfo.echarts.yData.moreData
                }
            ]
        };
        option && myChart.setOption(option);
        setData({ ...data })
    }
    else {
        message.error('获取图表容器失败')
    }
}
// echarts 赋值给x轴数据
const initEchartsxData = (data: chinaInfoInit, setData: Function) => {
    // x轴数据 6个
    data.chinaInfo.allInfo.map((i) => {
        data.chinaInfo.echarts.xData.push(i['title']);
    })
    setData({ ...data })
}
// echarts 赋值给y轴数据
const initEchartsyData = (data: chinaInfoInit, setData: Function) => {
    // y轴数据
    data.chinaInfo.allInfo.map((i) => {
        data.chinaInfo.echarts.yData.countData.push(i['data']['oneNumber'])
        data.chinaInfo.echarts.yData.moreData.push(i['data']['twoNumber'])
    })
    setData({ ...data })
}
// 全国疫情数据数字细节赋值
export const numberInit = (data: chinaInfoInit, setData: Function) => {
    // 设计的有问题只能一个个赋值
    data.chinaInfo.allInfo[0]['data'] = {
        oneNumber: data.chinaInfo.evilData.suspectedCount,
        twoNumber: data.chinaInfo.evilData['suspectedIncr']
    };
    data.chinaInfo.allInfo[1]['data'] = {
        oneNumber: data.chinaInfo.evilData['seriousCount'],
        twoNumber: data.chinaInfo.evilData['seriousIncr']
    };
    data.chinaInfo.allInfo[2]['data'] = {
        oneNumber: data.chinaInfo.evilData['currentConfirmedCount'],
        twoNumber: data.chinaInfo.evilData['currentConfirmedIncr']
    };
    data.chinaInfo.allInfo[3]['data'] = {
        oneNumber: data.chinaInfo.evilData['confirmedCount'],
        twoNumber: data.chinaInfo.evilData['confirmedIncr']
    };
    data.chinaInfo.allInfo[4]['data'] = {
        oneNumber: data.chinaInfo.evilData['deadCount'],
        twoNumber: data.chinaInfo.evilData['deadIncr']
    };
    data.chinaInfo.allInfo[5]['data'] = {
        oneNumber: data.chinaInfo.evilData['curedCount'],
        twoNumber: data.chinaInfo.evilData['curedIncr']
    };
    setData({ ...data })
}
// 获取信息
export const getAllEvilInfo = async (data: chinaInfoInit, setData: Function) => {
    const res: any = await evilControl.reqGetEvilInfo()
    if (res.code === 200) {
        data.chinaInfo.evilData = res.newslist[0].desc
        // 将时间转换格式
        data.chinaInfo.updateTime = timestampToTime(data.chinaInfo.evilData['modifyTime'])
        setData({ ...data })
        numberInit(data, setData)
        initEchartsxData(data, setData)
        initEchartsyData(data, setData)
        chart(document.querySelector('.chart'), data, setData)
    } else {
        message.error('获取信息失败！')
    }
}