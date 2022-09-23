import { Button, Card } from 'antd'
import React, { useState, useEffect, useReducer } from 'react'
import Header from '../../../component/Header'
import { chinaInfoInit, getAllEvilInfo, chart } from '../../../type/evilControl'
import { ClockCircleOutlined } from '@ant-design/icons'
import CountUp from "react-countup";
import './index.less'
import PubSub from 'pubsub-js'
export default function ChinaInfo() {
    const [data, setData] = useState(new chinaInfoInit())
    // 无任何意义 只用于强制刷新
    // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    useEffect(() => {
        // 初始化
        // 置空图表
        data.chinaInfo.echarts.xData = []
        data.chinaInfo.echarts.yData = {
            countData: [],
            moreData: []
        }
        getAllEvilInfo(data, setData)
    }, [])
    const getNewInfo = () => {
        data.chinaInfo.echarts.xData = []
        data.chinaInfo.echarts.yData = {
            countData: [],
            moreData: []
        }
        setData({ ...data })
        getAllEvilInfo(data, setData)
        // forceUpdate()
        PubSub.publish('reloadRouter')
    }

    return (
        <div style={{ margin: "30px" }}>
            <div>
                <Header title='全国疫情信息' explain='展示中国全国疫情信息(包括港澳台)' />
            </div>
            <br />
            <div>
                <Card>
                    <div className="main">
                        <div className="allInfo">
                            <div className="title">
                                <h3 className="titleInfo">{data.chinaInfo.title}</h3>
                                <Button danger type='primary' icon={<ClockCircleOutlined />} onClick={getNewInfo}>点击更新最新数据</Button>
                            </div>
                            {/* 疫情信息 */}
                            <div className="infoCards">
                                {
                                    data.chinaInfo.allInfo.map((evilInfo: any) => {
                                        return (
                                            <div className="infoCard" key={evilInfo.id}>
                                                <div className="infoCard-title" >
                                                    <h4 style={{ color: evilInfo.color }}>{evilInfo.title}</h4>
                                                </div>
                                                <div className="infoCard-main" >
                                                    <div className="infoNumber" style={{ color: evilInfo.color }} >
                                                        {/*https://blog.csdn.net/weixin_42224055/article/details/105785922?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-105785922-blog-109117380.pc_relevant_multi_platform_featuressortv2dupreplace&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-105785922-blog-109117380.pc_relevant_multi_platform_featuressortv2dupreplace&utm_relevant_index=6 */}
                                                        <CountUp start={0} end={evilInfo.data.oneNumber} separator="," duration={2} />
                                                    </div>
                                                </div>
                                                <div className=" compare">
                                                    <div className="compareNumber" style={{ color: "gray" }}>
                                                        相较昨日:
                                                    </div>
                                                    <span style={{ color: evilInfo.color }}>{evilInfo.data.twoNumber > 0 ? '+' : ''}</span>
                                                    <div className="compareNumber" style={{ color: evilInfo.color }} >
                                                        <CountUp start={0} end={evilInfo.data.twoNumber} duration={2} />
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            <div className="deadTime" >
                                上次更新时间:{data.chinaInfo.updateTime}
                            </div>
                            <div className="about" >
                                数据来源：国家卫健委
                            </div>
                        </div >
                        <div className="chart">
                        </div>
                    </div >
                </Card >
            </div >
        </div >
    )

}