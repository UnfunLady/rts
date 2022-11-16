import { useEffect, useState } from 'react'
import { chinaMapinit, initCharts } from '../../../type/chinamap'
import './index.less'
export default function ChinaMap() {
    const [data, setData] = useState(new chinaMapinit)
    useEffect(() => {
        initCharts(data, document.querySelector('.mapInfo')!, setData)
    }, [])
    return (
        <div>
            <div className='chinaMap'>
                <div className='mapTitle'>中国疫情趋势地图</div>
                <div className='mapInfo'></div>
            </div>
        </div>
    )

}

