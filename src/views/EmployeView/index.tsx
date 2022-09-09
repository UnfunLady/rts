import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
const EmployeView: FC = () => {
    return (
        <div>
            < Outlet />
        </div>

    );
}



export default EmployeView;