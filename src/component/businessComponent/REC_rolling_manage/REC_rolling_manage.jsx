import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_rolling_manage.less';
import {Table,Select,Input,Button,Icon,DatePicker,notification,Drawer,Modal} from 'antd';
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
              dealStatus:'',
              checkStatus:'',
              dealType:'',
              dealReason:'',
              remark:''
            }
        };
        this.toSelectchange=this.toSelectchange.bind(this);
        this.search=this.search.bind(this);
        this.edit=this.edit.bind(this);
        this.view=this.view.bind(this);
        /* this.selectSearch=this.selectSearch.bind(this); */
        this.selectSearchBUS=this.selectSearchBUS.bind(this);
        this.selectSearchNAME=this.selectSearchNAME.bind(this);
        this.selectSearchMER=this.selectSearchMER.bind(this);
        this.initSelectList=this.initSelectList.bind(this);
        this.drawerClose=this.drawerClose.bind(this);
        this.createDetailTD=this.createDetailTD.bind(this);
        this.ModalSubmit=this.ModalSubmit.bind(this);
        this.ModalCancel=this.ModalCancel.bind(this);
        this.dealTypeSelect=this.dealTypeSelect.bind(this);
        this.dealTypeReason=this.dealTypeReason.bind(this);
        this.remarkInput=this.remarkInput.bind(this);
    };

    createAreaList(e){
      let item=[];
      item.push(
         <Option key='all' value='all'>全部</Option>
      );
      e.forEach((x,i) => {
        item.push(
          <Option key={x.id} value={x.selectName}>{x.selectName}</Option>
        )
      });
      return item;
    };

<<<<<<< HEAD
    async getAreaList(){
      let res=await Utils.axiosRequest({
        url:'http://192.168.20.185:9777/oss/CTX_announce_manage_city',
        method:'post',
        data:{}
      });
      if (res.data.code==='0000') {
         this.setState({
           areaList:res.data.data
=======
    async initSelectList(e){
      let res,data;
      try {
        if (e===undefined) {
         res=await Utils.axiosRequest({
           url:Utils.mutilDevURl+'REC_rolling_manage_select',
           method:'post',
           data:{}
>>>>>>> ac4ed20d595b7d451147c65317257d5df03e8adb
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
    };
    /* table */
    setTableColumns() { 
      this.tableColumns = [
          {
            title: '系统参考号', 
            dataIndex: 'sysRefNum', 
            key: 'sysRefNum',
            width:'10%'
          }, 
          {
            title: '业务方',
            dataIndex: 'businessSide',
            key: 'businessSide',
            width:'11%'
          }, 
          {
            title: '业务名称',
            dataIndex: 'businessName',
            key: 'businessName',
            width:'12%'
          }, 
          {
            title: '支付金额',
            dataIndex: 'payAmount',
            key: 'payAmount',
            width:'10%'
          },
          {
            title:'交易时间',
            dataIndex:'pyTime',
            key:'pyTime',
            width:'10%'
          },
          {
            title:'对账结果',
            dataIndex:'checkRes',
            key:'checkRes',
            width:'11%'
          },
          {
            title:'最后处理方式',
            dataIndex:'finalTre',
            key:'finalTre',
            width:'12%'
          },
          {
            title:'处理状态',
            dataIndex:'dealStatus',
            key:'dealStatus',
            width:'8%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'12%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.view}>查看</Button>
            {record.finish===true?null:<Button className={Class.search_btn} type="primary" onClick={this.edit}>处理</Button>}
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res=await Utils.axiosRequest({
<<<<<<< HEAD
        url:'http://192.168.20.185:9777/oss/CTX_adv_manage',
=======
        url:Utils.mutilDevURl+'REC_rolling_manage',
>>>>>>> ac4ed20d595b7d451147c65317257d5df03e8adb
        method:'post',
        data:{
          page: page,
      　　pagesize:num
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
      　　　 }
      　　});
      }; 
    };

    async gotoThispage(current,pagesize){
      let res=await Utils.axiosRequest({
        url:Utils.mutilDevURl+'REC_rolling_manage',
        method:'post',
        data:{
          page:current,
          pagesize:pagesize
        }
      });
      if (res.data.code==='0000') {
        this.setState({
          dataSource:{
            count:res.data.dataSource.count,
            data:res.data.dataSource.data
          }
        })
      };
    };

    /* end */

    /* bussiness */
    async search(){
      this.setState({
        searchLoading:true
      });
      let self=this;
      setTimeout(function(){
        self.setState({
          searchLoading:false
        });
      },2000);
    };
    
    /* selectSearch(value){
      this.initSelectList(value);
    }; */
    selectSearchBUS(value){
      this.setState({
        busDefalutOptions:{
          defalutBUS:value,
          defalutNAME:'全部',
          defalutMER:'全部'
        }
      });
      this.initSelectList(value);
    };
    selectSearchNAME(value){
      this.setState({
        busDefalutOptions:{
          defalutBUS:this.state.busDefalutOptions.defalutBUS,
          defalutNAME:value,
          defalutMER:this.state.busDefalutOptions.defalutMER
        }
      });
      this.initSelectList(value);
    };
    selectSearchMER(value){
      this.setState({
        busDefalutOptions:{
          defalutBUS:this.state.busDefalutOptions.defalutBUS,
          defalutNAME:this.state.busDefalutOptions.defalutNAME,
          defalutMER:value
        }
      });
      this.initSelectList(value);
    };

    drawerClose(){
      this.setState({
        drawerStatus:{
          visible:false,
        }
      });
    };

    async view(text){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'REC_rolling_manage/details',
          method:'post',
          data:{}
        });
        if (res.data.code==='0000') {
          const {basicInfo,recInfo,dealInfo}=res.data.dataSource;
          this.setState({
            drawerStatus:{
              visible:true
            },
            drawerData:{
              basicInfo:{
                busName:basicInfo.busName,
                payPlat:basicInfo.payPlat,
                busSide:basicInfo.busSide,
                merName:basicInfo.merName
              },
              recInfo:{
                return:{
                    refNum:recInfo.return.refNum,
                    bill:recInfo.return.bill,
                    time:recInfo.return.time
                },
                payPlat:{
                    refNum:recInfo.payPlat.refNum,
                    bill:recInfo.payPlat.bill,
                    time:recInfo.payPlat.time
                },
                busSide:{
                    refNum:recInfo.busSide.refNum,
                    bill:recInfo.busSide.bill,
                    time:recInfo.busSide.time
                }
              },
              dealInfo:dealInfo
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

    createDetailTD(info){
     const listData=[];
     if (info.length!==0) {
        info.forEach(x=>{
           listData.push(
             <tr key={x.id}>
               <td>{x.dealTime}</td>
               <td>{x.status}</td>
               <td>{x.type}</td>
               <td>{x.dealer}</td>
               <td>{x.tips}</td>
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

    };

<<<<<<< HEAD
    async gotoThispage(current,pagesize){
      let res=await Utils.axiosRequest({
        url:'http://192.168.20.185:9777/oss/CTX_adv_manage',
        method:'post',
        data:{
          page:current,
          pagesize:pagesize
=======
    async ModalCancel(){
      this.setState({
        Modal:{
          ModalVisible:false
        }
      });
    };

    dealTypeSelect(value){
      const {ModalVisible,dealStatus,checkStatus,dealReason,remark}=this.state.Modal;
      this.setState({
        Modal:{
          ModalVisible:ModalVisible,
          dealStatus:dealStatus,
          checkStatus:checkStatus,
          dealType:value,
          dealReason:dealReason,
          remark:remark
>>>>>>> ac4ed20d595b7d451147c65317257d5df03e8adb
        }
      });
    };

    dealTypeReason(value){
      const {ModalVisible,dealStatus,checkStatus,dealType,remark}=this.state.Modal;
      this.setState({
        Modal:{
          ModalVisible:ModalVisible,
          dealStatus:dealStatus,
          checkStatus:checkStatus,
          dealType:dealType,
          dealReason:value,
          remark:remark
        }
      });
    };

    remarkInput(value){
      const {ModalVisible,dealStatus,checkStatus,dealType,dealReason,remark}=this.state.Modal;
      this.setState({
        Modal:{
          ModalVisible:ModalVisible,
          dealStatus:dealStatus,
          checkStatus:checkStatus,
          dealType:dealType,
          dealReason:dealReason,
          remark:value
        }
      });
    };
    
    /* end */

  componentWillMount(){
    this.setTableColumns();
    this.initSelectList();
    this.toSelectchange(1,10);
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      const {bussinesNameSelect,bussinesSideSelect,merchantNameSelect,destroyOnClose}=this.state;
      const {defalutBUS,defalutNAME,defalutMER}=this.state.busDefalutOptions;
      const {visible}=this.state.drawerStatus;
      const {basicInfo,recInfo,dealInfo}=this.state.drawerData;
      const {ModalVisible,dealStatus,checkStatus,dealType,remark}=this.state.Modal;
      return(
        <article className={Class.main}>
        <Modal title="轧差处理" visible={ModalVisible} onOk={self.ModalSubmit} onCancel={self.ModalCancel} okText='提交' cancelText='取消' destroyOnClose={destroyOnClose} closable={false} maskClosable={false} className={Class.ticModal} wrapClassName={Class.optModalTree}>
           <article>
             <p>处理状态：{dealStatus}</p>
             <p>对账状态：{checkStatus}</p>
             <div className={Class.modalInput}>
             <label className={Class.generalLabel} htmlFor=''>处理方式：</label>
             <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.dealTypeSelect} defaultValue='退款'>
                <Option key='refund' value='refund'>退款</Option>
                <Option key='supDataDep'value='supDataDep'>补数据（机构）</Option>
                <Option key='supDataRe' value='supDataRe'>补数据（Return）</Option>
                <Option key='buyer' value='buyer'>挂账</Option>
                <Option key='revData' value='revData'>冲正数据（Return）</Option>
                <Option key='offline' value='offline'>线下处理</Option>
              </Select>
             </div>
             <div className={Class.modalInput}>
             <label className={Class.generalLabel} htmlFor=''>退款原因：</label>
             <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.dealTypeReason} defaultValue='重复缴纳（Return）'>
                 <Option key='supDataFailed' value='supDataFailed'>补数据失败（业务方）</Option>
                 <Option key='repeatReturn' value='repeatReturn'>重复缴纳（Return）</Option>
                 <Option key='repeatOther' value='repeatOther'>重复缴纳（其他渠道）</Option>
                 <Option key='dataBack' value='dataBack'>数据回退（业务方）</Option>
                 <Option key='other' value='other'>其他</Option>
              </Select>
             </div>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>备&emsp;&emsp;注：</label>
               <TextArea className={Class.generalArea} defaultValue='Return重复缴纳，需做退款处理' onChange={self.remarkInput} />
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
                        <td className={Class.tdTitle}>处理人</td>
                      </tr>
                      {this.createDetailTD(dealInfo)}
                    </tbody>
                  </table>
                </aside>
            </article>
          </Drawer>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor={Class.opt_staff}>系统参考号</label>
               <Input className={Class.generalInput} type='text' onChange={this.getSysRefNum} />
               <label className={Class.generalLabel} htmlFor="">交易日期</label>
               <RangePicker className={Class.generalInput} onChange={self.onChange} />
               <label className={Class.generalLabel} htmlFor="">处理方式</label>
               <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearch} defaultValue='全部'>
                 <Option key='all' value='all'>全部</Option>
                 <Option key='refund' value='refund'>退款</Option>
                 <Option key='supBUS' value='sup'>补数据（业务方）</Option>
                 <Option key='rush' value='rush'>冲正数据（Return）</Option>
                 <Option key='sup' value='sup'>补数据（Return）</Option>
                 <Option key='buyer' value='buyer'>挂账</Option>
                 <Option key='offline' value='offline'>线下处理</Option>
               </Select>
               <label className={Class.generalLabel} htmlFor="">处理状态</label>
               <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearch} defaultValue='全部'>
                 <Option key='all' value='all'>全部</Option>
                 <Option key='wait' value='wait'>待处理</Option>
                 <Option key='dealing'value='dealing'>处理中</Option>
                 <Option key='finish' value='finish'>已处理</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>

             <div className={`${Class.eachCol} ${Class.marginT1}`}>
              <label className={Class.generalLabel} htmlFor="">业务方</label>
              <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearchBUS} value={defalutBUS} defaultValue='全部'>
              {this.createAreaList(bussinesSideSelect)}
              </Select>
              <label className={Class.generalLabel} htmlFor="">业务名称</label>
              <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearchNAME} value={defalutNAME} defaultValue='全部'>
              {this.createAreaList(bussinesNameSelect)}
              </Select>
              <label className={Class.generalLabel} htmlFor="">商户名称</label>
              <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearchMER} value={defalutMER} defaultValue='全部'>
              {this.createAreaList(merchantNameSelect)}
              </Select>
              <label className={Class.generalLabel} htmlFor="">对账结果</label>
              <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearch} defaultValue='全部'>
                <Option key='all' value='all'>全部</Option>
                <Option key='platMore'value='platMore'>支付平台多</Option>
                <Option key='busMore' value='busMore'>业务方多</Option>
                <Option key='returnMore' value='returnMore'>Return多</Option>
                <Option key='platLess' value='platLess'>支付平台少</Option>
                <Option key='busLess'value='busLess'>业务方少</Option>
                <Option key='returnLess' value='returnLess'>Return少</Option>
                <Option key='cashEqual'value='cashEqual'>金额不一致</Option>
              </Select>
             </div>

           </nav>
           <div className={Class.table_main}>
              <Table columns={this.tableColumns}
                     rowKey='id'
                     dataSource={dataSource}
                     pagination={{
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

/* const mapStateToProps = (state) => ({
  dataArr:state.rightMenu.dataArr
});

export default withRouter(connect(
  mapStateToProps
)(BUS_open)) */




