//react
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {ModalLink, SessionContext} from 'funweb-lib';
//antd
import {List, Row, Col, Pagination, Spin,Tabs,Form,Option,Select,Input,Button,RangePicker,message,Modal,Divider} from 'antd';
//css
import indexCss from './css/index.css'
//graphql
import {QueryRenderer, graphql} from 'react-relay';
//moment
import moment from 'moment'
//mutation

const query=graphql`
query Knowledgelist_Query($first: Int, $order: String, $skip: Int) {
    knowledge {
      policeKnowledgeBaseQueryList(first: $first, order: $order, skip: $skip) {
        edges {
          author
          bookName
          bookType
          content
          createdAt
          deletedAt
          id
          updatedAt
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
        
            <List
                header={<b>知识库列表</b>}
                dataSource={cmssData}
                renderItem={item => {
                    console.log(item);
                    return (
                        
                        <List.Item>
                            <Row>
                                <Col span={24}>
                                    <Row span={24}>
                                        <Col span={24}>
                                            <b className={indexCss.title}>{item.bookName}</b>
                                        </Col>                                                
                                        <Col span={12}>
                                            <span>作者:{item.author}</span>
                                        </Col>
                                        <Col span={24}>
                                            <Row >
                                                <Col span={8}>
                                                    <span>书类:{item.bookType}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Row style={{width: '100%'}}>
                                                <Col span={8}>
                                                    <span>发布时间：{moment(item.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                                </Col>
                                                <Col span={8} style={{textAlign:'right'}}>
                                                    <span>序号：{item.id}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Link to={'/knowledge.Knowledge/List'}>
                                    <Button type='primary' className='progress_content_btn'>
                                        <b>详情</b>
                                    </Button>
                                </Link>
                            </Row>
                            
                        </List.Item>
                    )
                    
                }}
                
            />
        </>
    )
}
