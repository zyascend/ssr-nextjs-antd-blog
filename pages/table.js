import { withRouter } from 'next/router'
import Link from 'next/link'
import { Table } from 'antd'
import { dateFormat } from '../lib/utils'
import { getTableData } from '../lib/api'

const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title',
    width: '60%',
    render: (text, record) => (
      <Link href={`/post?postId=${record.key}`}>
        <a>{text}</a>
      </Link>
    ),
  },
  {
    title: '最近更新',
    dataIndex: 'date',
    key: 'date',
    width: '20%',
  },

  {
    title: '操作',
    key: 'action',
    width: '20%',
    render: (text, record) => (
      <Link href={`/post?postId=${record.key}`}>
        <a>查看</a>
      </Link>
    ),
  },
]
function generateColumnData(tableData) {
  const data = []
  tableData.posts.forEach(post => {
    data.push({
      key: post.postId,
      title: post.title,
      date: dateFormat(post.date),
    })
  })
  return data
}
const TablePage = ({ tableData, tableType, tableName }) => {

  const data = generateColumnData(tableData)

  return(
    <div className="table-container">
      <div className="page-title">
        {tableType === 'cate' ? '分类:' : '标签: '}
        <span>{ tableName }</span>
      </div>
      <div className="my-table-wrapper">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ disabled: true }}
        />
      </div>
      <style jsx>{`
        .table-container {
          background-color: #F1F1F1;
          min-height: 100vh;
          padding: 40px 0.5rem 40px 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          box-sizing: border-box;
        }
        .page-title {
          font-size: 20px;
          font-weight: 700;
          color: #000;
          margin-bottom: 25px;
        }
        .page-title span {
          color: #33b7ff;
          margin-left: 15px;
        }
        .my-table-wrapper {
          width: 100%;
        }

      `}
      </style>
    </div>
  )
}

TablePage.getInitialProps = async ({ ctx }) => {

  const { query } = ctx
  const { tableName, tableType } = query
  console.log('tableName', tableName)
  console.log('tableName', decodeURIComponent(tableName))
  const res = await getTableData(tableName, tableType)
  return {
    tableData: res.data,
    tableType,
    tableName
  }
}

export default withRouter(TablePage)
