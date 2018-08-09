const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = 9099;
let dir, arg = process.argv[2] || '';
http.createServer(function (req, res) {
    /* Interface */
    let res_json;
    switch (require('url').parse(req.url, true).pathname) {
        case '/menuList':
            res_json = {
                code: '0000',
                msg: '请求成功!',
                data:[
                   {
                       title:'业务监控',
                       id:'bus',
                       sec_menu:[
                           {
                               title:'业务开通',
                               id:'BUS_open',
                               sec_menu:[]
                           },
                           {
                               title:'操作流水',
                               id:'BUS_ops_flow',
                               sec_menu:[]
                           },
                           {
                               title:'交罚查询',
                               id:'BUS_pay_query',
                               sec_menu:[]
                           },
                           {
                               title:'交罚办理',
                               id:'BUS_pay_penalty',
                               sec_menu:[]
                           }
                       ]
                   },
                   {
                       title:'对账管理',
                       id:'rec',
                       sec_menu:[
                           {
                               title:'对账文件管理',
                               id:'REC_file_manage',
                               sec_menu:[]
                           },
                           {
                               title:'总账概况',
                               id:'REC_general_manage',
                               sec_menu:[]
                           },
                           {
                               title:'轧差处理',
                               id:'REC_rolling_manage',
                               sec_menu:[]
                           },
                           {
                               title:'退款登记',
                               id:'REC_refund_regist',
                               sec_menu:[]
                           }
                       ]
                   },
                   {
                       title:'运维管理',
                       id:'ops',
                       sec_menu:[
                           {
                               title:'终端机管理',
                               id:'OPS_Terminal_manage',
                               sec_menu:[]
                           },
                           {
                               title:'上网卡管理',
                               id:'OPS_evdo_manage',
                               sec_menu:[]
                           },
                           {
                               title:'运维卡管理',
                               id:'OPS_ops_manage',
                               sec_menu:[]
                           },
                           {
                               title:'终端运行情况',
                               id:'OPS_TerRun_manage',
                               sec_menu:[]
                           }
                       ]
                   },
                   {
                       title:'内容管理',
                       id:'ctx',
                       sec_menu:[
                           {
                               title:'公告管理',
                               id:'CTX_announce_manage',
                               sec_menu:[]
                           },
                           {
                               title:'广告管理',
                               id:'CTX_adv_manage',
                               sec_menu:[]
                           },
                           {
                               title:'电话管理',
                               id:'CTX_tel_manage',
                               sec_menu:[]
                           }
                       ]
                   },
                   {
                       title:'系统设置',
                       id:'sys',
                       sec_menu:[
                           {
                               title:'用户管理',
                               id:'SYS_user_manage',
                               sec_menu:[]
                           },
                           {
                               title:'角色管理',
                               id:'SYS_role_manage',
                               sec_menu:[]
                           },
                           {
                               title:'终端模块管理',
                               id:'SYS_TerModules_manage',
                               sec_menu:[]
                           },
                           {
                               title:'终端渠道管理',
                               id:'SYS_TerChannel_manage',
                               sec_menu:[]
                           },
                           {
                               title:'终端地区管理',
                               id:'SYS_TerRegion_manage',
                               sec_menu:[]
                           },
                           {
                               title:'运维地区管理',
                               id:'SYS_OpsRegion_manage',
                               sec_menu:[]
                           },
                           {
                               title:'机构管理',
                               id:'SYS_org_manage',
                               sec_menu:[]
                           },
                           {
                               title:'业务管理',
                               id:'SYS_bus_manage',
                               sec_menu:[]
                           },
                           {
                               title:'商户管理',
                               id:'SYS_merchant_manage',
                               sec_menu:[]
                           },
                           {
                               title:'银联密钥管理',
                               id:'SYS_UnionKey_manage',
                               sec_menu:[]
                           },
                           {
                               title:'操作码管理',
                               id:'SYS_HandleCode_manage',
                               sec_menu:[]
                           },
                           {
                               title:'返回码管理',
                               id:'SYS_ReturnCode_manage',
                               sec_menu:[]
                           }
                       ]
                   }
                ]
            };
            res.writeHead(200, { 'Content-Type': 'application/json','Access-Control-Allow-Origin':' *' });
            res.end(JSON.stringify(res_json));
            break;
        case '/accountLogin':
            res_json = {
                code: '0000',
                msg: '登陆成功！'
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(res_json));
            break;
        case '/getBusinessData':
            res_json={
                code:'0000',
                msg:'success',
                data:[{
                    id: 1,
                    avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg',
                    city: 'New Amieshire',
                    email: 'Leora13@yahoo.com',
                    firstName: 'Ernest Schuppe SchuppeSchuppeSchuppeSchuppeSchuppeSchuppe Schuppe',
                    lastName: 'Schuppe',
                    street: 'Ratke Port',
                    zipCode: '17026-3154',
                    date: '2016-09-23T07:57:40.195Z',
                    bs: 'global drive functionalities',
                    catchPhrase: 'Intuitive impactful software',
                    companyName: 'Lebsack - Nicolas',
                    words: 'saepe et omnis',
                    sentence: 'Quos aut sunt id nihil qui.',
                    stars: 820,
                    followers: 70
                  },
                  {
                    id: 2,
                    avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg',
                    city: 'New Gust',
                    email: 'Mose_Gerhold51@yahoo.com',
                    firstName: 'Janis',
                    lastName: 'Vandervort',
                    street: 'Dickinson Keys',
                    zipCode: '43767',
                    date: '2017-03-06T09:59:12.551Z',
                    bs: 'e-business maximize bandwidth',
                    catchPhrase: 'De-engineered discrete secured line',
                    companyName: 'Glover - Hermiston',
                    words: 'deleniti dolor nihil',
                    sentence: 'Illo quidem libero corporis laborum.',
                    stars: 1200,
                    followers: 170
                  },
                  {
                    id: 3,
                    avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg',
                    city: 'Lefflerstad',
                    email: 'Frieda.Sauer61@gmail.com',
                    firstName: 'Makenzie',
                    lastName: 'Bode',
                    street: 'Legros Divide',
                    zipCode: '54812',
                    date: '2016-12-08T13:44:26.557Z',
                    bs: 'plug-and-play e-enable content',
                    catchPhrase: 'Ergonomic 6th generation challenge',
                    companyName: 'Williamson - Kassulke',
                    words: 'quidem earum magnam',
                    sentence: 'Nam qui perferendis ut rem vitae saepe.',
                    stars: 610,
                    followers: 170
                
                  },
                  {
                    id: 4,
                    avartar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brajeshwar/128.jpg',
                    city: 'East Catalina',
                    email: 'Eloisa.OHara@hotmail.com',
                    firstName: 'Ciara',
                    lastName: 'Towne',
                    street: 'Schimmel Ramp',
                    zipCode: '76315-2246',
                    date: '2016-07-19T12:54:30.994Z',
                    bs: 'extensible innovate e-business',
                    catchPhrase: 'Upgradable local model',
                    companyName: 'Hilpert, Eichmann and Brown',
                    words: 'exercitationem rerum sit',
                    sentence: 'Qui rerum ipsa atque qui.',
                    stars: 5322,
                    followers: 170
                  }]
            }
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(res_json));
            break;
       default:
            break;
    };
    /* end */
}).listen(port, "localhost");

console.log("server running at " + port + "!");

