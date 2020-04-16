import { Card, Tag } from 'antd'
import Link from 'next/link'

const tagColors = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
const tagStyles = {
  margin: '5px 5px',
  padding: '7px 7px',
  fontSize: '16px',
  cursor: 'pointer'
}
const getTagColor = index => {
  const i = index >= tagColors.length ? index % tagColors.length : index
  return tagColors[i]
}

export default ({ tagList }) => {
  return (
    <div className="card-tags" id="tags">
      <Card title="标签"
        bordered={false}
        style={{ width: '100%' }}
        headStyle={{ color: '#33b7ff', fontWeight: 700}}
      >
        <div className="tag-wrapper">
          {
            tagList.map((tag, index) => (
              <Link href={ `/table?tableType=tag&tableName=${encodeURIComponent(tag)}` }>
                <a>
                  <Tag style={tagStyles} color={ getTagColor(index) }>
                    { tag }
                  </Tag>
                </a>
              </Link>
            ))
          }
        </div>
      </Card>
      <style jsx>
        {`
          .card-tags {
            width: 100%;
            margin-top: 40px;
          }
          .card-tags:hover {
            box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
          }
          .tag-wrapper {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
          }
          .tag-wrapper a {
            cursor: pointer;
          }
          
      `}
      </style>
    </div>
  )
}
