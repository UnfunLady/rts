import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.less'

export default function NotFound() {
    const navigate = useNavigate()
    const backMain = () => {
        // 返回主页
        navigate('/homeView/mainView', { replace: true })
    }

    return (
        <div className="mainNotFound">
            <h3>404 NotFound....</h3>
            <div className="wuyuzi">
                <img src={require('../../assets/imges/wuyuzi.png')} alt="" />
            </div>
            <div className="one"> <img src={require('../../assets/imges/Filianore.png')} alt="" /></div>
            <div className="two">
                <img src={require('../../assets/imges/maria.png')} alt="" />
            </div>
            <div className="back">
                <Button onClick={backMain}>返回首页</Button>
            </div>
        </div >
    )

}