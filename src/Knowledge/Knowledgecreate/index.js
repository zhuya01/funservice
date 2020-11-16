//react
import React,{useContext,useState} from 'react'
import {SessionContext} from 'funweb-lib';
import {Redirect} from 'react-router-dom'

//antd
import {Layout, Input, Row, Col, Select, Button, Form,message,Upload} from 'antd';
//css
import indexCss from './css/index.css'
//components
import RichText from './components/richText'
//mutations
import createBase from './mutations/createBase'
import updateBase from './mutations/updateBase'
import UploadPackage from "./mutations/UploadPackage";

const {Content} = Layout;
const {Option} = Select;
//页面
export default function Page(props) {
    const uploadprops = {
        name: 'file',
        beforeUpload(file, fileList) {

        },
        customRequest({
                          action,
                          data,
                          file,
                          filename,
                          headers,
                          onError,
                          onProgress,
                          onSuccess,
                          withCredentials,
                      }) {
            const inputs = {[filename]: null}
            const uploadables = {[filename]: file}
            UploadPackage.commit(
                session.environment,
                inputs,
                uploadables,
                (response, errors) => {
                    if (errors) {
                        onError(errors, response);
                    } else {
                        onSuccess(response);
                    }
                },
                onError
            )
            return false;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {

            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const session=useContext(SessionContext)//session
    const [isPublish,setisPublish]=useState(false)//是否发布成功
    const id=props.id//知识库id
    
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
        if(formInfo.annexCreate){
            formInfo.annexCreate=formInfo.annexCreate.map(val=>{
                if(val.response)
                    return{
                        url:val.url,
                        name:val.name
                    }
                else
                    return{
                        url:val.url,
                        name:val.name
                    }
            })
        }
        else {
            formInfo.annexCreate=[]
        }
        
        if(id){
            //更新新闻
            updateBase(id,formInfo, session.environment, (response, errors) => {
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
            createBase(formInfo, session.environment, (response, errors) => {
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
                if(tmpArr[i]!==' &nbsp'&&i!==tmpArr.length-1&&tmpArr[i]!=='&nbsp'){
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
            <Redirect to={'/knowledge.Knowledge/List'}/>
        )
    //暂未发布
    return (
        <>
            <Form
                onFinish={onFinish}
                name="basic"
            >
                <Layout>
                    <Content className={indexCss.richText}>
                        <h2>知识库发布</h2>
                    <div className={indexCss.contentArea}>
                            <div className={indexCss.header_right}>
                                <Row>
                                    <Col span={4}>
                                        <Form.Item
                                            label="书名"
                                            name="bookName"
                                            rules={[{required: true, message: '书名不能为空'}]}
                                        >
                                            <Input placeholder='书名'/>
                                        </Form.Item>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col span={4}>
                                        <Form.Item
                                        label="作者："
                                            name="author"
                                            rules={[{required: true, message: '作者不能为空'}]}
                                        >
                                            <Input placeholder='作者'/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className={indexCss.contentArea}>
                            <Row>
                                <Col span={4}>
                                    <Form.Item
                                    label="书类："
                                        name="bookType"
                                        rules={[{required: true, message: '书类不能为空'}]}
                                    >
                                        <Select
                                            showSearch
                                            style={{width: '84%'}}
                                            placeholder="书类"
                                            optionFilterProp="children"
                                            // onChange={onChange}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="POLICEKNOWLEDGEBASE_A">类型A</Option>
                                            <Option value="POLICEKNOWLEDGEBASE_B">类型B</Option>
                                            <Option value="POLICEKNOWLEDGEBASE_C">类型C</Option>
                                            <Option value="POLICEKNOWLEDGEBASE_D">类型D</Option>
                                            <Option value="POLICEKNOWLEDGEBASE_E">类型E</Option>
                                        </Select>
                                    </Form.Item>

                                </Col>
                                </Row>
                                <Row>
                                    <Col span={4}>
                                        <Form.Item
                                            label="发布人："
                                            name="userName"
                                            style={{width: '87%'}}
                                            rules={[{required: true, message: '发布人不能为空'}]}
                                        >
                                            <Input placeholder='发布人'/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className={indexCss.richTextContentArea}>
                            <Form.Item
                                label="内容："
                                name="content"
                                rules={[{validator:richTextCheck}]}
                            >
                                <RichText onChange={(e)=>{}}/>
                            </Form.Item>
                        </div>
                                </Row>
                        </div>
                                
                        
                    </Content>
                    <Content>
                        <div style={{'background': 'white'}}>
                            <Row>
                                <Col span={4} offset={1}>
                                <Form.Item
                                            label={<div style={{ 'font-size':'18px','font-weight':'bold'}}>附件:</div>}
                                            name="annexCreate"
                                            rules={[{required: true,message:"请先上传附件"}]}
                                            valuePropName="file"
                                            getValueFromEvent={(e) => {
                                                return e && e.fileList && e.fileList.filter((value => value.status === 'done')).map(value => {
                                                    return {url: value.response.singleUpload.hash, name: value.originFileObj.name}
                                                })
                                            }}
                                        >
                                            <Upload  {...uploadprops} >
                                                <Button  style={{'width': '100%'}}>
                                                    上传附件
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            确定
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </Form>
        </>
    )
}

