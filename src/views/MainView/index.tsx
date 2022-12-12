import { FC, useEffect, useState } from 'react';
import { indexViewDataInit, getOneChart, getTwoChart, getCompanyDetail } from '../../type/indexView';
import './index.less'
import CountUp from "react-countup";
import { Image } from 'antd'


const Main: FC = () => {
  const [data, setData] = useState(new indexViewDataInit())
  useEffect(() => {
    getOneChart(document.querySelector('.one'))
    getTwoChart(document.querySelector('.two'))
    getCompanyDetail(data, setData)
  }, [])
  return (
    <div className="Main" style={{ margin: "30px" }}>
      <div className="father">
        <div id="one" className="one"></div>
        <div id="two" className="two"></div>
        <div id="three" className="three">
          {
            data.mainViewData.showData.map((show: any) => {
              return (
                <div className="cardPic" key={show.id}>
                  <div className='cardIcon'>
                    <Image
                      preview={false}
                      width={45}
                      src={show.iconPath}
                    />
                  </div>
                  <div className='cardNum'>
                    <div className="number" style={{ color: show.color }}>
                      {
                        Number(show.num) ? <CountUp start={0} end={show.num} separator="," duration={2} /> :
                          <span>{show.num}</span>
                      }
                    </div>
                    <div>
                      <span style={{ color: "gray", fontSize: "18px" }}>{show.title}</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div >
      </div >
    </div >
  );
}



export default Main;