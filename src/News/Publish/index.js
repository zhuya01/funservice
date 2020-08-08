//react
import React from 'react'
//antd
import {Layout, Input, Row, Col, Select, Switch, Button, Form} from 'antd';
//css
import indexCss from './css/index.css'

//components
import ImageUpload from './components/imageUpload'
import RichText from './components/richText'
import FileUpload from './components/fileUpLoad'

const {Header, Footer, Sider, Content} = Layout;
const {Option} = Select;

export default function () {

    //表单提交
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    //富文本--不能为空
    function richTextCheck(rule, value) {
        //去标签
        let regex = /(<([^>]+)>)/ig
        let noHtmlVal=value.toString('html').replace(regex, '')

        let flag=false;//默认不通过

        if(noHtmlVal===''){
            return Promise.reject('请输入具体的内容');
        }
        else{
            //判断是否全是空格
            let tmpArr=noHtmlVal.split(';')
            console.log(tmpArr);
            for(let i=0;i<tmpArr.length;i++){
                if(tmpArr[i]!=' &nbsp'&&i!=tmpArr.length-1&&tmpArr[i]!='&nbsp'){
                    flag=true
                }
                if(i===tmpArr.length-1&&flag===false){
                    tmpArr[tmpArr.length-1]===''?flag=false:flag=true
                }
            }

        }
        if(flag)
            return Promise.resolve();
        else
            return Promise.reject('请输入具体的内容');


    }
    return (
        <Form
            onFinish={onFinish}
            name="basic"
        >
            <Layout>
                <Content className={indexCss.header}>
                    <div className={indexCss.contentArea}>
                        <div className={indexCss.imageUpload}>
                            <Form.Item
                                name="pic"
                            >
                                <ImageUpload onChange={e=>{}}/>
                            </Form.Item>
                        </div>
                        <div className={indexCss.header_right}>
                            <Row>
                                <Col span={20}>
                                    <Form.Item
                                        name="title"
                                        rules={[{required: true, message: '标题不能为空'}]}
                                    >
                                        <Input placeholder='标题'/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        name="from"
                                        rules={[{required: true, message: '来源不能为空'}]}
                                    >
                                        <Input placeholder='来源'/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="abstract"
                                        rules={[{required: true, message: '摘要不能为空'}]}
                                    >
                                        <Input.TextArea placeholder='摘要' rows={3}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Content>
                <Content className={indexCss.status}>
                    <div className={indexCss.contentArea}>
                        <Row justify='center' style={{'margin-bottom':'10px'}}>
                            <Col span={5}>
                                <span>发布时间</span>
                            </Col>
                            <Col span={5}>
                                <span>更新时间</span>
                            </Col>
                            <Col span={5}>
                                <span>新闻序号</span>
                            </Col>
                            <Col span={3}>
                                <span>阅读数</span>
                            </Col>
                        </Row>
                        <Row gutter={8} justify='center' >
                            <Col span={4}>
                                <Form.Item
                                    name="type"
                                    rules={[{required: true, message: '类别不能为空'}]}
                                >
                                    <Select
                                        showSearch
                                        style={{width: '100%'}}
                                        placeholder="类别"
                                        optionFilterProp="children"
                                        // onChange={onChange}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="jack">a</Option>
                                        <Option value="lucy">b</Option>
                                        <Option value="tom">c</Option>
                                    </Select>
                                </Form.Item>

                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    name="order"
                                >
                                    <Input placeholder='排序'/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="remark"
                                >
                                    <Input placeholder='' addonBefore='备注'/>
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item
                                    name="status"
                                    initialValue={true}
                                >
                                    <Switch checkedChildren="发布" unCheckedChildren="隐藏" defaultChecked onChange={(e)=>{}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Content>
                <Content className={indexCss.richText}>
                    <div className={indexCss.richTextContentArea}>
                        {/*富文本框高度调整richText.js中Editor标签的height属性*/}
                        <Form.Item
                            name="content"
                            rules={[{validator:richTextCheck}]}
                            initialValue={''}
                        >
                            <RichText onChange={(e)=>{}}/>
                        </Form.Item>
                    </div>
                </Content>
                <Content>
                    <div style={{'background': 'white'}}>
                        <Row>
                            <Col span={4} offset={1}>
                                <Form.Item
                                    name="file"
                                >
                                    <FileUpload onChange={e=>{}}/>
                                </Form.Item>
                            </Col>
                            <Col span={2} offset={12}>
                                <Button type="primary">预览</Button>
                            </Col>
                            <Col span={2}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        確定
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Button type="primary">删除</Button>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Form>
    )
}
