import * as echarts from 'echarts'
import '../assets/map'
import { mapApi } from '../api'
interface mapInfo {
    mapData: []
}
export class chinaMapinit {
    initData: mapInfo = {
        mapData: []
    }
}

export const initCharts = async (data: chinaMapinit, container: HTMLElement, setData: Function) => {
    const t = new Date().getTime() * 2;
    const res: any = await mapApi.getChinaEvilInfo(t);
    if (res.data) {
        data.initData.mapData = res.data.areaTree[2].children.map((city: any) => {
            const cityData = {
                name: city.name,
                value: city.total.confirm - city.total.heal - city.total.dead,
            }
            return cityData
        })
        setData({ ...data })
    }
    var optionMap = {
        backgroundColor: '#fafbfc',
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 0,
            borderWidth: 0,
            trigger: 'item',
            formatter: function (val: any) {
                return `
<div style="padding:15px"><span style="color: #fff;font-size:12px">所在城市：${val.data.name}</span>
<br/>
<span style="color: #fff;margin-top:20px;font-size:12px">确诊人数：${val.data.value} 人</span></div>`
            }
        },

        //左侧小导航图标
        visualMap: {
            show: true,
            x: '5%',
            y: '10%',
            textStyle: {
                fontSize: 12,
                height: 56,
            },

            textGap: 15,
            pieces: [{
                gte: 999,
                label: ">=1000人",
                color: "#772526"
            }, {
                gt: 499,
                lt: 999,
                label: "500-999人",
                color: "#bb3937"
            }, {
                gt: 99,
                lt: 499,
                label: "100-499人",
                color: "#d56355"
            }, {
                gt: 9,
                lt: 99,
                label: "10-99人",
                color: "#e9a188",
            }, {
                gt: 0,
                lt: 9,
                label: "1-9人",
                color: "#faebd2"
            }, {
                lte: 0,
                label: "0人",
                color: "#ffffff"
            },],

        },

        //配置属性
        series: [{
            zoom: 1.2,
            roam: true,
            name: '确诊人数',
            type: 'map',
            map: 'china',
            label: {
                show: true, //省份名称，
                fontSize: 12,
            },
            itemStyle: {
                borderWidth: .3,
                borderColor: 'rgba(0,0,0,.4)',
                color: (params: any) => {
                    if (params.data && params.data.value >= 1000) {
                        return '#fff'
                    }

                },

            },
            emphasis: {
                areaColor: '#476080',//鼠标滑过区域颜色

            },
            data: data.initData.mapData.map((params: any) => {
                if (params.value && params.value >= 1000) {
                    params.label = {
                        color: "#fff"
                    }
                }
                return params
            }) //数据
        }]
    };
    //初始化echarts实例
    var myChart = echarts.init(container);
    myChart.setOption(optionMap);
    window.onresize = function () {
        myChart.resize();
    };
}
