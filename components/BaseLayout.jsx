import { Layout } from 'antd'
import { withRouter } from 'next/router'
import CenterContainer from './CenterContainer'

const { Header, Content, Footer } = Layout

const AppLayout = ({ children, router }) => {
  const { query: { query = '' } = {} } = router
  return (
    <Layout>
      <Header>
        <CenterContainer>
          <div className="header-wrapper">
            <a href="/" className="logo-wrapper">
              <img className="logo" src="/blog_logo.png" alt="blog_logo"/>
            </a>
            <div className="nav-wrapper">
              <a href="/" className="nav-link">主页</a>
              <a href="/" className="nav-link">目录</a>
              <a href="/" className="nav-link">标签</a>
              <a href="/" className="nav-link">时间轴</a>
            </div>
          </div>
        </CenterContainer>
      </Header>
      <Content>
        <CenterContainer>
          {children}
        </CenterContainer>
      </Content>
      <Footer>
        <div className="foot-wrapper">
          <a className="power" href="https://github.com/zyascend">Powered by<span>zyascend</span></a>
          <a href="http://www.beian.miit.gov.cn/" className="icp">蜀ICP备20007860号</a>
          <div className="info">
            <a href="https://github.com/zyascend" className="foot-icon">
              <img src="/github4.png" alt="" className="icon"/>
            </a>
            <a href="mailto:zyascend@qq.com" className="foot-icon">
              <img src="/email.png" alt="" className="icon"/>
            </a>
          </div>
        </div>
      </Footer>
      <style jsx global>
        {`
          #__next {
            height: 100%;
          }

          .ant-layout {
            min-height: 100%;         
          }

          .ant-layout-header {
            padding-left: 0;
            padding-right: 0;
            background: #fff
          }
          
          .ant-layout-header {
            padding-left: 0;
            padding-right: 0;
            background: #fff
          }

          .ant-layout-content {
            background: #f1f1f1;
          }
          .ant-layout-footer {
            background: #fff;
          }
        `}
      </style>
      <style jsx>
        {`
          .header-wrapper {
            display: flex;
            justify-content: space-between;
          }

          .logo-wrapper {
          }

          .logo {
            height: 100%;
            background: center no-repeat;
            background-size: cover;
          }

          .nav-wrapper {
            display: flex;
            flex-direction: row; 
          }
          
          .nav-link {
            color: #51565e;
            font-size: 16px;
            font-weight: 700;
            padding: 0 20px;
          }
          .nav-link:hover {
            color: #33b7ff;
          }
          
          .foot-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .info {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .power {
            color: #51565e;
            font-size: 16px;
          }
          .power span {
            color: #33b7ff;
            margin-left: 5px;
            font-weight: 600;
          }

          .foot-icon {
            margin-left: 15px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }

          .icon {
            width: 30px;
            height: 30px;
          }
          
          .icp {
            color: #51565e;
            font-size: 16px;
          }
      `}
      </style>
    </Layout>
  )
}

export default withRouter(AppLayout)
