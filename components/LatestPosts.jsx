import { Card } from 'antd'

export default ({ posts }) => {
  return (
    <div className="card-posts">
      <Card title="最新文章"
        bordered={false}
        style={{ width: '100%' }}
        headStyle={{ color: '#33b7ff', fontWeight: 700}}
      >
        {
          posts.map(p => (
            <a key={p.title} href={p.link} className="latest-post">
              {p.title}
            </a>
          ))
        }
      </Card>
      <style jsx>
        {`
          .card-posts {
            width: 100%;
          }
          .card-posts:hover {
            box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
          }
          .latest-post {
            width: 100%;
            max-height: 48px;
            line-height: 24px;
            color: #000c17;
            font-size: 16px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 20px;
            font-weight: 600;
          }
          .latest-post:hover {
            color: #2f54eb;
          }
          .latest-post:last-child {
            margin-bottom: 0;
          }

      `}
      </style>
    </div>
  )
}
