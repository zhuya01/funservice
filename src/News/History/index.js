//react
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
//antd
import {List, Row, Col, Pagination, Spin, Modal, message} from 'antd';
//css
import indexCss from './css/index.css'
//graphql
import {QueryRenderer, graphql} from 'react-relay';
import {SessionContext} from 'funweb-lib';
//moment
import moment from 'moment'
//mutation
import deleteCms from '../Publish/mutations/deleteCms'

let query = graphql`
query History_Query($first: Int,$skip: Int,$status: CMSStatusType,$cmstypeid: ID!){
  cmss(first:$first,skip:$skip,status:$status,cmstypeid:$cmstypeid){
    totalCount
    edges{
      cmstype{
        createdAt
        deletedAt
        id
        name
        order
        remark
        updatedAt
      }
      abstract
      content
      createdAt
      from
      id
      order
      pic
      reads
      status
      title
      updatedAt
    }
  }
}
`

export default function () {
    //session
    const session = useContext(SessionContext);
    const [pageNum, setPageNum] = useState('1');//页码
    return (<QueryRenderer
        //环境设置
        environment={session.environment}
        //查询语句
        query={query}
        variables={{
            cmstypeid: '1',
            first: 5,
            skip: (pageNum - 1) * 5,

        }}
        //查询过程
        render={({error, props, retry}) => {
            if (error) {//error
                return (
                    <div>
                        <h1>Error!</h1><br/>{error.message}
                    </div>)
            }
            if (props && props.cmss) {//done
                return (
                    <Page
                        cmss={props.cmss}
                        pageChange={(e) => {
                            setPageNum(e)
                        }}
                        pageNum={pageNum}
                    />
                )
            }
            return (//loading
                <Spin tip={'加载中'}>
                    <div style={{marginTop: 400}}></div>
                </Spin>
            )
        }}
    />);
}

function Page(props) {
    const session=useContext(SessionContext)
    const cmssData = props.cmss.edges
    const totalCount = props.cmss.totalCount
    const [state, setState] = useState(false)//悬浮层是否可见
    const [id,setId]=useState(null)//要删除的新闻id
    //表单删除
    function delCms(id) {
        //发布新闻
        deleteCms(id, session.environment, (response, errors) => {
                if (errors) {
                    message.error(errors[0].message);
                } else {

                    message.success({
                        content: '删除成功', duration: '1', onClose: () => {
                            window.location.reload()
                        }
                    });
                }
            },
            (errors) => {
                message.error(errors.source.errors[0].message);
            })
    }

    //分页
    const Page = () => (
        <Pagination
            defaultCurrent={props.pageNum}
            total={totalCount}
            pageSize={5}
            onChange={props.pageChange}
        />
    )

    return (
        <>
            <List
                header={<b>历史发布</b>}
                footer={<Page/>}
                bordered
                dataSource={cmssData}
                renderItem={item => {
                    console.log(item);
                    return (

                        <List.Item>
                            <Row style={{width: '100%'}}>
                                <Col span={5}>
                                    {
                                        item.pic === "" ?
                                            <div className={indexCss.noPic}></div> :
                                            <img alt='暂无封面' className={indexCss.pic} src={'/storage/' + item.pic}/>
                                    }
                                </Col>
                                <Col span={17}>
                                    <Row>
                                        <Col span={24}>
                                            <b className={indexCss.title}>{item.title}</b>
                                        </Col>
                                        <Col span={24}>
                                            <p className={indexCss.abstract}>{item.abstract}</p>
                                        </Col>
                                        <Col span={24}>
                                            <Row style={{width: '100%', 'margin-bottom': '5px'}}>
                                                <Col span={4}>
                                                    <span>类别:{item.cmstype.name}</span>
                                                </Col>
                                                <Col span={4}>
                                                    <span>状态：{item.status === 'ENABLE' ? '发布' : '隐藏'}</span>
                                                </Col>
                                                <Col span={3}>
                                                    <span>排序：{item.order}</span>
                                                </Col>
                                                <Col span={12}>
                                                    <span>来源:{item.from}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Row style={{width: '100%'}}>
                                                <Col span={7}>
                                                    <span>发布时间：{moment(item.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                                </Col>
                                                <Col span={7}>
                                                    <span>编辑时间：{moment(item.updatedAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                                </Col>
                                                <Col span={3}>
                                                    <span>阅读数：{item.reads}</span>
                                                </Col>
                                                <Col span={3}>
                                                    <span>序号：{item.id}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={2} className={indexCss.action}>
                                    <Link to={'/cms.News/Create/' + item.id}>
                                        <a>编辑</a>|
                                    </Link>
                                    <a onClick={()=>{
                                        setId(item.id)
                                        setState(true)
                                    }}>
                                        删除
                                    </a>
                                </Col>
                            </Row>
                        </List.Item>
                    )
                }}
            />
            {/*悬浮层*/}
            <Modal
                visible={state}
                onOk={() => {
                    delCms(id)
                }}
                onCancel={() => {
                    setState(false)
                }}
            >
                <p>确定要删除吗</p>
            </Modal>
        </>
    )
}
