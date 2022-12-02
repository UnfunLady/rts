import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Row, Card, Avatar, Tooltip, Button } from 'antd';
import './index.less'
const style: React.CSSProperties = { borderRadius: "5px", padding: '8px 0' };
type Props = {
    deptList: []
}
type dept = {
    avatar: string,
    count: number,
    dname: string,
    dno: number,
    explain: number,
    [propName: string]: any
}
export default function MainView(props: Props) {
    const { deptList } = props
    const navigate = useNavigate()
    const goToDetail = (dept: any, type: string) => {
        if (type === 'dept') {
            navigate('/homeView/employeView/employeSalary/departmentSalaryDetail', {
                state: {
                    deptInfo: JSON.stringify(dept)
                }
            })
        } else {
            navigate('/homeView/employeView/employeSalary/employeDetailView', {
                state: {
                    deptInfo: JSON.stringify(dept)
                }
            })
        }


    }
    return (
        <div>
            <Row gutter={16}>
                {
                    deptList.map((dept: dept) => {
                        return (
                            <Col className="gutter-row" span={6} key={dept.dno}>
                                <Card style={style} className="card">
                                    <div className="content">
                                        <div className="item">
                                            <Avatar src={dept.avatar} />
                                        </div>
                                        <div className="item" style={{ marginLeft: "20px" }}>
                                            <Tooltip overlayInnerStyle={{ color: 'gray', minWidth: "500px" }} title={dept.explain} color="white" key={dept.dno}>
                                                <p style={{ cursor: "help" }}>{dept.dname}</p>
                                            </Tooltip>
                                            <p className="explain">{dept.explain}</p>
                                        </div>
                                        <div className="item" style={{ minWidth: "50px" }}>
                                            <span style={{ color: "red" }}>{dept.count}人</span>
                                        </div>
                                    </div>
                                    <div className="action" >
                                        <Button type="link" onClick={() => goToDetail(dept, 'dept')}>部门整体工资明细</Button>
                                        <span className='splitBtn'></span>
                                        <Button type="link" onClick={() => goToDetail(dept, 'employe')} >员工详细工资明细</Button>
                                    </div>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row >
        </div >
    )

}