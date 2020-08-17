//react
import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {ModalLink, SessionContext} from 'funweb-lib';
import {Redirect} from 'react-router-dom'

//antd
import {Layout, Input, Row, Col, Select, Switch, Button, Form,message,Spin,Modal} from 'antd';
//css
import indexCss from './css/index.css'
//components
import ImageUpload from './components/imageUpload'
import RichText from './components/richText'
import FileUpload from './components/fileUpLoad'
//mutations
import createCms from './mutations/createCms'
import updateCms from './mutations/updateCms'
import deleteCms from './mutations/deleteCms'
//graphql
import { QueryRenderer, graphql  } from 'react-relay';
import moment from "moment";

const {Header, Footer, Sider, Content} = Layout;
const {Option} = Select;

let query=graphql`
query Publish_Query($id: ID!) {
  cmstypes {
    totalCount
    edges {
      id
      name
    }
  }
  cms(id: $id) {
    cmstype{
      id
      name
    }
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
    attachment
    abstract
  }
}

`

//查询
export default function (props) {
    //新闻id
    const id=props.params.id
    //session
    const session = useContext(SessionContext);
    if(id)
        return (<QueryRenderer
        //环境设置
        environment={session.environment}
        //查询语句
        query={query}
        variables={{
            id:id
        }}
        //查询过程
        render={({ error, props, retry }) => {
            if (error) {//error
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            }
            if (props && props.cms&&props.cmstypes) {//done
                return(
                   <Page
                       cmstypes={props.cmstypes.edges}
                       cms={props.cms}
                       id={id}
                   />
                )
            }
            return (//loading
                <Spin tip={'加载中'}>
                    <div  style={{ marginTop: 400 }}></div>
                </Spin>
            )
        }}
    />);
    else
        return(
            <Page
                cmstypes={{}}
                cms={{}}
                id={id}
            />
        )
}
//页面
function Page(props) {
    const session=useContext(SessionContext)//session
    const [isPublish,setisPublish]=useState(false)//是否发布成功
    const cms=props.cms//新闻详情
    const cmstypes =props.cmstypes//新闻类型
    const id=props.id//新闻id
    const [state,setState]=useState(false)//悬浮层是否可见

    //表单提交
    const onFinish = (formInfo) => {
        //排序格式化
        formInfo.order?
            formInfo.order=parseInt(formInfo.order)
            :
            formInfo.order=0
        //状态格式化
        formInfo.status===true?formInfo.status='ENABLE':formInfo.status='DISABLE'
        //封面格式化
        console.log('formInfo.pic',formInfo.pic);
        formInfo.pic?
            (formInfo.pic=formInfo.pic.fileList?formInfo.pic.fileList[0].response.singleUpload.hash:formInfo.pic)
            :
            formInfo.pic=''
        console.log('Success:', formInfo);
        //附件格式化
        if(formInfo.attachment){
            formInfo.attachment=formInfo.attachment.map(val=>{
                if(val.response)
                    return{
                        hash: val.response.singleUpload.hash,
                        name:val.name
                    }
                else
                    return{
                        hash: val.hash,
                        name:val.name
                    }
            })
        }
        else {
            formInfo.attachment=[]
        }
        if(id){
            //更新新闻
            updateCms(id,formInfo, session.environment, (response, errors) => {
                    if (errors) {
                        message.error(errors[0].message);
                    } else {

                        message.success({
                            content: '更新成功', duration: '1', onClose: () => {
                                setisPublish(true)
                            }
                        });
                    }
                },
                (errors) => {
                    message.error(errors.source.errors[0].message);
                })
        }
        else {
            //发布新闻
            createCms(formInfo, session.environment, (response, errors) => {
                    if (errors) {
                        message.error(errors[0].message);
                    } else {

                        message.success({
                            content: '发布成功', duration: '1', onClose: () => {
                                setisPublish(true)
                            }
                        });
                    }
                },
                (errors) => {
                    message.error(errors.source.errors[0].message);
                })
        }

    }

    //表单删除
    function delCms(id) {
        //发布新闻
        deleteCms(id, session.environment, (response, errors) => {
                if (errors) {
                    message.error(errors[0].message);
                } else {

                    message.success({
                        content: '删除成功', duration: '1', onClose: () => {
                            setisPublish(true)
                        }
                    });
                }
            },
            (errors) => {
                message.error(errors.source.errors[0].message);
            })
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

    //发布成功
    if(isPublish)
        return(
            <Redirect to={'/cms.News/History'}/>
        )
    //暂未发布
    return (
        <>
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
                                    initialValue={cms.pic?cms.pic:''}
                                >
                                    <ImageUpload onChange={e=>{}} pic={cms.pic}/>
                                </Form.Item>
                            </div>
                            <div className={indexCss.header_right}>
                                <Row>
                                    <Col span={20}>
                                        <Form.Item
                                            name="title"
                                            rules={[{required: true, message: '标题不能为空'}]}
                                            initialValue={cms.title}
                                        >
                                            <Input placeholder='标题'/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            name="from"
                                            rules={[{required: true, message: '来源不能为空'}]}
                                            initialValue={cms.from}
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
                                            initialValue={cms.abstract?cms.abstract:null}
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
                            <Row gutter={8} justify='center' >
                                <Col span={4}>
                                    <Form.Item
                                        name="cmstypeid"
                                        rules={[{required: true, message: '类别不能为空'}]}
                                        initialValue={cms.cmstype?cms.cmstype.id:null}
                                    >
                                        <Select
                                            disabled={cms.cmstype?true:false}
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder="类别"
                                            optionFilterProp="children"
                                            // onChange={onChange}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="cmstype-1">类型a</Option>
                                            <Option value="cmstype-2">类型b</Option>
                                            <Option value="cmstype-3">类型c</Option>
                                        </Select>
                                    </Form.Item>

                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        name="order"
                                        rules={[{ type: 'number', message: '请输入数字',transform(value) {
                                                if(value){
                                                    return Number(value);
                                                }
                                            }}]}
                                        initialValue={cms.order}
                                    >
                                        <Input placeholder='排序'/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="remark"
                                        initialValue={cms.remark}
                                    >
                                        <Input placeholder='' addonBefore='备注'/>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item
                                        name="status"
                                        initialValue={cms.status==="DISABLE"?false:true}
                                    >
                                        <Switch checkedChildren="发布" unCheckedChildren="隐藏" defaultChecked={cms.status==="DISABLE"?false:true} onChange={(e)=>{}}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {
                                id? <Row justify='center' style={{'margin-bottom':'10px'}}>
                                    <Col span={5}>
                                        <span>发布时间：{moment(cms.createdAt).utc().add(8,'hours').format('YYYY-MM-DD HH:mm')}</span>
                                    </Col>
                                    <Col span={5}>
                                        <span>更新时间：{moment(cms.updatedAt).utc().add(8,'hours').format('YYYY-MM-DD HH:mm')}</span>
                                    </Col>
                                    <Col span={5}>
                                        <span>新闻序号：{cms.id}</span>
                                    </Col>
                                    <Col span={3}>
                                        <span>阅读数：{cms.reads}</span>
                                    </Col>
                                </Row>:null
                            }
                        </div>
                    </Content>
                    <Content className={indexCss.richText}>
                        <div className={indexCss.richTextContentArea}>
                            {/*富文本框高度调整richText.js中Editor标签的height属性*/}
                            <Form.Item
                                name="content"
                                rules={[{validator:richTextCheck}]}
                                initialValue={cms.content}
                            >
                                <RichText onChange={(e)=>{}} content={cms.content}/>
                            </Form.Item>
                        </div>
                    </Content>
                    <Content>
                        <div style={{'background': 'white'}}>
                            <Row>
                                <Col span={4} offset={1}>
                                    <Form.Item
                                        name="attachment"
                                        initialValue={cms.attachment?cms.attachment:[]}
                                    >
                                        <FileUpload onChange={e=>{}} attachment={cms.attachment}/>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            確定
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    {
                                        id?
                                            <Button type="primary"  onClick={()=>{setState(true)}}>删除</Button>:
                                            null
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </Form>
            {/*悬浮层*/}
            <Modal
                visible={state}
                onOk={()=>{delCms(id)}}
                onCancel={()=>{setState(false)}}
            >
                <p>确定要删除吗</p>
            </Modal>
        </>
    )
}

