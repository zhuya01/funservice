//react
import React,{useContext,useState} from 'react'
import {SessionContext} from 'funweb-lib'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

//antd
import {Layout, Input, Row, Col, Select, Button, Form,message,Upload,Breadcrumb} from 'antd';
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
    const formCol_labelCol=props.formCol_labelCol//表单Col中标签样式
    const formCol_wrapperCol=props.formCol_wrapperCol//表单Col中内容样式
    const col_span=props.col_span//col样式
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
        console.log(formInfo)
        //排序格式化
        formInfo.order?
            formInfo.order=parseInt(formInfo.order)
            :
            formInfo.order=0
        //状态格式化
        formInfo.status===true?formInfo.status='ENABLE':formInfo.status='DISABLE'
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
            //更新知识库
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
            //发布知识库
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
                className='form'
                name="form_content"
                initialValues={{remember: true}}
                onFinish={onFinish}
                labelAlign={'center'}
                fontSize="17px"
                labelCol={{span: 12}}
                wrapperCol={{span: 16}}
            >
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
                        </Breadcrumb>
                </Layout>
                    <Content className={indexCss.richText}>
                        <div className={indexCss.contentArea}>
                            <Row className={indexCss.text} style={{marginTop:"35px"}}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="标题"
                                            name="title"
                                            wrapperCol={{span:20,offset:7}}
                                            labelCol={{span:formCol_labelCol}}
                                            rules={[{required: true, message: '标题不能为空'}]}
                                        >
                                            <Input className={indexCss.input} placeholder='标题'/>
                                        </Form.Item>
                                    </Col>
                            </Row>
                            <Row className={indexCss.text}>
                                <Col span={8}>
                                    <Form.Item
                                        label="分类："
                                        name="bookType"
                                        rules={[{required: true, message: '分类不能为空'}]}
                                        wrapperCol={{span: formCol_wrapperCol,offset:7}}
                                        labelCol={{span:formCol_labelCol}}
                                    >
                                        <Select
                                            className={indexCss.select}
                                            showSearch
                                            placeholder="分类"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="POLICEKNOWLEDGEBASE_A">交通</Option>
                                            <Option value="POLICEKNOWLEDGEBASE_B">消防</Option>
                                            <Option value="POLICEKNOWLEDGEBASE_C">刑事</Option>
                                            <Option value="POLICEKNOWLEDGEBASE_D">治安</Option>
                                            <Option value="POLICEKNOWLEDGEBASE_E">人口管理</Option>
                                        </Select>
                                    </Form.Item>

                                </Col>
                                </Row>
                                    <Row className={indexCss.text}>
                                        <Col>
                                        <Form.Item
                                        label="知识库内容"
                                        name="content"
                                        labelCol={{span: 100}}
                                        rules={[{required: true, message: ' '}, {validator: richTextCheck}]}
                                        wrapperCol={{span:1000,offset:3}}
                                    >
                                        <RichText onChange={(e) => {
                                        }} placeholer={'请输入知识库内容'}/>
                                        </Form.Item>
                                        </Col>
                                    </Row>
                            <Row className={indexCss.text}>
                                <Col span={4} offset={1}>
                                <Form.Item
                                            label="附件"
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
                                <Col span={2} offset={6}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            发送
                                        </Button>
                                    </Form.Item>
                                </Col> 
                            </Row>
                        </div>
                    </Content>
            </Form>
        </>
    )
}

