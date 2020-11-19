//react
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {ModalLink, SessionContext} from 'funweb-lib';
//antd
import {List, Row, Col,Button,Breadcrumb,Layout,Divider} from 'antd';
//css
import indexCss from './css/index.css'
//graphql
import {QueryRenderer, graphql} from 'react-relay';
//moment
import moment from 'moment'
//mutation

const query=graphql`
query Knowledgelist_Query($first: Int, $order: String, $skip: Int) {
    viewer {
        id
        username
        user {
          ... on Employee {
            id
            name
          }
        }
      }
    knowledge {
      policeKnowledgeBaseQueryList(first: $first, order: $order, skip: $skip) {
        edges {
          content
          title
          createdAt
          id
          annexCreate {
            name
            url
          }
        }
        totalCount
      }
    }
  }
  `
//   const type_dir = {
//     'POLICEKNOWLEDGEBASE_A': '交通',
//     'POLICEKNOWLEDGEBASE_B': '消防',
//     'POLICEKNOWLEDGEBASE_C': '刑事',
//     'POLICEKNOWLEDGEBASE_D': '治安',
//     'POLICEKNOWLEDGEBASE_E': '人口管理',

// }
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
            first:200,
            order:"",
            skip:(pageNum - 2) * 5

        }}
        //查询过程
        render={({error, props, retry}) => {
            
            if (error) {//error
                return (
                    <div>
                        <h1>Error!</h1><br/>{error.message}
                    </div>)
            }else{
                console.log(props);
                return (
                    <Page
                       {...props}
                        pageNum={pageNum}
                    />
                )
            }
            }
            
            
            // return (//loading
            //     <Spin tip={'加载中'}>
            //         <div style={{marginTop: 400}}></div>
            //     </Spin>
            // )
        }
        
    />);
}

function Page(props) {
    let viewData =[];
    if (props&&props.viewer){
       
        viewData = props.viewer.user;
        console.log(props.viewer.user);
    }
    let cmssData =[];
    if (props&&props.knowledge){
       
        cmssData = props.knowledge.policeKnowledgeBaseQueryList.edges
        console.log(props.knowledge.policeKnowledgeBaseQueryList.edges);
    }
    
    
    // const totalCount = props.knowledge.totalCount
    // //分页
    // const Page = () => (
    //     <Pagination
    //         defaultCurrent={props.pageNum}
    //         total={totalCount}
    //         pageSize={5}
    //         onChange={props.pageChange}
    //     />
    // )

    return (
        <>
                
                <Layout style={{backgroundColor:"white"}}>
                        <Breadcrumb  className={indexCss.head_bread} separator="" >
                        <Breadcrumb.Item>
                        <Link to="/commander.WorkingTable/BasicList" className="watchkeerper_headgzt"><b>工作台</b></Link>
                        <Breadcrumb.Separator />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                        <Link to="/knowledge.Knowledge/Create" className="watchkeerper_headgzt"><b>知识库发布</b></Link>
                        <Breadcrumb.Separator />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                        <Link to="/knowledge.Knowledge/List" className="watchkeerper_headgzt"><b>知识库列表</b></Link>
                        <Breadcrumb.Separator />
                        </Breadcrumb.Item>
                        </Breadcrumb>
                </Layout>
                <Layout >
                    <div  className={indexCss.create}>
                    <Link  className={indexCss.new} to="/knowledge.Knowledge/Create">
                        <b>新建知识库</b><Divider />
                    </Link>
                    
                    </div>
                </Layout>
                
            <List
                    className={indexCss.list}
                    dataSource={cmssData}
                    renderItem={item => {
                    console.log(item);
                    return (
                        
                        <List.Item
                            className={indexCss.row}
                        >
                            <div>
                                <Row>
                                <Col span={24}>
                                    <Row span={24}>
                                        <Link to={{pathname: `/knowledge.Knowledge/Content/`,search: `?id=${item.id}`,}}>
                                            <Col className={indexCss.title} span={24}>
                                            <b >{item.title}</b>
                                            </Col>
                                        </Link>
                                        <Col>
                                            <b className={indexCss.title}>{item.userName}</b>
                                        </Col>                                                
                                        {/* <Col span={24}>
                                            <Row >
                                                <Col span={8}>
                                                    <span>书类:{type_dir[item.bookType]}</span>
                                                </Col>
                                            </Row>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                                <span className={indexCss.time}>发布时间：{moment(item.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                                <span className={indexCss.name}>来源:{viewData.name}</span>
                                                {/* <span className={indexCss.id}>{item.id}</span> */}
                                    </Row>
                                    <Row>
                                    <Link to={{pathname: `/knowledge.Knowledge/Content/`,search: `?id=${item.id}`,}}>
                                            <span className={indexCss._39L79oV5nMBs8NmbA_h7RV}></span>
                                            <a href="/knowledge.Knowledge/Content" style={{color:"black"}}>查询</a>
                                    </Link>
                                    </Row>
                                </Col>
                                
                            </Row>
                            </div>
                            
                            
                        </List.Item>
                    )
                    
                }}
                
            />
        </>
    )
}
