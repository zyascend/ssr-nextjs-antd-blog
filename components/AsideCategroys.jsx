import { Card } from 'antd'

export default ({ cates }) => {
  return (
    <div className="card-cates">
      <Card title="文章分类"
            bordered={false}
            style={{ width: '100%' }}
            headStyle={{ color: '#33b7ff', fontWeight: 700}}
      >
        {
          cates.map(cate => (
            <div className="cate">
              <a key={cate.name} href={cate.link} className="cate-name">
                {cate.name}
              </a>
              <span className="cate-count">{cate.count}</span>
            </div>
          ))
        }
      </Card>
      <style jsx>
        {`
          .card-cates {
            width: 100%;
            margin-top: 40px;
          }
          .card-cates:hover {
            box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
          }
          .cate {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            font-weight: 600;
          }
          .cate:last-child {
            margin-bottom: 0;
          }
          .cate-name {
            flex: 1;
            height: 24px;
            line-height: 24px;
            color: #000c17;
            font-size: 16px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .cate-count {
            height: 24px;
            line-height: 24px;
            color: #33b7ff;
            font-size: 16px;
            padding-left: 15px;
          }
 
      `}
      </style>
    </div>
  )
}
