import { Spin } from "antd"
import {  LoadingOutlined } from '@ant-design/icons'

const Loading = () => {
  const loadingIcon = <LoadingOutlined style={{ fontSize: 38, color: '#1074cc' }} spin />
  
  return (
    <Spin 
    indicator={loadingIcon} 
    className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
  )
}

export default Loading
