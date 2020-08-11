//react
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
//css
import previewCss from '../css/preview.css'
import '../css/preview.global.css'
//components


/*模拟数据*/
import {newsInfo} from "../../../Demo/asseets/newsInfo";
const news=newsInfo[1]
const htmlStr=`
<p>&nbsp;</p>
<p>&nbsp; <span style="font-size: 14pt;">&nbsp; </span></p>
<p><span style="font-size: 14pt;"><span style="background-color: #fbeeb8;"><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="../storage/9c0e14432bc682239f2031551d01bf13" alt="" width="382" height="269" />&nbsp;</strong></span></span></p>
<p><span style="font-size: 14pt;"><span style="background-color: #fbeeb8;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; 2020年</strong></span></span>，注定是不平凡的一年。 岁在庚子，新冠肺炎疫情突如其来，面对这场遭遇仗，从大年初一开始，全市公安机关和广大公安民警、辅警便以一种全新的战斗姿态，全身心、超负荷、快节奏地投入疫情防控阻击战，高标准推进防风险、护安全、战疫情、保稳定各项工作。 淬火成钢担重任，危难关头见真章。今年3月，为了进一步统筹疫情防控和年度重点工作，加快推进公安工作高质量发展，苏州公安进一步确立提档升级的&ldquo;硬目标&rdquo;，全力打好创新发展的&ldquo;升段赛&rdquo;，重点要实现&ldquo;八大目标&rdquo;，即：维护稳定要有实兜底、打防犯罪要有硬指标、</p>
`

export default function Details(props) {

    return(
            <div className="zljs zljsnr clearfix" style={{"position":"relative"}}>
                <div className="newsxqbt clearfix">
                    <div>{news.title}</div>
                </div>
                <div style={{'text-align':'center','display':'flex','justify-content': 'center'}}>
                    <div>来源：{news.source}</div>
                    <div> &nbsp; &nbsp; {news.time}</div>
                </div>
                <div className={previewCss.bg}></div>
                <div className={previewCss.newsxqnr} style={{"margin-bottom":"140px"}} >
                    {/*{news.content}*/}
                    <span dangerouslySetInnerHTML={{__html:htmlStr}}></span>
                </div>
            </div>
    )
}


