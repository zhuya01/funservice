import React, { useContext, useState } from 'react'
import { QueryRenderer, graphql } from 'react-relay';
import { SessionContext } from 'funweb-lib'
import {
    Form,
    Input,
    Button,
    Radio,
    message,
    Select,
    AutoComplete
} from 'antd';

import UpdateApp from "./mutations/"


var query = graphql`
    query Update_AppInfoQuery(
        $id: ID
    ) {
        app(
            id: $id
        ) {
            id
            name
            space
            type
            config
            mode
            url
            package{
                id
                version
            }
            remark
            createdAt
            updatedAt
            packages (first: 999){
                edges{
                    id
                    version
                }
                totalCount
            }
        }
    }`


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

const ModalForm = props => {
    const [form] = Form.useForm();
    const { dataSource, onCancel } = props;
    const session = useContext(SessionContext);
    const initialValues = {
        id: dataSource.id,
        name: dataSource.name,
        space: dataSource.space,
        type: dataSource.type,
        config: dataSource.config,
        mode: dataSource.mode,
        url: dataSource.url,
        version: dataSource.package && dataSource.package.id,
        remark: dataSource.remark,
    }

    const [url, setUrl] = useState(initialValues.url);//动态写值到url

    const onFinish = values => {
        UpdateApp.commit(session.environment, values.id, values.name, values.space, values.type, values.config, values.mode, url, values.version, values.remark, (response, errors) => {
            if (errors) {
                message.error(errors[0].message);
            } else {
                message.success('更新APP成功');
                if (onCancel) onCancel();
            }
        },
            (errors) => {
                message.error(errors.source.errors[0].message);
            })
    };

    const changeMode = e => {
        // console.log(e.target.value)
        // form.setFieldsValue({ url: "x" });
        // form.setFieldsValue({ status: e.target.value })
    }

    return (
        <Form {...layout} form={form} name="update-app" onFinish={onFinish} validateMessages={validateMessages} initialValues={initialValues}>
            <Form.Item name='id' label="应用ID" rules={[{ required: true }]}>
                <Input disabled />
            </Form.Item>
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
                <Radio.Group onChange={changeMode}>
                    <Radio.Button value="DEVELOPMENT">调试模式</Radio.Button>
                    <Radio.Button value="PRODUCTION">生产模式</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.mode !== currentValues.mode}
            >
                {({ getFieldValue }) => {
                    return getFieldValue('mode') === 'DEVELOPMENT' ? (
                        <Form.Item name="url" label="url" rules={[{ required: true }]}>
                            <Input.Group compact >
                                <AutoComplete
                                    onChange={setUrl}
                                    value={url}
                                    style={{ width: '100%' }}
                                    options={[{ value: 'http://127.0.0.1:8081/main.js' }]}
                                />
                            </Input.Group>
                        </Form.Item>
                    ) : (<Form.Item name='version' label="版本" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                        >
                            {dataSource.packages && dataSource.packages.edges.map((item, index) => (<Select.Option key={index} value={item.id}>{item.version}</Select.Option>))}
                        </Select>
                    </Form.Item>);
                }}
            </Form.Item>

            <Form.Item name='remark' label="备注">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">修改</Button>
            </Form.Item>
        </Form>
    );
};

function UpdateForm(props) {
    const { onCancel } = props;
    const session = useContext(SessionContext);
    props.title("修改应用信息");

    return (<QueryRenderer
        environment={session.environment}
        query={query}
        variables={{
            id: props.params.id,
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            }
            if (props && props.app) {
                return (
                    <ModalForm
                        dataSource={props.app}
                        onCancel={onCancel}
                    />)
            }
            return <></>
        }}
    />);
}

export default UpdateForm;