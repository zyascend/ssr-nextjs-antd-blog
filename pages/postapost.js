import Router, { withRouter } from 'next/router'
import { useState } from 'react'
import { Form, Input, Button, Result } from 'antd'
import { submitPost } from '../lib/api'
import { stringToBase64 } from '../lib/utils'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
    password: '${label} cant be empty!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

const FormPage = () => {

  const [isLoading, toggleLoading] = useState(false)
  const [isComplete, toggleComplete] = useState(false)

  const onFinish = async values => {
    const res  = await submitPost({
      adminCode: values.adminCode,
      ...values.post,
      content: await stringToBase64(values.post.content)
    })
    if(res.status === 200 && res.data.code === 0) {
      toggleLoading(false)
      toggleComplete(true)
    }
  }

  return (
    <div className="form-container">
      {
        isComplete ?
          <Result
            status="success"
            title="发布成功"
            subTitle="返回主页查看"
            extra={[
              <Button type="primary" onClick={() => {
                Router.replace('/')
              }}>
                返回主页
              </Button>
            ]}
          /> :
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            size="large"
          >
            <Form.Item
              label="adminCode"
              name="adminCode"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={['post', 'title']} label="标题" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['post', 'cate']} label="分类" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['post', 'tagList']} label="标签" help="多个标签用|连接" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['post', 'content']} label="内容" rules={[{ required: true }]}>
              <Input.TextArea autoSize={{ minRows: 6 }}/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                { isLoading ? '发布中' : '发布' }
              </Button>
            </Form.Item>
          </Form>
      }
      <style jsx>{`
        .form-container {
          background-color: #F1F1F1;
          min-height: 100vh;
          padding: 40px 0.5rem 40px 0.5rem;
          box-sizing: border-box;
        }
      `}
      </style>
    </div>
  )
}

export default withRouter(FormPage)
