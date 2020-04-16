import React, { Component } from 'react'

import LatestPosts from '../components/LatestPosts'
import AsideCategroys from '../components/AsideCategroys'
import AsideTags from '../components/AsideTags'
import PostItem from '../components/PostItem'
import { getIndexData } from '../lib/api'
import { getScrollTop, getDocumentHeight, getWindowHeight } from '../lib/utils'

class HomePage extends Component {

  constructor(props){
    super(props)
    const { posts, maxPostCount } = props
    this.state = {
      maxPostCount,
      pageNumber: 2,
      isLoading: false,
      postList: posts
    }
  }

  onLoadMore = () => {
    if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
      const { maxPostCount, pageNumber, isLoading, postList } = this.state
      if (!isLoading && postList.length < maxPostCount) {
        this.setState({
          isLoading: true,
        }, () => {
          console.log('请求服务器加载更多 pageNumber => ', pageNumber)
          getIndexData(pageNumber, 5)
            .then(res => {
              if (res.status === 200) {
                this.setState({
                  isLoading: false,
                  pageNumber: this.state.pageNumber + 1,
                  postList: this.state.postList.concat(res.data.posts)
                })
              }
            })
            .catch(e => {
              console.log('err', e)
              this.setState({
                isLoading: false,
              })
            })
        })
      }
    }
  }

  componentDidMount() {
    window.onscroll = this.onLoadMore
  }

  render() {
    const { tagList, cateList, latestPosts } = this.props
    const { postList } = this.state
    return (
      <div className="container">
        <div className="post-wrapper">
          {
            postList.map(post => (
              <PostItem post={post} key={post.postId}/>
            ))
          }
        </div>
        <div className="aside">
          <LatestPosts posts={ latestPosts } />
          <AsideCategroys cates={ cateList } />
          <AsideTags tagList={ tagList } />
        </div>
        <style jsx>{`
      .container {
        background-color: #F1F1F1;
        min-height: 100vh;
        padding: 40px 0.5rem 40px 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        box-sizing: border-box;
      }
      
      .post-wrapper {
        width: 70%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
      }
      
      .aside {
        width: 30%;
        min-height: 100vh;
        box-sizing: border-box;
        height: 100%;
        padding-left: 30px;
      }
      
    `}</style>

        <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
      </div>
    )
  }

}
HomePage.getInitialProps = async (ctx) => {
  const res = await getIndexData(1, 5)
  console.log('getIndexData', res.data)
  const data = res.data
  const { posts, tagList, cateList } = data
  const latestPosts = posts.slice(0, 5)
  const maxPostCount = 10
  return {
    posts, tagList, cateList, latestPosts, maxPostCount
  }
}
export default HomePage
