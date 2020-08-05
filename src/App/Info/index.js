import React, { useContext } from 'react'
import { QueryRenderer, graphql } from 'react-relay';
import { ModalLink, SessionContext } from 'funweb-lib';

import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    Breadcrumb,
    Card,
    Divider,
    Button,
    Menu,
    Dropdown,
    Row,
    Col,
} from 'antd';

import {
    CaretDownOutlined,
    DeleteOutlined,
    FormOutlined,
    ToolOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';

// import Packages from '../../Package/List'

moment.locale('zh-cn');

var query = graphql`
    query Info_AppInfoQuery(
        $id: ID
    ) {
        app(
            id: $id
        ) {
            id
            name
            space
            type
            mode
            url
            package{
                version
            }
            remark
            createdAt
            updatedAt
        }
    }`


const actionmenu = (
    <Menu onClick={() => { }}>
        <Menu.Item key="1">
            <DeleteOutlined />
            禁 用
        </Menu.Item>
    </Menu>
);

function TableView(props) {
    const { dataSource } = props;
    const ds = {
        "WEB": "PC浏览器",
        "MOBILE": "Mobile",
        "APP": "APP",
        "SERVER": "SERVER",
        "RESOURCE": "RESOURCE"
    };
    const ts = {
        "DEVELOPMENT": "开发模式", "PRODUCTION": "生产模式"
    };
    return (
        <>
            <Row>
                <Col span={24}>
                    <Breadcrumb style={{ margin: '15px 0px' }}>
                        <Breadcrumb.Item>应用管理</Breadcrumb.Item>
                        <Breadcrumb.Item>应用</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Divider />

            <Row gutter={[16, 16]} >
                <Col span={3} offset={3}>
                    应用ID: {dataSource.id}
                </Col>
                <Col span={3} offset={3}>
                    名称: {dataSource.name}
                </Col>
                <Col span={10} style={{ textAlign: "right" }}>
                    <Button icon={<ToolOutlined />} style={{ margin: 2 }} onClick={() => props.retry()}>发版</Button>
                    <Dropdown overlay={actionmenu} icon={<CaretDownOutlined />}>
                        <Button>
                            操作 <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                    <ModalLink to={"/App.App/Update/" + dataSource.id}>
                        <Button type="primary" icon={<FormOutlined />} style={{ margin: 2 }}>修改</Button>
                    </ModalLink>
                </Col>
            </Row>
            <Row gutter={[16, 16]} >
                <Col span={6} offset={3}>
                    空间: {dataSource.space}
                </Col>
                <Col span={6}>
                    类型: {ds[dataSource.type]}
                </Col>
            </Row>

            <Row gutter={[16, 16]} >
                <Col span={6} offset={3}>
                    模式: {ts[dataSource.mode]}
                </Col>
                <Col span={12}>
                    {
                        dataSource.mode === "DEVELOPMENT" &&
                        <>
                            调试地址: {dataSource.url}
                        </>
                    }
                    {
                        dataSource.mode === "PRODUCTION" &&
                        <>
                            版本: {dataSource.package && dataSource.package.version}
                        </>
                    }
                </Col>
            </Row>

            <Row gutter={[16, 16]} >
                <Col span={6} offset={3}>
                    创建时间: {moment(dataSource.createdAt).format('YYYY-MM-DD hh:mm')}
                </Col>
                <Col span={6}>
                    修改时间: {moment(dataSource.updatedAt).format('YYYY-MM-DD hh:mm')}
                </Col>
                <Col span={6}>

                </Col>
            </Row>

            <Row gutter={[16, 16]} >
                <Col span={6} offset={3}>
                    备注: {dataSource.remark}
                </Col>
                <Col span={6}>
                </Col>
                <Col span={6}>

                </Col>
            </Row>
            <Divider dashed="true" />

            <Card type="inner" title="版本发布历史" extra={<ModalLink to={"/App.App.Package/Create/" + dataSource.id}>
                <Button type="link" icon={<PlusCircleOutlined />} style={{ margin: 2 }}>发布</Button>
            </ModalLink>}>
                {/* <Packages AppPackages={dataSource} id={dataSource.id}></Packages> */}
            </Card>
        </>
    );
}

function List(props) {
    const session = useContext(SessionContext);
    const data = {};

    return (<QueryRenderer
        environment={session.environment}
        query={query}
        variables={{
            id: props.params.id,
            first: 10,
            skip: 0
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            }
            let d = data;
            if (props && props.app) {
                d = props.app;
            }
            return <TableView
                retry={retry}
                dataSource={d}
            />
        }}
    />);
}

export default List;