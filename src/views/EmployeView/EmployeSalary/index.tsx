import { FC, } from 'react';
import { Outlet } from 'react-router-dom';
const EmployeSalary: FC = () => {
    return (
        <div className="EmployeSalary" >
            <Outlet />
        </div>
    );
}



export default EmployeSalary;