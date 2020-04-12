import { Pagination } from 'antd'
import LatestPosts from '../components/LatestPosts'
import AsideCategroys from '../components/AsideCategroys'
import AsideTags from '../components/AsideTags'
import PostItem from '../components/PostItem'
import { latestPost, postItems, tagList, cates } from '../lib/fakeDataFactory'


const Home = () => (
  <div className="container">
    <div className="post-wrapper">
      {
        postItems.map(post => (
          <PostItem post={post}/>
        ))
      }
      <Pagination defaultCurrent={1} total={50} />
    </div>
    <div className="aside">
      <LatestPosts posts={latestPost} />
      <AsideCategroys cates={cates} />
      <AsideTags tagList={tagList} />
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

export default Home
