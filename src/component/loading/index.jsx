import React from 'react'
import './index.less'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function loading() {
    return (
        <div className='Loading'>
            <Spin wrapperClassName='ltext' delay="1000" tip="Loading" size='large' indicator={antIcon} />
        </div>
    )

}