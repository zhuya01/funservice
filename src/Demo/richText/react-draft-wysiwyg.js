import React from 'react'
import {Button, Col, Form, Input} from "antd";

export default  function () {
    function onFinish(e) {
        console.log('suceeess',e);
    }
    return(
        <div>
            <Form
                onFinish={onFinish}
                name="basic"
            >
                <Form.Item>
                    <Input/>
                </Form.Item>
            </Form>
            <Form
                onFinish={onFinish}
                name="basic2"
            >
                <Form.Item>
                  <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        確定
                    </Button>
                </Form.Item>
            </Form>
        </div>


    )
}
