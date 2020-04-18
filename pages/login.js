import Router, { withRouter } from 'next/router'
import { Form, Input, Button, message } from 'antd'
import { setSessionStorage } from './../lib/utils'
import { adminLogin } from './../lib/api'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
}

const LoginPage = () => {
  const onFinish = values => {
    adminLogin(values.username, values.password)
      .then(res => {
        const { status, data } = res
        if (status === 200 && data.code === 0) {
          setSessionStorage('adminCode', data.adminCode)
          Router.replace('/admin')
        } else {
          throw new Error(data.msg)
        }
      }).catch(e => {
        message.error(`删除失败: ${e}`);
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login-container">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <style jsx>{`
        .login-container {
          background-color: #F1F1F1;
          min-height: 100vh;
          padding: 60px 0.5rem 40px 0.5rem;
          box-sizing: border-box;
        }
      `}
      </style>
    </div>
  )
}

export default withRouter(LoginPage)

