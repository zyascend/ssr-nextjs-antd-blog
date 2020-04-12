import { Card } from 'antd'
import { Tag } from 'antd';

const tagColors = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']

const getTagColor = index => {
  const i = index >= tagColors.length ? index % tagColors.length : index
  return tagColors[i]
}

export default ({ post }) => {
  return (
    <div className="card-post" key={post.title}>
      <Card bordered={false} style={{ width: '100%' }}>
        <div className="item-wrapper">
          <a className="item-title" href={ post.link }>{ post.title }</a>
          <div className="item-info">
            <span className="post-date">{ post.date }</span>
            <span className="post-cate">{ post.cate }</span>
            <div className="post-tags">
              {
                post.tagList.map((tag, index) => (
                  <a href={tag.link}><Tag color={ getTagColor(index) }>{ tag.name }</Tag></a>
                ))
              }
            </div>
          </div>
          <div className="post-preview">{ post.preview }</div>
          <a href={ post.link } className="show-btn">
            <span className="btn-text">查看</span>
            <img src="/toright.png" alt="" className="btn-icon"/>
          </a>
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
            color: #000c17;
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
