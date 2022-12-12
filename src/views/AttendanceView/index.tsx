import { FC, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Index: FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    )

}
export default Index;