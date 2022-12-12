import { Card } from 'antd';
import './index.less'
type Props = {
    title: string,
    explain: string,
}
const Header = (props: Props) => {
    return (
        <div className="Header" >
            <Card>
                <div className="title">
                    <h3>{props.title}</h3>
                </div>
                <div className="explain">
                    {props.explain}
                </div>
            </Card>
        </div>
    );
}



export default Header;