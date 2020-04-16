import Link from 'next/link'
import { Card } from 'antd'
import { Tag } from 'antd'
import { dateFormat } from '../lib/utils'

const tagColors = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']

const getTagColor = index => {
  const i = index >= tagColors.length ? index % tagColors.length : index
  return tagColors[i]
}

export default ({ post }) => {
  const { postId, title, date, tagList, cate, content } = post
  const postLink = `/post?postId=${postId}`
  const tagArray = []
  if (tagList.indexOf('|') > 0) {
    tagList.split('|').forEach(tag => {
      tagArray.push(tag)
    })
  } else {
    tagArray.push(tagList)
  }
  return (
    <div className="card-post" key={ postId }>
      <Card bordered={ false } style={{ width: '100%' }}>
        <div className="item-wrapper">
          <Link href={ postLink }>
            <a className="item-title">{ title }</a>
          </Link>
          <div className="item-info">
            <span className="post-date">{ dateFormat(date) }</span>
            <span className="post-cate">{ `⊙ ${cate}` }</span>
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
          <div className="post-preview">{ content }</div>
          <Link href={ postLink }>
            <a className="show-btn">
              <span className="btn-text">查看</span>
              <img src="/toright.png" alt="" className="btn-icon"/>
            </a>
          </Link>
        </div>
      </Card>
      <style jsx>
        {`
          .card-post {
            width: 100%;
            margin-bottom: 40px;
            cursor: pointer;
          }
          .card-post:hover {
            box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
          }
          .item-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
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
          .post-preview {
            width: 100%;
            max-height: 72px;
            line-height: 24px;
            color: #000c17;
            font-size: 16px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 15px;
          }
          .show-btn {
            width: 15%;
            text-decoration: none;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 8px 20px;
            background-color: #33b7ff;
          }
          .btn-text {
            color: #fff;
            font-size: 18px;
          }
          .btn-icon {
            width: 20px;
            height: 20px;
          }
      `}
      </style>
    </div>
  )
}
