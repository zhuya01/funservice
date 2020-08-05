import React, { useContext, useState } from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    message,
    AutoComplete
} from 'antd';
import { SessionContext } from 'funweb-lib'
import CreateApp from "./mutations/"


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '这是必填字段!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
};

const CreateForm = props => {
    const session = useContext(SessionContext);
    props.title("创建应用信息");
    const { onCancel } = props;
    const [url, setUrl] = useState(''); //动态写值到url

    const onFinish = values => {
        CreateApp.commit(session.environment, values.name, values.space, values.type, values.config, values.mode, url, values.remark, (response, errors) => {
            if (errors) {
                message.error(errors[0].message);
            } else {
                message.success('创建APP成功');
                if (onCancel) onCancel();
            }
        },
            (errors) => {
                message.error(errors.source.errors[0].message);
            })
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name='name' label="应用名称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="space" label="应用空间" rules={[{ required: true }]}>
                <Select>
                    <Select.Option value="CORE">CORE</Select.Option>
                    <Select.Option value="SYSTEM">SYSTEM</Select.Option>
                    <Select.Option value="FRAME">FRAME</Select.Option>
                    <Select.Option value="USER">USER</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="type" label="应用类型" rules={[{ required: true }]}>
                <Select>
                    <Select.Option value="WEB">PC浏览器</Select.Option>
                    <Select.Option value="MOBILE" disabled>Mobile</Select.Option>
                    <Select.Option value="APP" disabled>APP</Select.Option>
                    <Select.Option value="SERVER">Server</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name='config' label="应用配置" rules={[{ required: true }]}>
                <Input.TextArea autoSize={true} />
            </Form.Item>
            <Form.Item name="mode" label="应用模式" rules={[{ required: true }]}>
                <Radio.Group>
                    <Radio.Button value="DEVELOPMENT">调试模式</Radio.Button>
                    <Radio.Button value="PRODUCTION">生产模式</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="url" label="调试地址">
                <Input.Group compact >
                    <AutoComplete
                        value={url}
                        onChange={setUrl}
                        style={{ width: '100%' }}
                        options={[{ value: 'http://127.0.0.1:8081/main.js' }]}
                    />
                </Input.Group>
            </Form.Item>
            {/* <Form.Item name='version' label="版本">
                <Input />
            </Form.Item> */}
            <Form.Item name='remark' label="备注">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">创建</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateForm;