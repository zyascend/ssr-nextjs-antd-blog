import Router from 'next/router'
import { Button, Result } from 'antd'

export default class Error extends React.Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="这个页面不存在"
        extra={[
          <Button type="primary" onClick={() => {
            Router.replace('/')
          }}>
            返回主页
          </Button>
        ]}
      />
    )
  }
}
