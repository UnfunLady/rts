import React, { useEffect, useState } from 'react'
import './index.less'
import Header from '../../../component/Header'
import { getCompanyEvilInfo, companyInfoInit } from '../../../type/evilControl'
import { Avatar, Card, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
export default function CompanyInfo() {
    const [data, setData] = useState(new companyInfoInit())
    useEffect(() => {
        getCompanyEvilInfo(data, setData)
    }, [])
    const navigate = useNavigate()
    // 查看未接种的员工信息
    const showNoCovid = (info: any) => {
        navigate('/homeView/evilControl/showNoCovid', { state: { info } })
    }
    // 查看信息
    const justCheck = (info: any) => {
        navigate('/homeView/evilControl/showNoCovid', { state: { info, justCheck: true } })
    }
    return (
        <div style={{ margin: "30px" }}>
            <Header title='公司疫苗接种情况' explain='展示公司人员部门疫苗接种详细情况' />
            <br />
            <Card>
                <Row gutter={16}>
                    {
                        data.companyData.allDeptInfo.map((dept: any) => {
                            return (
                                <Col className="gutter-row" span={8} key={dept.dno}>
                                    <div className='companyInfo' >
                                        <div className="header">
                                            <div className="deptInfo">
                                                <Avatar style={{ width: "50px", height: "50px" }} src={dept.avatar} />
                                                <h6>{dept.dname}</h6>
                                            </div>
                                            {
                                                dept.isAllCovid === "false" ?
                                                    <div className="detailInfo">
                                                        <p onClick={() => showNoCovid(dept)}>总数/未接种:
                                                            <span className="sumNot">
                                                                {dept.count}/{dept.noCovid}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    :
                                                    <div className="detailInfo">
                                                        <p onClick={() => justCheck(dept)}>查看接种信息
                                                        </p>
                                                    </div>
                                            }
                                        </div>
                                        {
                                            dept.isAllCovid === "false" ?
                                                <div className="warn">
                                                    <p style={{ color: "white" }}>
                                                        <svg className="icon" aria-hidden="true">
                                                            <use xlinkHref="#icon-health"></use>
                                                        </svg> <span>部门尚有未接种员工{dept.noCovid}人</span>
                                                    </p>
                                                </div>
                                                : <div className="ok">
                                                    <p style={{ color: "white" }}>
                                                        <svg className="icon" aria-hidden="true">
                                                            <use xlinkHref="#icon-anquan"></use>
                                                        </svg> <span>部门所有员工已完成接种</span>
                                                    </p>
                                                </div>
                                        }
                                    </div>
                                </Col>
                            )
                        })
                    }


                </Row>
            </Card>
        </div>
    )

}