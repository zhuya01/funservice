import React from "react";
import { Button } from 'antd';
import app from './App'
import styles from './index.css'
import './index.global.css'
import img1 from './imgs/react.svg'

let Hello = () => {
    return <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>

        <div className={styles.bg1}>background-image</div>
        <img className={styles.img1} src={img1} alt="react" />
        <br />

        <div className="cssglobal" style={{ color: 'green' }}>css test 1: global css</div>
        <div className="cssgeneral" style={{ color: 'green' }}>css test 2: general css</div>
        <div className={styles.module} style={{ color: 'green' }}>css test 3: module css</div>
    </div>;
};


export default {
    App: app,
    Hello: Hello
};

