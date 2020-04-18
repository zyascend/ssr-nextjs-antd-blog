import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import MenuItem from './../components/MenuItem'
import { getSessionStorage } from './../lib/utils'

export default (Comp) => {
  class withSideMenu extends React.Component {

    constructor(props){
      super(props)
    }

    static async getInitialProps (appContext) {
      let appProps = {}
      if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps.call(Comp, appContext)
      }
      return {
        ...appProps,
      }
    }

    componentDidMount() {
      const adminCode = getSessionStorage('adminCode')
      console.log('componentDidMount', adminCode)
      if (!adminCode) {
        // 未登录 跳转到登陆页
        Router.push('/login')
      }
    }

    pathName = this.props.router.pathname
    isActive = (path) => path === this.pathName
    render() {
      return (
        <div className="side-menu-container">
          <div className="menu">
            <MenuItem
              link={'/admin'}
              isActive={ this.isActive('/admin') }
              text="Post列表"
            />
            <MenuItem
              link={'/admin/newPost'}
              isActive={ this.isActive('/admin/newPost') }
              text="发布Post"
            />
            <MenuItem
              link={'/admin/statics'}
              isActive={ this.isActive('/admin/statics') }
              text="统计"
            />
          </div>
          <div className="comp">
            <Comp { ...this.props }/>
          </div>
          <style jsx>{`
            .side-menu-container {
              background-color: #F1F1F1;
              width: 100%;
              min-height: 100vh;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
            }
            
            .menu {
              width: 15%;
              min-height: 100vh;
              height: 100%;
              padding: 60px 0 0 0;
              display: flex;
              flex-direction: column;
              justify-items: flex-start;
              border-right: #e1e1e1 solid 1px;
            }
            .comp {
              width: 85%;
              height: 100%;
            }
            .menu-item {
              height: 50px;
              color: #000c17;
              font-size: 18px;
              line-height: 50px;
              font-weight: 600;
              padding-left: 10px;
            }
            .menu-item:hover, .menu-item:focus {
              background-color: rgba(51,183,255, 0.2);
              border-right: #33b7ff solid 2px;
              color: #33b7ff;
            }
          `}
          </style>
        </div>
      )
    }
  }
  return withSideMenu
}
