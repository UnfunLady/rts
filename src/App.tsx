import { FC } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import routes from './router'
import './App.less'
const App: FC = () => {
  const navigate = useNavigate()
  const isLogin = useSelector((state: any) => {
    return state.user.userList.isLogin
  })
  const location = useLocation()
  routes.map((route: any) => {
    console.log(route);
  })
  const elements = useRoutes(routes)
  console.log(location);
  return (
    <div className="App" >
      {elements}
    </div>
  );
}



export default App;