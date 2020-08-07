//react
import React from 'react'
//antd
import { Layout,Input,Row, Col,Select   } from 'antd';
//css
import indexCss from './css/index.css'
//components
import ImageUpload from './components/imageUpload'

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export default function () {
    return(
        <Layout>
            <Content className={indexCss.header}>
                <div  className={indexCss.contentArea}>
                    <div className={indexCss.imageUpload}>
                        <ImageUpload/>
                    </div>
                    <div className={indexCss.header_right}>
                        <Row>
                            <Col span={20}>
                                <Input placeholder='标题' />
                            </Col>
                            <Col span={4}>
                                <Input placeholder='来源'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Input.TextArea placeholder='摘要' className={indexCss.abstract} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </Content>
            <Content>
                <div className={indexCss.contentArea}>
                    <Row>
                        <Col span={4}>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="类别"
                                optionFilterProp="children"
                                // onChange={onChange}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Content>富文本框</Content>
            <Content>相关按钮</Content>
        </Layout>
    )
}
