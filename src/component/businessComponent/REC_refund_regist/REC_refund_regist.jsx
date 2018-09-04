import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_refund_regist.less';
import {Table,Select,Input,Button,Icon,DatePicker,notification,Modal,Drawer,TimePicker,Upload} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import './REC_refund_registImt.css';


const Option=Select.Option;
const {RangePicker}=DatePicker;
const {TextArea}=Input;
const Dragger = Upload.Dragger;
export default class REC_refund_regist extends Component {
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
            batchRegModal:{
               BatchVisible:false
            },
            refundModal:{
               refundVisible:false
            },
            detailsDrawer:{
               drawerVisible:false
            },
            queryCondition:{
              systemTrace:null,
              pay_trace:null,
              balanceStartDate:null,
              balanceEndDate:null,
              refundCause:null,
              refundStatus:null,
              refundStartTime:null,
              refundEndTime:null
            },
            refundRegData:{
              Reg_balanceTrace:null,
              Reg_refundDate:null,
              Reg_refundTime:null,
              Reg_amout:null,
              Reg_carNo:null,
              Reg_remark:'Return重复缴纳，需做退款处理'
            }
        };
        this.toSelectchange=this.toSelectchange.bind(this);
        this.exportData=this.exportData.bind(this);
        this.search=this.search.bind(this);
        this.batchReg=this.batchReg.bind(this);
        this.batchRegSubmit=this.batchRegSubmit.bind(this);
        this.batchRegCancel=this.batchRegCancel.bind(this);
        this.refundRegSubmit=this.refundRegSubmit.bind(this);
        this.refundRegCancel=this.refundRegCancel.bind(this);
        this.drawerClose=this.drawerClose.bind(this);
        /* table search config */
        this.systemTraceInput=this.systemTraceInput.bind(this);
        this.balanceTraceInput=this.balanceTraceInput.bind(this);
        this.transDateRange=this.transDateRange.bind(this);
        this.refundCauseSelect=this.refundCauseSelect.bind(this);
        this.refundStatusSelect=this.refundStatusSelect.bind(this);
        this.refundTimeInput=this.refundTimeInput.bind(this);
        /* end */
        this.refundDetailsInfo={balanceLine:''};
        /* refundReg */
        this.m_refundDate=this.m_refundDate.bind(this);
        this.m_refundTime=this.m_refundTime.bind(this);
        this.remarkInput=this.remarkInput.bind(this);
        /* end */
        /* uploadConfig */
        this.uploadConfig = {
          name: 'file',
          multiple: true,
          action: Utils.testDevURL+'/lackRefund/importRefund',
          onChange(info) {
            const status = info.file.status;
            if (status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (status === 'done') {
              console.log("success!");
              /* message.success(`${info.file.name} file uploaded successfully.`); */
            } else if (status === 'error') {
              console.log('error!');
              /* message.error(`${info.file.name} file upload failed.`); */
            }
          },
        };
        /* end */
    };

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '系统参考号', 
            dataIndex: 'systemTrace', 
            key: 'systemTrace',
            width:'10%'
          }, 
          {
            title: '支付流水号',
            dataIndex: 'payTrace',
            key: 'payTrace',
            width:'10%'
          }, 
          {
            title: '银行卡号',
            dataIndex: 'cardNo',
            key: 'cardNo',
            width:'15%'
          }, 
          {
            title: '交易时间',
            dataIndex: 'transDate',
            key: 'transDate',
            width:'10%'
          },
          {
            title:'退款金额',
            dataIndex:'amount',
            key:'amount',
            width:'10%'
          },
          {
            title:'退款原因',
            dataIndex:'refundCause',
            key:'refundCause',
            width:'11%'
          },
          {
            title:'退款状态',
            dataIndex:'refundStatus',
            key:'refundStatus',
            width:'12%'
          },
          {
            title:'退款日期',
            dataIndex:'refundTime',
            key:'refundTime',
            width:'9%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'12%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.view.bind(this,record)}>查看</Button>
            {record.refundStatus==='待退款'?<Button className={Class.search_btn} type="primary" onClick={this.refundReg.bind(this,record)}>登记</Button>:null}
          </span>
          ),
      }];
    };
    /* table */
    async toSelectchange(page,num) {
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'lackRefund/getLackRefund',
          method:'post',
          data:{
           pageNum: page,
           pageSize:num
          }
        });
        if (res.data.code==='0000') {
          this.setState({
            queryInfo : {
            　pageSize: num
        　　},                     
        　　dataSource:{
        　　　 count: res.data.dataSource.count,
        　　　 data: res.data.dataSource.data
        　　},
            pageNum:page
        　　});
        }else if (res.data.code==='0500') {
           notification['warning']({
             message:'操作失败!',
             description:'您无权进行此项操作'
           });
        }else if(res.data.code==='0300'){
           notification['warning']({
             message:'接口异常!',
             description:'啊哦，接口出现问题'
           });
        };
      } catch (error) {
        notification['error']({
           message:'接口异常!',
           description:'网络异常!'
        });
      };
    };
    async gotoThispage(current,pagesize){
      const {systemTrace,pay_trace,balanceStartDate,balanceEndDate,refundCause,refundStatus,refundStartTime,refundEndTime}=this.state.queryCondition;
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'lackRefund/getLackRefund',
          method:'post',
          data:{
           pageNum: current,
           pageSize:pagesize,
           systemTrace:systemTrace,
           payTrace:pay_trace,
           balanceStartDate:balanceStartDate,
           balanceEndDate:balanceEndDate,
           refundCause:parseInt(refundCause,10),
           refundStatus:parseInt(refundStatus,10),
           refundStartTime:refundStartTime,
           refundEndTime:refundEndTime,
          }
        });
        if (res.data.code==='0000') {
          this.setState({                  
        　　dataSource:{
        　　　 count: res.data.dataSource.count,
        　　　 data: res.data.dataSource.data
        　　},
            pageNum:current,
            searchLoading:false
        　　});
        }else if (res.data.code==='0500') {
           notification['warning']({
             message:'操作失败!',
             description:'您无权进行此项操作'
           });
        }else if(res.data.code==='0300'){
           notification['warning']({
             message:'接口异常!',
             description:'啊哦，接口出现问题'
           });
        };
      } catch (error) {
        console.log(error);
        notification['error']({
           message:'接口异常!',
           description:'网络异常!'
        });
      };
    };
    /* end */
    async selectSearch(value){
      console.log(value);
    };

    async add(){
      this.setState({
        addLoading:true
      });
      let self=this;
      setTimeout(function(){
        self.setState({
          addLoading:false
        });
      },2000);
    };

    async search(){
      this.setState({
        searchLoading:true
      });
      this.gotoThispage(1,10);
    };

    async view(record){
       let res;
       try {
         res=await Utils.axiosRequest({
           url:Utils.testDevURL+'lackRefund/getLackRefundDetail',
           method:'post',
           data:{balanceTrace:parseInt(record.balanceTrace,10)}
         });
         const {code,dataSource}=res.data;
         switch (code) {
           case '0000':
             this.setState({
              detailsDrawer:{
              drawerVisible:true
              }
             });
             this.refundDetailsInfo=dataSource.data;
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
               description:Utils.warn500.msg
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
    
    async drawerClose(){
      this.setState({
        detailsDrawer:{
          drawerVisible:false
        }
      });
    };

    async refundReg(record){
      this.setState({
        refundModal:{
          refundVisible:true
        },
        refundRegData:Object.assign({},this.state.refundRegData,{
          Reg_balanceTrace:record.balanceTrace,
          Reg_amout:record.amount,
          Reg_carNo:record.cardNo
        })
      });
    };

    async refundRegSubmit(){
      const {Reg_balanceTrace,Reg_refundDate,Reg_remark,Reg_refundTime}=this.state.refundRegData;
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.testDevURL+'lackRefund/editLackRefund',
          method:'post',
          data:{
            balanceTrace:Reg_balanceTrace,
            refundTime:Reg_refundDate+' '+Reg_refundTime,
            remark:Reg_remark
          }
        });
        const {code,msg,dataSource}=res.data;
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
              message:'接口异常!',
              description:msg
            });
            break;
          case '0500':
            notification['warning']({
              message:'操作失败!',
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
      this.setState({
        refundModal:{
          refundVisible:false
        }
      });
    };

    refundRegCancel(){
       this.setState({
        refundModal:{
          refundVisible:false
        },
       });
    };

    batchReg(){
      this.setState({
        batchRegModal:{
          BatchVisible:true
        }
      });
    };

    batchRegSubmit(){
      this.setState({
        batchRegModal:{
          BatchVisible:false
        }
      });
    };

    batchRegCancel(){
      this.setState({
        batchRegModal:{
          BatchVisible:false
        }
      });
    };

    exportData(){
    
    };
    /* table query */
    systemTraceInput(event){
       this.setState({
         queryCondition:Object.assign({},this.state.queryCondition,{
            systemTrace:event.target.value
         })
       });
    };
    balanceTraceInput(event){
       this.setState({
         queryCondition:Object.assign({},this.state.queryCondition,{
            pay_trace:event.target.value
         })
       });
    };
    transDateRange(date,dateString){
       this.setState({
         queryCondition:Object.assign({},this.state.queryCondition,{
           balanceStartDate:dateString[0],
           balanceEndDate:dateString[1]
         })
       });
    };
    refundCauseSelect(value){
       this.setState({
         queryCondition:Object.assign({},this.state.queryCondition,{
           refundCause:value.key
         })
       });
    };
    refundStatusSelect(value){
       this.setState({
         queryCondition:Object.assign({},this.state.queryCondition,{
           refundStatus:value.key
         })
       });
    };
    refundTimeInput(date,dateString){
       this.setState({
          queryCondition:Object.assign({},this.state.queryCondition,{
            refundStartTime:dateString[0],
            refundEndTime:dateString[1]
          })
       });
    };
    /* end */

    /* regSubmit */
    m_refundDate(date,dateString){
       this.setState({
         refundRegData:Object.assign({},this.state.refundRegData,{
          Reg_refundDate:dateString
         })
       });
    };
    m_refundTime(time,timeString){
      this.setState({
        refundRegData:Object.assign({},this.state.refundRegData,{
         Reg_refundTime:timeString
        })
      });
    }
    remarkInput(event){
       this.setState({
         refundRegData:Object.assign({},this.state.refundRegData,{
           Reg_remark:event.target.value
         })
       });
    };
    /* end */
    

    

  componentWillMount(){
    this.setTableColumns();
    this.toSelectchange(1,10);
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      const {batchRegModal,refundModal,detailsDrawer,pageNum}=this.state;
      const {BatchVisible}=this.state.batchRegModal;
      const {refundVisible}=this.state.refundModal;
      const {drawerVisible}=this.state.detailsDrawer;
      const {refundCause,refundStatus,amount,cardNo,refundTime,balanceLine,institutename,paymentShopName}=this.refundDetailsInfo;
      const {Reg_refundDate,Reg_amout,Reg_carNo,Reg_remark}=this.state.refundRegData;
      return(
        <article className={Class.main}>
        <Modal title="批量登记" visible={BatchVisible} onOk={self.batchRegSubmit} onCancel={self.batchRegCancel} okText='提交' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false} className={Class.ticModal} wrapClassName={Class.optModalTree}>
           <article>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>退款日期</label>
               <DatePicker className={Class.generalTime} onChange={this.m_refundDate} />
               <TimePicker className={`${Class.generalTimePicker} h23`} onChange={this.m_refundTime} />
             </div>
             <div className={Class.modalInput}>
               <Dragger {...this.uploadConfig}>
                 <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                 <p className="ant-upload-text">Click or drag file to this area to upload</p>
                 <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
               </Dragger>
             </div>
           </article>
        </Modal>
        <Modal title="退款登记" visible={refundVisible} onOk={this.refundRegSubmit} onCancel={this.refundRegCancel} okText='提交' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false} className={Class.ticModal} wrapClassName={Class.optModalTree}>
           <article>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>退款日期</label>
               <DatePicker className={Class.generalTime} onChange={this.m_refundDate} />
               <TimePicker className={`${Class.generalTimePicker} h23`} onChange={this.m_refundTime} />
             </div>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>退款金额</label>
               <Input className={Class.generalInput} disabled={true} readOnly='readOnly' value={Reg_amout}/>
             </div>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>退款路径</label>
               <Input className={Class.generalInput} disabled={true} readOnly='readOnly' value={Reg_carNo}/>
             </div>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>备&emsp;&emsp;注：</label>
               <TextArea className={Class.generalArea} defaultValue='Return重复缴纳，需做退款处理' onChange={this.remarkInput} />
             </div>
           </article>
        </Modal>
        <Drawer title="退款详情" placement="right" closable={true} onClose={this.drawerClose} visible={drawerVisible} width={`100%`} className={`${Class.drMain} w40`} destroyOnClose={true}>
            <article className={Class.mainDetails}>
                <nav className={Class.eachRow}>退款信息</nav>
                <aside className={Class.detailsBox}>
                   <div className={Class.boxEachRow}>
                     <p className={Class.drawerP}>退款状态：{refundStatus}</p>
                     <p className={`${Class.drawerP} ${Class.marginL}`}>退款金额：{amount}</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p className={Class.drawerP}>退款原因：{refundCause}</p>
                     <p className={`${Class.drawerP} ${Class.marginL}`}>退款路径：{cardNo}</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p className={Class.drawerP}>退款日期：{refundTime}</p>
                   </div>
                </aside>

                <nav className={Class.eachRow}>交易信息</nav>
                <aside className={Class.detailsBox}>
                   <div className={Class.boxEachRow}>
                     <p className={Class.drawerP}>系统参考号：{balanceLine.systemTrace}</p>
                     <p className={`${Class.drawerP} ${Class.marginL}`}>支付流水号：{balanceLine.payTrace}</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p className={Class.drawerP}>支付金额：{balanceLine.amount}</p>
                     <p className={`${Class.drawerP} ${Class.marginL}`}>支付时间：{balanceLine.transDate}</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p className={Class.drawerP}>支付平台：{institutename}</p>
                     <p className={`${Class.drawerP} ${Class.marginL}`}>银行卡号：{balanceLine.cardNo}</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p className={Class.drawerP}>商户名称：{paymentShopName}</p>
                   </div>
                </aside>
            </article>
          </Drawer>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>系统参考号</label>
               <Input className={Class.generalInput} onChange={this.systemTraceInput}/>
               <label className={Class.generalLabel} htmlFor=''>支付流水号</label>
               <Input className={Class.generalInput} onChange={this.balanceTraceInput}/>
               <label className={Class.generalLabel} htmlFor=''>对账日期</label>
               <RangePicker className={Class.generalInput} onChange={this.transDateRange}/>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             
             <div className={`${Class.eachCol} ${Class.marginT1}`}>
             <label className={Class.generalLabel} htmlFor=''>退款原因</label>
             <Select 
              className={Class.generaSelect} 
              style={{ width: `10%` }} 
              onChange={this.refundCauseSelect}
              labelInValue={true}
              defaultValue={{key:'null',label:'全部'}}
             >
                 <Option value='null'>全部</Option>
                 <Option value='0'>补数据失败_业务方</Option>
                 <Option value='1'>重复缴纳_return</Option>
                 <Option value='2'>重复缴纳_其他渠道</Option>
                 <Option value='3'>数据回退_业务方</Option>
                 <Option value='4'>其他</Option>
             </Select>
             <label className={Class.generalLabel} htmlFor=''>退款状态</label>
             <Select 
              className={Class.generaSelect} 
              style={{ width: `10%` }} 
              onChange={this.refundStatusSelect}
              labelInValue={true}
              defaultValue={{key:'null',label:'全部'}}
             >
                 <Option value='null'>全部</Option>
                 <Option value='0'>待退款</Option>
                 <Option value='1'>已退款</Option>
             </Select>
             <label className={Class.generalLabel} htmlFor=''>退款日期</label>
              <RangePicker className={Class.generalInput} onChange={this.refundTimeInput} />
             </div>
             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" onClick={this.exportData}>导出数据</Button>
               <Button icon='plus' className={Class.batchReg_btn} type="primary" onClick={this.batchReg}>批量登记</Button>
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