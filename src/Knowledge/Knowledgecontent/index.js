//react
import React,{useContext,useState} from 'react'
import {SessionContext} from 'funweb-lib';
import {Redirect} from 'react-router-dom'

//antd
import {Layout, Input, Row, Col, Select, Button, Form,message,Link} from 'antd';
//页面


export default function Page(props) {
    console.log(props);
    const col_lab_span = 5
    const col_wrapper_span = 15
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
    return (
            <>
                    <Row className='content'>
                        <Col span={24}>
                            <Row className='content_top clearfix'>
                                <Col span={0.5} className="basic_icon"></Col>
                                <Col span={23.5} className="basic_tit"><b>详情</b></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row>
                            <Col span={col_wrapper_span} style={{"margin-top": "20px"}}>
                                <b>{props.bookName}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={col_lab_span} style={{"margin-top": "20px"}}>
                                <b>作者</b>
                            </Col>
                            <Col span={col_wrapper_span} style={{"margin-top": "20px"}}>
                                <b>{props.author}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={col_lab_span} style={{"margin-top": "20px"}}>
                                <b>书类:</b>
                            </Col>
                            <Col span={col_wrapper_span} style={{"margin-top": "20px"}}>
                                <b>{props.bookType}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={col_lab_span} style={{"margin-top": "20px"}}>
                                <b>内容:</b>
                            </Col>
                            <Col span={col_wrapper_span} style={{"margin-top": "20px"}}>
                                <b>{props.content}</b>
                            </Col>
                        </Row>
                        <Link to='/knowledge.Knowledge/List'>
                            <Button type='primary' className='progress_content_btn'>
                                <b>返回</b>
                            </Button>
                        </Link>
            </div>
        </>
    )
}

