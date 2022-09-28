import { FC, useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './router'
import './App.less'
const App: FC = () => {
  const elements = useRoutes(routes)
  const navigate = useNavigate()
  const userInfo = useSelector((state: any) => {
    return state.user.userList.userInfo
  })
  // 监视userInfo变动
  // 添加水印
  // 根据用户名字和账号绘制背景图
  // 作者：https://www.cnblogs.com/lulu-beibei/p/15918996.html
  useEffect(() => {
    if (userInfo.nickname !== undefined && userInfo.username !== undefined) {

      var drawAndShareImage = function (text: string, text1: string, callback: Function) {
        var canvas = document.createElement('canvas')
        canvas.width = 570
        canvas.height = 200
        var context = canvas.getContext('2d')!
        context.rect(0, 0, canvas.width, canvas.height)
        var h = 0
        var w = 0
        for (let i = 0; i < 2; i++) {
          if (i === 0) {
            w = 0
            h = 70
          } else if (i === 1) {
            w = 250
            h = 120
          }
          context.rotate((-8 * Math.PI) / 180) // 水印初始偏转角度
          context.font = '14px microsoft yahei'
          context.fillStyle = 'rgba(0, 0, 0, .15)'
          var mainText = text + '(' + text1 + ')'
          context.fillText(mainText, w, h)
          context.rotate((8 * Math.PI) / 180) // 把水印偏转角度调整为原来的，不然他会一直转
        }
        callback(canvas.toDataURL('image/png'))
      }
      var div1 = document.createElement('div')
      div1.className = 'needNameDw'
      document.getElementById('root')?.appendChild(div1)
      const img = document.getElementsByClassName('needNameDw')[0]
      drawAndShareImage(userInfo.nickname, userInfo.username, (url: string) => {
        // 需要覆盖所有dom 加上z-index: 9999;
        img.setAttribute('style', 'background:url("' + url + '");position: absolute;top: 0;left: 0;width: 100%;height: 100%;pointer-events: none;')
      })
    } else {
      // 删除水印节点
      document.getElementsByClassName('needNameDw')[0] ? document.getElementsByClassName('needNameDw')[0].remove() : console.log('暂未登录');

    }
  }, [userInfo.nickname])


  return (
    <div className="App" >
      {elements}

    </div>
  );
}



export default App;