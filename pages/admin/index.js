import { withRouter } from 'next/router'
import Link from 'next/link'
import { Table, Modal, message } from 'antd'
import { dateFormat } from '../../lib/utils'
import { getIndexData, deletePost } from '../../lib/api'
import WithSideMenu from '../../components/WithSideMenu'

const { confirm } = Modal

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
      <span>
        <Link href={`/admin/newPost?postId=${record.key}`}>
          <a>修改</a>
        </Link>
        <a
          style={{ marginLeft: '10px' }}
          onClick={ () => { doDeletePost(record.key) } }>
          删除
        </a>
      </span>
    ),
  },
]

function doDeletePost(postId) {
  confirm({
    title: '确定删除？',
    onOk() {
      return new Promise((resolve, reject) => {
        deletePost(postId, 1)
          .then(({data, status}) => {
            if (status === 200 && data.code === 0){
              resolve()
            } else {
              reject(data.msg)
            }
        })
          .catch(reject)
      })
        .then(() => {
          window.location.reload()
        })
        .catch(err => {
          message.error(`删除失败: ${err}`);
        })
    },
    onCancel() {},
  });
}

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
const TablePage = ({ tableData }) => {

  const data = generateColumnData(tableData)

  return(
    <div className="table-container">
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
  console.log('res.data')
  const res = await getIndexData(0, 0)
  console.log(res.data)
  return {
    tableData: res.data,
  }
}

export default withRouter(WithSideMenu(TablePage))
