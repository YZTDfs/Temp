import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_rolling_manage.less';
import {Table,Select,Input,Button,DatePicker,notification,Drawer,Modal} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import './REC_rolling_manageImt.css';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
const {RangePicker}=DatePicker;
const { TextArea } = Input;
export default class REC_rolling_manage extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
            addLoading:false,
            searchLoading:false,
            queryInfo : {
            　pageSize: 10
            },     
            dataSource:{
            　count: 0,
            　data: []
        　　},
            pageNum:1,
            queryCondition:{
              systemTrace:null,
              balanceStartDate:null,
              balanceEndDate:null,
              lackStatus:null,
              procesStatus:null,
              instituteId:null,
              paymentShop:null,
              bussinessPackId:null,
              processMode:null
            },
            bussinesNameSelect:[],
            bussinesSideSelect:[],
            merchantNameSelect:[],
            busDefalutOptions:{
              defalutBUS:'全部',
              defalutNAME:'全部',
              defalutMER:'全部'
            },
            drawerData:{
              basicInfo:{
                busName:'',
                payPlat:'',
                busSide:'',
                merName:''
              },
              recInfo:{
                return:{
                    refNum:'',
                    bill:'',
                    time:''
                },
                payPlat:{
                    refNum:'',
                    bill:'',
                    time:''
                },
                busSide:{
                    refNum:'',
                    bill:'',
                    time:''
                }
              },
              dealInfo:[]
            },
            drawerStatus:{
              visible:false,
            },
            Modal:{
              ModalVisible:false,
              dealStatus:null,
              checkStatus:null,
              dealType:null,
              dealReason:null,
              remark:null
            },
            submitData:{
              systemtrace:null,
              balanceStartDate:null,
              balanceEndDate:null,
              lackstatus:null,
              processtatus:null,
              instituteid:null,
              paymentshop:null,
              /* bussiness null */
              processmode:null
            },
            refundInputState:true,
        };
        this.search=this.search.bind(this);
        /* this.selectSearch=this.selectSearch.bind(this); */
        /* this.initSelectList=this.initSelectList.bind(this); */
        this.drawerClose=this.drawerClose.bind(this);
        this.createDetailTD=this.createDetailTD.bind(this);
        this.ModalSubmit=this.ModalSubmit.bind(this);
        this.ModalCancel=this.ModalCancel.bind(this);
        this.dealTypeSelect=this.dealTypeSelect.bind(this);
        this.dealTypeReason=this.dealTypeReason.bind(this);
        this.remarkInput=this.remarkInput.bind(this);
        /* control bussiness */
        this.getSysRefNum=this.getSysRefNum.bind(this);
        this.selectSearchBUS=this.selectSearchBUS.bind(this);
        this.selectSearchNAME=this.selectSearchNAME.bind(this);
        this.selectSearchMER=this.selectSearchMER.bind(this);
        this.selectSearchRES=this.selectSearchRES.bind(this);
        this.getTransDate=this.getTransDate.bind(this);
        /* end */
        /* table Query */
        this.dealWay=this.dealWay.bind(this);
        this.dealStatus=this.dealStatus.bind(this);
        /* end */
        /* DetailInfo */
        this.detailInfo='';
        /* end */
    };

    createSelectList(e){
      let item=[];
      let obj_keys=[];
      for (const obj_key in e[0]) {
       obj_keys.push(obj_key);
      };
      if (e.length!==0) {
        e.forEach(x => {
          item.push(
            <Option key={x[obj_keys[0]]} value={x[obj_keys[0]]}>{x[obj_keys[1]]}</Option>
          );
        });
      };
      return item;
    };
    createShopList(e){
     let list=[];
     if(e!==null||e!==undefined){
      e.forEach(x=>{
        list.push(
          <Option key={x.gnetshop} value={x.gnetshop}>{x.gnetshopname}</Option>
        )
      });
     };
     return list;
    };
    /* async initSelectList(e){
      let res,data;
      try {
        if (e===undefined) {
         res=await Utils.axiosRequest({
           url:Utils.mutilDevURl+'REC_rolling_manage_select',
           method:'post',
           data:{}
         });
         switch (res.data.code) {
            case '0000':
              const {side,Name,merName}=res.data.dataSource
              this.setState({
                bussinesNameSelect:Name,
                bussinesSideSelect:side,
                merchantNameSelect:merName
              });
              break;
            case '0500':
              notification['warning']({
                message:'操作失败!',
                description:'您无权进行该操作!'
              });
              break;

            case '0300':
              notification['warning']({
                message:'接口异常!',
                description:'接口出现异常!'
              });
              break;
          
            default:
              break;
          };
        }else{
          data={busName:e};
          res=await Utils.axiosRequest({
            url:Utils.mutilDevURl+'REC_rolling_manage_select',
            method:'post',
            data:data
          });
          switch (res.data.code) {
            case '0000':
              const {side,Name,merName}=res.data.dataSource;
              this.setState({
                bussinesNameSelect:Name,
                bussinesSideSelect:side,
                merchantNameSelect:merName
              });
              break;
            case '0500':
              notification['warning']({
                message:'操作失败!',
                description:'您无权进行该操作!'
              });
              break;

            case '0300':
              notification['warning']({
                message:'接口异常!',
                description:'接口出现异常!'
              });
              break;
          
            default:
              break;
          };
        };
      } catch (error) {
        notification['error']({
          message:'接口异常!',
          description:'网络异常!'
        });
      };
    }; */
    /* table */
    setTableColumns() { 
      this.tableColumns = [
          {
            title: '系统参考号', 
            dataIndex: 'systemTrace', 
            key: 'systemTrace',
            width:'10%'
          }, 
          {
            title: '业务方',
            dataIndex: 'instituteName',
            key: 'instituteName',
            width:'11%'
          }, 
          {
            title: '业务名称',
            dataIndex: 'bussinessPackName',
            key: 'bussinessPackName',
            width:'12%'
          }, 
          {
            title: '支付金额',
            dataIndex: 'amount',
            key: 'amount',
            width:'10%'
          },
          {
            title:'交易时间',
            dataIndex:'transDate',
            key:'transDate',
            width:'10%'
          },
          {
            title:'对账结果',
            dataIndex:'lackStatus',
            key:'lackStatus',
            width:'11%'
          },
          {
            title:'最后处理方式',
            dataIndex:'processMode',
            key:'processMode',
            width:'12%'
          },
          {
            title:'处理状态',
            dataIndex:'procesStatus',
            key:'procesStatus',
            width:'8%'
          },
          {
            title: '操作',
            key: 'operation',
            width:'12%',
            render: (text, record) =>{
              return this.renderButton(record);
          },
      }];
    };
    async toSelectchange(page,num) {
      const {systemTrace,balanceEndDate,balanceStartDate,lackStatus,procesStatus,instituteId,paymentShop,bussinessPackId,processMode}=this.state.queryCondition;
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'balancelack/getBalancelack',
          method:'post',
          data:{
            pageNum:page,
            pageSize:num,
            systemTrace:Utils.whiteToNull(systemTrace),
            balanceEndDate:Utils.whiteToNull(balanceEndDate),
            balanceStartDate:Utils.whiteToNull(balanceStartDate),
            lackStatus:parseInt(Utils.whiteToNull(lackStatus),10),
            procesStatus:parseInt(Utils.whiteToNull(procesStatus),10),
            instituteId:parseInt(Utils.whiteToNull(instituteId),10),
            paymentShop:parseInt(Utils.whiteToNull(paymentShop),10),
            bussinessPackId:parseInt(Utils.whiteToNull(bussinessPackId),10),
            processMode:parseInt(Utils.whiteToNull(processMode),10) 
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              queryInfo : {
                　pageSize: num
            　},                     
            　dataSource:{
            　　　 count: dataSource.count,
            　　　 data: dataSource.data
            　},
             pageNum:page
            });
            break;
          case '0300':
            notification['warning']({
              message:Utils.warn300.msg,
              description:Utils.warn300.desc
            });
            break;
          case '0500':
            notification['warning']({
              message:Utils.warn500.msg,
              description:Utils.warn500.desc
            });
            break;
        
          default:
            break;
        }
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        });
      };
    };
    async gotoThispage(current,pagesize){
      const {systemTrace,balanceEndDate,balanceStartDate,lackStatus,procesStatus,instituteId,paymentShop,bussinessPackId,processMode}=this.state.queryCondition;
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'balancelack/getBalancelack',
          method:'post',
          data:{
            pageNum:current,
            pageSize:pagesize,
            systemTrace:Utils.whiteToNull(systemTrace),
            balanceEndDate:Utils.whiteToNull(balanceEndDate),
            balanceStartDate:Utils.whiteToNull(balanceStartDate),
            lackStatus:parseInt(Utils.whiteToNull(lackStatus),10),
            procesStatus:parseInt(Utils.whiteToNull(procesStatus),10),
            instituteId:parseInt(Utils.whiteToNull(instituteId),10),
            paymentShop:parseInt(Utils.whiteToNull(paymentShop),10),
            bussinessPackId:parseInt(Utils.whiteToNull(bussinessPackId),10),
            processMode:parseInt(Utils.whiteToNull(processMode),10) 
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              queryInfo : {
                　pageSize: pagesize
            　},                     
            　dataSource:{
            　　　 count: dataSource.count,
            　　　 data: dataSource.data
            　},
              pageNum:current,
              searchLoading:false
            });
            break;
          case '0300':
            notification['warning']({
              message:Utils.warn300.msg,
              description:Utils.warn300.desc
            });
            break;
          case '0500':
            notification['warning']({
              message:Utils.warn500.msg,
              description:Utils.warn500.desc
            });
            break;
        
          default:
            break;
        }
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        });
      };
    };
    /* end */

    /* getAreaListMenu */
    async getBUSside(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'/institute/instituteAll',
          method:'post',
          data:{}
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              bussinesSideSelect:dataSource.data
            });
            break;
          case '0300':
            notification['warning']({
              message:Utils.warn300.msg,
              description:'业务方查询失败!'
            });
            break;
          case '0500':
            notification['warning']({
              message:Utils.warn500.msg,
              description:'业务方查询失败!'
            });
            break;
          default:
            break;
        }
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        });
      };
    };
    async getBUSname(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'monitor/getMonitor',
          method:'post',
          data:{
            pageNum:0,
            pageSize:0
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              bussinesNameSelect:dataSource.data
            });
            break;
          case '0300':
            notification['warning']({
              message:Utils.warn300.msg,
              description:'业务号查询失败!'
            });
            break;
          case '0500':
            notification['warning']({
              message:Utils.warn500.msg,
              description:'业务号查询失败!'
            });
            break;
          default:
            break;
        }
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        });
      };
    };
    async getSHOPname(id){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'shop/getShopByInstitute',
          method:'post',
          data:{institueid:id}
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              merchantNameSelect:dataSource.data
            });
            break;
          case '0300':
            notification['warning']({
              message:Utils.warn300.msg,
              description:'商户查询失败!'
            });
            break;
          case '0500':
            notification['warning']({
              message:Utils.warn500.msg,
              description:'商户查询失败!'
            });
            break;
          default:
            break;
        }
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        });
      };
    };
    /* end */

    /* getDetails */
    async getRecordDetails(record){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'balancelack/getBalancelackDetail',
          method:'post',
          data:{
            balanceTrace:record.balanceTrace
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.detailInfo=dataSource;
            break;
          case '0300':
            notification['warning']({
              message:Utils.warn300.msg,
              description:Utils.warn300.desc
            });
            break;
          case '0500':
            notification['warning']({
              message:Utils.warn500.msg,
              description:Utils.warn500.desc
            });
            break;
          default:
            break;
        };
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        })
      };
    };
    /* end */
    /* bussiness */
    drawerClose(){
      this.setState({
        drawerStatus:{
          visible:false,
        }
      });
    };
    createDetailTD(info){
     const listData=[];
     if (info.length!==0) {
        info.forEach(x=>{
           listData.push(
             <tr key={x.processId}>
               <td>{x.procesTime}</td>
               <td>{x.procesStatus}</td>
               <td>{x.processMode}</td>
               <td>{x.userName}</td>
               <td>{x.remark}</td>
             </tr>
           );
        });
        return listData;
     };
     
    };
    async edit(){
      this.setState({
        Modal:{
          ModalVisible:true
        }
      });
    };
    async ModalSubmit(){
      console.log(this.detailInfo);
      console.log(this.state.Modal.dealType)
      const {Modal}=this.state;
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'balanceLackProcess/doBalanceLackProcess',
          method:'post',
          data:{
            balanceTrace:this.detailInfo.data.balanceTrace,
            processMode:Modal.dealType,
            systemTrace:this.detailInfo.data.systemTrace,
            balanceDate:this.detailInfo.data.balanceDate,
            cardNo:this.detailInfo.data.balanceLine.cardNo,
            amount:this.detailInfo.data.amount,
            transDate:this.detailInfo.data.transDate,
            payTrace:this.detailInfo.data.balanceLine.payTrace,
            refundCause:Modal.dealReason,
            remark:Modal.remark,
            procesStatus:this.detailInfo.data.procesStatus,
          }
        });
        const {code,dataSource,msg}=res.data;
        switch (code) {
          case '0000':
            notification['success']({
              message:'操作成功!',
              description:msg
            });
            this.gotoThispage(1,10);
            break;
          case '0300':
            notification['warning']({
              message:Utils.warn300.msg,
              description:msg
            });
            break;
          case '0500':
            notification['warning']({
              message:Utils.warn500.msg,
              description:msg
            });
            break;
          default:
            break;
        }
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        });
      };
    };
    async ModalCancel(){
      this.setState({
        Modal:{
          ModalVisible:false
        }
      });
    };
    dealTypeSelect(value){
      this.setState({
        Modal:Object.assign({},this.state.Modal,{
          dealType:/* parseInt(value.key,10) */value.label,
          dealReason:value.key==='0'?'补数据失败_业务方':null
        }),
        refundInputState:value.key==='0'?true:false
      });
    };
    dealTypeReason(value){
      this.setState({
        Modal:Object.assign({},this.state.Modal,{
          dealReason:value.label
        })
      });
    };
    remarkInput(event){
      this.setState({
        Modal:Object.assign({},this.state.Modal,{
          remark:event.target.value
        })
      });
    };
    /* end */


    /* render table button */
    renderButton(record){
      switch (record.procesStatus) {
        case '待处理':
          return(
            <span className={Class.opt_span}>
              <Button className={Class.search_btn} onClick={this.view.bind(this,record)} type='primary'>查看</Button>
              <Button className={Class.search_btn} onClick={this.handle.bind(this,record)} type='primary'>处理</Button>
            </span>
          )
        case '处理中':
          return(
            <span className={Class.opt_span}>
              <Button className={Class.search_btn} onClick={this.view.bind(this,record)} type='primary'>查看</Button>
              <Button className={Class.search_btn} onClick={this.audit.bind(this,record)} type='primary'>审核</Button>
            </span>
          )
        case '已处理':
          return(
            <span className={Class.opt_span}>
              <Button className={Class.search_btn} onClick={this.view.bind(this,record)} type='primary'>查看</Button>
              <Button className={Class.search_btn} onClick={this.reHandle.bind(this,record)} type='primary'>重新处理</Button>
            </span>
          )
        default:
          break;
      };
    };
    /* end */

    /* table_btn_event */
     async view(record){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'balancelack/getBalancelackDetail',
          method:'post',
          data:{balanceTrace:record.balanceTrace}
        });
        if (res.data.code==='0000') {
          const {balanceLackProcess}=res.data.dataSource.data;
          this.setState({
            drawerStatus:{
              visible:true
            },
            drawerData:{
              basicInfo:{
                busName:record.bussinessPackName,
                payPlat:null,
                busSide:record.instituteName,
                merName:record.paymentShopName
              },
              recInfo:{
                return:{
                    refNum:null,
                    bill:null,
                    time:null
                },
                payPlat:{
                    refNum:null,
                    bill:null,
                    time:null
                },
                busSide:{
                    refNum:null,
                    bill:null,
                    time:null
                }
              },
              dealInfo:balanceLackProcess
            }
          });
        }else if(res.data.code==='0500'){
          notification['warning']({
            message:'操作失败!',
            description:'您无权进行这项操作!'
          });
        }else if(res.data.code==='0300'){
          notification['warning']({
            message:'接口异常!',
            description:'啊哦,接口出现问题了!'
          });
        };
      } catch (error) {
        notification['error']({
          message:'接口异常!',
          description:'网络异常!'
        });
      };
     };
     async handle(record){
       this.getRecordDetails(record);
       this.setState({
        Modal:{
          ModalVisible:true,
          dealStatus:'待处理',
          checkStatus:record.lackStatus,
          dealType:'退款',
          dealReason:'补数据失败_业务方',
          remark:'Return重复缴纳，需做退款处理'
        },
        refundInputState:true
       });
     };
     async audit(record){
      this.getRecordDetails(record);
      this.setState({
        Modal:{
          ModalVisible:true,
          dealStatus:'处理中',
          checkStatus:record.lackStatus,
          dealType:'退款',
          dealReason:'补数据失败_业务方',
          remark:'Return重复缴纳，需做退款处理'
        },
        refundInputState:true
       });
     };
     async reHandle(record){
      this.getRecordDetails(record);
      this.setState({
        Modal:{
          ModalVisible:true,
          dealStatus:'已处理',
          checkStatus:record.lackStatus,
          dealType:'退款',
          dealReason:'补数据失败_业务方',
          remark:'Return重复缴纳，需做退款处理'
        },
        refundInputState:true
       });
     };
    /* end */

    /* table query condition */
    dealWay(value){
      this.setState({
        queryCondition:Object.assign({},this.state.queryCondition,{
          processMode:value.label
        })
      });
    };
    dealStatus(value){
      this.setState({
        queryCondition:Object.assign({},this.state.queryCondition,{
          procesStatus:value.label
        })
      });
    };
    getSysRefNum(event){
      this.setState({
        queryCondition:Object.assign({},this.state.queryCondition,{
          systemTrace:event.target.value
        })
      });
    };
    selectSearchBUS(value){
      this.setState({
        queryCondition:Object.assign({},this.state.queryCondition,{
          instituteId:value.key
        })
      });
      this.getBUSname();
      this.getSHOPname(value.key);
    };
    selectSearchNAME(value){
      this.setState({
        queryCondition:Object.assign({},this.state.queryCondition,{
          bussinessPackId:value.key
        })
      });
      this.getSHOPname();
    };
    selectSearchMER(value){
      this.setState({
        queryCondition:Object.assign({},this.state.queryCondition,{
          paymentShop:value.key
        })
      });
    };
    selectSearchRES(value){
      this.setState({
        queryCondition:Object.assign({},this.state.queryCondition,{
          lackStatus:value.key
        })
      });
    };
    getTransDate(date,dateString){
      this.setState({
        queryCondition:Object.assign({
          balanceStartDate:dateString[0],
          balanceEndDate:dateString[1]
        })
      });
    };
    async search(){
      this.setState({
        searchLoading:true
      });
      this.gotoThispage(1,10);
      /* this.setState({
        searchLoading:false
      }); */
    };
    /* end */



  componentWillMount(){
    this.setTableColumns();
    /* this.initSelectList(); */
    this.toSelectchange(1,10);
    this.getBUSside();
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      const {bussinesNameSelect,bussinesSideSelect,merchantNameSelect,destroyOnClose,pageNum,refundInputState}=this.state;
      const {defalutBUS,defalutNAME,defalutMER}=this.state.busDefalutOptions;
      const {visible}=this.state.drawerStatus;
      const {basicInfo,recInfo,dealInfo}=this.state.drawerData;
      const {ModalVisible,dealStatus,checkStatus,dealType,remark}=this.state.Modal;
      const {systemTrace,balanceStartDate,balanceEndDate,lackStatus,procesStatus,instituteId,paymentShop,bussinessPackId,processMode}=this.state.queryCondition;
      return(
        <article className={Class.main}>
        <Modal 
         title='轧差处理' 
         visible={ModalVisible} 
         onOk={this.ModalSubmit} 
         onCancel={this.ModalCancel} 
         okText='提交' 
         cancelText='取消' 
         destroyOnClose={true} 
         closable={false} 
         maskClosable={false} 
         className={Class.ticModal} 
         wrapClassName={Class.optModalTree}
        >
           <article>
             <p>处理状态：{dealStatus}</p>
             <p>对账状态：{checkStatus}</p>
             <div className={Class.modalInput}>
             <label className={Class.generalLabel} htmlFor=''>处理方式：</label>
             <Select 
              className={Class.generaSelect}
              style={{ width: `10%` }}
              onChange={this.dealTypeSelect} 
              defaultValue={{key:'0',label:'退款'}}
              labelInValue={true}
             >
                <Option value='0'>退款</Option>
                <Option value='1'>补解档</Option>
                <Option value='3'>补数据</Option>
                <Option value='4'>挂账</Option>
                <Option value='2'>删除数据</Option>
                <Option value='5'>线下处理</Option>
              </Select>
             </div>
             <div className={`${Class.modalInput} ${refundInputState===true?Class.show:Class.hide}`}>
             <label className={Class.generalLabel} htmlFor=''>退款原因：</label>
             <Select
              className={Class.generaSelect}
              style={{ width: `10%` }}
              onChange={this.dealTypeReason}
              defaultValue={{key:'0',label:'补数据失败（业务方）'}}
              labelInValue={true}
             >
                 <Option value='0'>补数据失败_业务方</Option>
                 <Option value='1'>重复缴纳_return</Option>
                 <Option value='2'>重复缴纳_其他渠道</Option>
                 <Option value='3'>数据回退_业务方</Option>
                 <Option value='4'>其他</Option>
              </Select>
             </div>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>备&emsp;&emsp;注：</label>
               <TextArea 
                className={Class.generalArea} 
                defaultValue='Return重复缴纳，需做退款处理' 
                onChange={this.remarkInput}
               />
             </div>
           </article>
        </Modal>
        <Drawer title="流水详情" placement="right" closable={true} onClose={this.drawerClose} visible={visible} width={`100%`} className={`${Class.drMain} w75`} destroyOnClose={true}>
            <article className={Class.mainDetails}>
                <nav className={Class.eachRow}>基本信息</nav>
                <aside className={Class.detailsBox}>
                   <p>业务名称：{basicInfo.busName}</p>
                   <p>支付平台：{basicInfo.payPlat}</p>
                   <p>业务方：{basicInfo.busSide}</p>
                   <p>商户名称：{basicInfo.merName}</p>
                </aside>

                <nav className={Class.eachRow}>对账信息</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdTitle}></td>
                        <td className={Class.tdTitle}>参考号/流水号/决定书编号</td>
                        <td className={Class.tdTitle}>账目</td>
                        <td className={Class.tdTitle}>时间</td>
                      </tr>
                      <tr>
                        <td className={Class.tdTitle}>Return</td>
                        <td>{recInfo.return.refNum}</td>
                        <td>{recInfo.return.bill}</td>
                        <td>{recInfo.return.time}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdTitle}>平台支付方</td>
                        <td>{recInfo.payPlat.refNum}</td>
                        <td>{recInfo.payPlat.bill}</td>
                        <td>{recInfo.payPlat.time}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdTitle}>业务方</td>
                        <td>{recInfo.busSide.refNum}</td>
                        <td>{recInfo.busSide.bill}</td>
                        <td>{recInfo.busSide.time}</td>
                      </tr>
                    </tbody>
                  </table>
                </aside>

                <nav className={Class.eachRow}>处理信息</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdTitle}>处理时间</td>
                        <td className={Class.tdTitle}>处理状态</td>
                        <td className={Class.tdTitle}>处理方式</td>
                        <td className={Class.tdTitle}>处理人</td>
                        <td className={Class.tdTitle}>备注</td>
                      </tr>
                      {this.createDetailTD(dealInfo)}
                    </tbody>
                  </table>
                </aside>
            </article>
          </Drawer>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>系统参考号</label>
               <Input className={Class.generalInput} type='text' onChange={this.getSysRefNum} value={systemTrace} />
               <label className={Class.generalLabel} htmlFor=''>交易日期</label>
               <RangePicker className={Class.generalInput} onChange={this.getTransDate} />
               <label className={Class.generalLabel} htmlFor="">处理方式</label>
               <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={this.dealWay} defaultValue={{key:'null'}} labelInValue={true}>
                 <Option value='null'>全部</Option>
                 <Option value='0'>退款</Option>
                 <Option value='1'>补解档</Option>
                 <Option value='2'>删除数据</Option>
                 <Option value='3'>补数据（Return）</Option>
                 <Option value='4'>挂账</Option>
                 <Option value='5'>线下处理</Option>
               </Select>
               <label className={Class.generalLabel} htmlFor="">处理状态</label>
               <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={this.dealStatus} defaultValue={{key:'null'}} labelInValue={true}>
                 <Option value='null'>全部</Option>
                 <Option value='0'>待处理</Option>
                 <Option value='1'>处理中</Option>
                 <Option value='2'>已处理</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>

             <div className={`${Class.eachCol} ${Class.marginT1}`}>
              <label className={Class.generalLabel} htmlFor=''>业务方</label>
              <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={this.selectSearchBUS} defaultValue={{key:'全部',label:'全部'}} labelInValue={true}>
              {this.createSelectList(bussinesSideSelect)}
              </Select>
              <label className={Class.generalLabel} htmlFor=''>业务名称</label>
              <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={this.selectSearchNAME}  defaultValue={{key:'全部',label:'全部'}} labelInValue={true}>
              {this.createSelectList(bussinesNameSelect)}
              </Select>
              <label className={Class.generalLabel} htmlFor=''>商户名称</label>
              <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={this.selectSearchMER} defaultValue={{key:'全部',label:'全部'}} labelInValue={true}>
              {this.createShopList(merchantNameSelect)}
              </Select>
              <label className={Class.generalLabel} htmlFor="">对账结果</label>
              <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={this.selectSearchRES} defaultValue={{key:'null',label:'全部'}} labelInValue={true}>
                <Option value='null'>全部</Option>
                <Option value='0'>支付平台多</Option>
                <Option value='1'>支付平台少</Option>
                <Option value='2'>业务方多</Option>
                <Option value='3'>业务方少</Option>
                <Option value='4'>Return多</Option>
                <Option value='5'>Return少</Option>
                <Option value='6'>金额不一致</Option>
              </Select>
             </div>

           </nav>
           <div className={Class.table_main}>
              <Table columns={this.tableColumns}
                     rowKey='balanceTrace'
                     dataSource={dataSource}
                     pagination={{
                     current:pageNum,
                     total: count,
                     pageSize: pageSize,
                     defaultPageSize:pageSize,
                     showSizeChanger: true,
                     onShowSizeChange(current, pageSize) {
                       self.toSelectchange(current, pageSize);
                     },
                     onChange(current) {
                       self.gotoThispage(current, self.state.queryInfo.pageSize);
                     },                                         
                     showTotal: function () {
                       return '共 ' + count + ' 条数据'; 
                     },
                     }}
                     scroll={{x:``,y:`85%`}}
              />
           </div>
        </article>
      )
    }
};





