import React, { useState, useContext } from 'react'
import { QueryRenderer, graphql } from 'react-relay';
import { Link } from "react-router-dom";
import { ModalLink, SessionContext } from 'funweb-lib';

import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    Breadcrumb,
    Table,
    Divider,
    Input,
    Button,
    Menu,
    Dropdown,
    Row,
    Col,
} from 'antd';

import {
    TableOutlined,
    CaretDownOutlined,
    PlusOutlined,
    ReloadOutlined,
    FilterOutlined,
    CaretUpOutlined,
    UndoOutlined,
    SearchOutlined,
    DeleteOutlined
} from '@ant-design/icons';

moment.locale('zh-cn');


var query = graphql`
    query List_AppPaginationQuery(
        $first: Int!
        $skip: Int
    ) {
        apps(
            first: $first
            skip: $skip
        ) {
            totalCount
            edges {
                id
                name
                space
                type
                mode
                package{
                    version
                }
                creator{
                    id
                    name
                }
                org
                remark
                createdAt
            }
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

const fieldsmenu = (
    <Menu onClick={() => { }}>
        <Menu.Item key="1">id</Menu.Item>
        <Menu.Item key="2">name</Menu.Item>
        <Menu.Item key="3">remark</Menu.Item>
        <Menu.Item key="4">createAt</Menu.Item>
    </Menu>
);

const columns = [
    {
        title: 'App ID',
        dataIndex: 'id',
        key: 'id',
        width: '8%',
        align: 'center',
    },
    {
        title: 'App Name',
        dataIndex: 'name',
        key: 'name',
        width: '17%',
        align: 'center',
    },
    {
        title: 'space',
        dataIndex: 'space',
        key: 'space',
        width: '8%',
        align: 'center',
    },
    {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
        width: '8%',
        align: 'center',
        render: (text, record, index) => {
            let ds = {
                "WEB": "PC浏览器",
                "MOBILE": "Mobile",
                "APP": "APP",
                "SERVER": "SERVER",
                "RESOURCE": "RESOURCE"
            }
            return ds[record.type]
        },
    },
    {
        title: 'mode',
        dataIndex: 'mode',
        key: 'mode',
        width: '8%',
        align: 'center',
        render: (text, record, index) => {
            let ds = {
                "DEVELOPMENT": "调试模式",
                "PRODUCTION": "生产模式",
            }
            return ds[record.mode];
        },
    },
    {
        title: 'creator',
        dataIndex: 'creator',
        key: 'creator',
        width: '10%',
        align: 'center',
        render: (text, record, index) => {
            return record.creator.name;
        },
    },
    {
        title: 'remark',
        dataIndex: 'remark',
        key: 'remark',
        width: '12%',
        align: 'center',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '15%',
        align: 'center',
        render: (text, record, index) => moment(record.createdAt).format('YYYY-MM-DD hh:mm'),
    },
    {
        title: '操作',
        key: 'action',
        width: '20%',
        align: 'center',
        render: (text, record, index) => {
            return (
                <span>
                    <Link to={"/App.App/Info/" + record.id} >查看</Link>
                    <Divider type="vertical" />
                    <ModalLink to={"/App.App/Update/" + record.id}>配置</ModalLink>
                </span >
            )
        },
    },
];

function TableView(props) {
    const [collapse, setCollapse] = useState(false);
    return (
        <>
            <Row>
                <Col span={24}>
                    <Breadcrumb style={{ margin: '15px 0px' }}>
                        <Breadcrumb.Item>应用管理</Breadcrumb.Item>
                        <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Divider />
            </Row>

            <Row>
                <Col span={12}>
                    <Dropdown overlay={actionmenu} icon={<CaretDownOutlined />}>
                        <Button>
                            操作 <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                    <Button icon={<ReloadOutlined />} type="primary" style={{ margin: 8 }} onClick={() => props.retry()}>刷新</Button>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                    <ModalLink to={"/App.App/Create/"}>
                        <Button icon={<PlusOutlined />} >新建</Button>
                    </ModalLink>

                    <Button type="primary" icon={<FilterOutlined />} style={{ margin: 8 }} onClick={() => { setCollapse(!collapse); }}>筛选 {collapse ? (<CaretUpOutlined />) : (<CaretDownOutlined />)} </Button>
                    <Dropdown overlay={fieldsmenu}>
                        <Button>
                            <TableOutlined /> <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                </Col>
            </Row>

            <div style={{ display: collapse ? "" : "none" }}>
                <Divider dashed>筛选字段</Divider>

                <Row gutter={[16, 10]} >
                    <Col span={6} offset={3}>
                        名称: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                    <Col span={6}>
                        备注: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                    <Col span={6}>
                        备注: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                </Row>

                <Row gutter={[16, 10]}>
                    <Col span={6} offset={3}>
                        名称: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                    <Col span={6}>
                        备注: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                    <Col span={6}>
                        备注: <Input style={{ maxWidth: 160 }} placeholder="Basic usage" />
                    </Col>
                </Row>

                <Row gutter={[16, 10]}>
                    <Col span={6} offset={8}>
                        <Button icon={<UndoOutlined />} style={{ margin: 12 }} >重置</Button>
                        <Button icon={<SearchOutlined />} type="primary" style={{ margin: 12 }} >搜索</Button>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col span={24}>
                    <Divider />
                    <Table
                        columns={columns}
                        rowKey={props.rowKey}
                        dataSource={props.dataSource}
                        pagination={props.pagination}
                        loading={props.loading}
                        onChange={props.onChange}
                    />
                </Col >
            </Row >
        </>
    );
}

function List(props) {
    const session = useContext(SessionContext);
    const [pageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [data, setData] = useState([]);
    let pagination = {
        current: current,
        pageSize: pageSize,
    };

    return (<QueryRenderer
        environment={session.environment}
        query={query}
        variables={{
            first: pageSize,
            skip: (current - 1) * pageSize
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            }
            let d = data;
            let loading = true;
            if (props && props.apps) {
                loading = false;
                d = props.apps.edges;
                pagination.total = props.apps.totalCount;
            }

            return <TableView
                retry={retry}
                rowKey={record => record.id}
                dataSource={d}
                pagination={pagination}
                loading={loading}
                onChange={(pagination) => {
                    setData(d);
                    setCurrent(pagination.current);
                }}
            />
        }}
    />);
}

export default List;