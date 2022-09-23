import React from 'react'
import './index.less'
import Header from '../../../component/Header'
import { Avatar, Card, Col, Row } from 'antd'
export default function CompanyInfo() {
    return (
        <div style={{ margin: "30px" }}>
            <Header title='公司疫苗接种情况' explain='展示公司人员部门疫苗接种详细情况' />
            <br />
            <Card>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <div className='companyInfo' >
                            <div className="header">
                                <div className="deptInfo">
                                    <Avatar style={{ width: "50px", height: "50px" }} src="https://img0.baidu.com/it/u=3104250705,162290846&fm=253&fmt=auto&app=138&f=JPG" />
                                    <h6>爬虫团队</h6>
                                </div>
                                <div className="detailInfo">
                                    <p >总数/未接种:
                                        <span className="sumNot">
                                            30/24
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="warn">
                                <p style={{ color: "white" }}>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-health"></use>
                                    </svg> <span>部门尚有未接种员工9人</span>
                                </p>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Card>
        </div>
    )

}