//react
import React,{useContext,useState} from 'react'
//antd
import {Layout, Input, Row, Col, Select, Button, Form,message,Link,Breadcrumb,List} from 'antd';
//graphql
import {QueryRenderer, graphql} from 'react-relay';
import {ModalLink, SessionContext} from 'funweb-lib';
//css
import indexCss from './css/index.css'
//moment
import moment from 'moment'
//mutation
const query=graphql`
query Knowledgecontent_Query($id: ID!) {
    knowledge {
      policeKnowledgeBaseQuery(id: $id) {
        id
        title
        content
        createdAt
      }
    }
    viewer {
      id
      user {
        ... on Employee {
          id
          name
        }
      }
    }
  }
  
  `


//页面
export default function Page(props) {
    const io=props.query.get('id')
    console.log(io);
    const session = useContext(SessionContext);
    const [pageNum, setPageNum] = useState('1');//页码
    return (
    <QueryRenderer
        //环境设置
        environment={session.environment}
        //查询语句
        query={query}
        variables={{
            id:io
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
                    < Detail
                       {...props}
                        
                    />
                )
            }
            }
            
            
            // return (//loading
            //     <Spin tip={'加载中'}>
            //         <div style={{marginTop: 400}}></div>
            //     </Spin>
    //         // )
       }
        
    />);
    }
function Detail(props) {
        let viewData =[];
        if (props&&props.viewer){
        
            viewData = props.viewer.user;
            console.log(props.viewer.user);
        }
        let cmssData ={};
        if(props&&props.knowledge)
        {
        cmssData = props.knowledge.policeKnowledgeBaseQuery;
        console.log(props.knowledge.policeKnowledgeBaseQuery);
        }

    return (
            
        <>
            {/* <Layout style={{backgroundColor:"white"}}>
                        <Breadcrumb  className={indexCss.head_bread} separator="" >
                        <Breadcrumb.Item>
                        <Link to="/commander.WorkingTable/BasicList" className="watchkeerper_headgzt"><b>工作台</b></Link>
                        <Breadcrumb.Separator />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                        <Link to="/knowledge.Knowledge/Content" className="watchkeerper_headgzt"><b>知识库详情</b></Link>
                        <Breadcrumb.Separator />
                        </Breadcrumb.Item>
                        </Breadcrumb>
                </Layout> */}
            <div className={indexCss.content}>
                <Row>
                                <Col span={24}>
                                    <Row span={24}>
                                        <Col span={24}>
                                            <span className={indexCss.title}>{cmssData.title}</span>
                                        </Col>
                                        <Col>
                                            <span className={indexCss.name}>来源：{viewData.name}</span>
                                        </Col>
                                        <Col span={24}>
                                            <span className={indexCss.time}>发布时间：{moment(cmssData.createdAt).utc().add(8, 'hours').format('YYYY-MM-DD HH:mm')}</span>
                                        </Col>                                                
                                    </Row>
                                    <Row style={{width: '100%',offset:30}}>
                                                <Col>
                                                    <span className={indexCss.title}>{cmssData.content}</span>
                                                </Col>
                                                {/* <Col className={indexCss.id}>
                                                    <span>序号：{cmssData.id}</span>
                                                </Col> */}
                                    </Row>

                                        <Button  type="primary" htmlType="submit">
                                            返回
                                        </Button>
                                    
                                </Col>
                    </Row>
                    
            </div>
                        
        </>
    )

}