import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

type LoaderPropsType = {
    minHeight?: string | number
}

let Loader: React.FC<LoaderPropsType> = (props) => {
    const {minHeight = '10vh' } = props
    return (
        <div style={{ minHeight: minHeight, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <LoadingOutlined style={{ fontSize: 58, display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: "100%" }} />
        </div >)
}


export default Loader;