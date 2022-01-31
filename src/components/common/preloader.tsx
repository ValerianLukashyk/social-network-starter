import React from 'react'
import {LoadingOutlined} from '@ant-design/icons'

let Loader: React.FC = (props) => {
    return <LoadingOutlined style={{fontSize: 58, display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: "100%"}}/>
}


export default Loader;