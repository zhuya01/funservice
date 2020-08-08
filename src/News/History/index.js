//react
import React from 'react'
//antd
import {List,Row,Col,Pagination} from 'antd';
//css
import indexCss from './css/index.css'
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export default function () {

    //分页
    const Page=()=>(
        <Pagination defaultCurrent={1} total={50} />
    )

    return(
        <List
            header={<b>历史发布</b>}
            footer={<Page/>}
            bordered
            dataSource={data}
            renderItem={item => (
                <List.Item>
                   <Row style={{width:'100%'}}>
                       <Col span={5}>
                           <div className={indexCss.pic}>
                               封面
                           </div>
                       </Col>
                       <Col span={17}>
                           <Row>
                               <Col span={24}>
                                  <span className={indexCss.title}>{item}</span>
                               </Col>
                               <Col span={24}>
                                   <p className={indexCss.abstract}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                               </Col>
                               <Col span={24}>
                                   <Row style={{width:'100%','margin':'5px'}}>
                                       <Col span={4}>
                                            <span>类别:治安管理</span>
                                       </Col>
                                       <Col span={4}>
                                           <span>状态：已发布</span>
                                       </Col>
                                       <Col span={3}>
                                           <span>排序：0</span>
                                       </Col>
                                       <Col span={12}>
                                           <span>来源:苏州公安局总部</span>
                                       </Col>
                                   </Row>
                               </Col>
                               <Col span={24}>
                                   <Row style={{width:'100%'}}>
                                       <Col span={7}>
                                           <span>发布时间:2020-8-8 17:18:01</span>
                                       </Col>
                                       <Col span={7}>
                                           <span>编辑时间:2020-8-8 17:18:01</span>
                                       </Col>
                                       <Col span={3}>
                                           <span>阅读数：0</span>
                                       </Col>
                                       <Col span={3}>
                                           <span>序号:news-1</span>
                                       </Col>
                                   </Row>
                               </Col>
                           </Row>
                       </Col>
                       <Col span={2}>
                           <Row style={{'height':'50%'}}>
                               <Col>
                                   <a style={{'line-height':'60px'}}>预览</a>
                               </Col>
                           </Row>
                           <Row style={{'height':'50%'}}>
                               <Col>
                                   <a style={{'line-height':'60px'}}>删除</a>
                               </Col>
                           </Row>
                       </Col>
                   </Row>
                </List.Item>
            )}
        />
    )
}
