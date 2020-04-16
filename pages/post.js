import Router, { withRouter } from 'next/router'
import { Tag, Button, Result } from 'antd'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Loading from '../components/PageLoading'
import { getPostDetail, getTableData } from '../lib/api'
import { dateFormat, base64ToString } from '../lib/utils'

const MarkdownRenderer = dynamic(
  // import('../components/MarkdownRenderer'),
  import('../components/MarkdownContent'),
  {
    loading: () => <Loading />
  }
)


const tagColors = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']

const getTagColor = index => {
  const i = index >= tagColors.length ? index % tagColors.length : index
  return tagColors[i]
}


const PostPage = ({ post }) => {
  if (!post) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="这篇文章不存在"
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
  const { title, date, tagList, cate, content } = post
  const tagArray = []
  if (tagList.indexOf('|') > 0) {
    tagList.split('|').forEach(tag => {
      tagArray.push(tag)
    })
  } else {
    tagArray.push(tagList)
  }
  return(
    <div className="post-container">
      <a className="item-title" href="/" >{ title }</a>
      <div className="item-info">
        <span className="post-date">{ dateFormat(date) }</span>
        <span className="post-cate">{ cate }</span>
        <div className="post-tags">
          {
            tagArray.map((tag, index) => (
              <Link href={ `/table?tableType=tag&tableName=${tag}` }>
                <a>
                  <Tag color={ getTagColor(index) }>{ tag }</Tag>
                </a>
              </Link>
            ))
          }
        </div>
      </div>
      <MarkdownRenderer content={content} />
      <style jsx>{`
        .post-container {
          background-color: #F1F1F1;
          min-height: 100vh;
          padding: 40px 0.5rem 40px 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          box-sizing: border-box;
        }
        .item-title {
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 30px;
          color: #000;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 15px;
        }
        .item-info {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin-bottom: 15px;
        }
        .post-date, .post-cate {
          line-height: 24px;
          font-size: 16px;
          font-weight: 600;
          margin-right: 15px;
        }
        .post-date {
          color: #33b7ff;
        }
        .post-cate {
          color: #33b7ff;
        }
      `}
      </style>
    </div>
  )
}
PostPage.getInitialProps = async ({ ctx }) => {
  const { postId } = ctx.query
  const res = await getPostDetail(postId)

  const post = res.data.posts
  if(post) {
    post.content = await base64ToString(post.content)
  }
  return {
    post
  }
}
export default withRouter(PostPage)
