import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_refund_regist.less';
import {Table,Select,Input,Button,Icon,DatePicker,notification,Modal,Drawer} from 'antd';
import '../../comDefaultLess/importantCSS.css';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
const {RangePicker}=DatePicker;
const {TextArea}=Input;
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
            batchRegModal:{
               BatchVisible:false
            },
            refundModal:{
               refundVisible:false
            },
            detailsDrawer:{
               drawerVisible:false
            }

        };
        this.toSelectchange=this.toSelectchange.bind(this);
        this.exportData=this.exportData.bind(this);
        this.search=this.search.bind(this);
        this.batchReg=this.batchReg.bind(this);
        this.view=this.view.bind(this);
<<<<<<< HEAD
    };

    createAreaList(e){
      let item=[];
      e.forEach(x => {
        item.push(
          <Option key={x.num} value={x.city_code}>{x.city_code}</Option>
        )
      });
      return item;
    };

    async getAreaList(){
      let res=await Utils.axiosRequest({
        url:'http://192.168.20.185:9777/oss/CTX_announce_manage_city',
        method:'post',
        data:{}
      });
      if (res.data.code==='0000') {
         this.setState({
           areaList:res.data.data
         });
      };
   };

    select(){

=======
        this.batchRegSubmit=this.batchRegSubmit.bind(this);
        this.batchRegCancel=this.batchRegCancel.bind(this);
        this.refundReg=this.refundReg.bind(this);
        this.refundRegSubmit=this.refundRegSubmit.bind(this);
        this.refundRegCancel=this.refundRegCancel.bind(this);
        this.drawerClose=this.drawerClose.bind(this);
>>>>>>> ac4ed20d595b7d451147c65317257d5df03e8adb
    };

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '终端号', 
            dataIndex: 'sysRefNum', 
            key: 'sysRefNum',
            width:'10%'
          }, 
          {
            title: '支付流水号',
            dataIndex: 'payFlowNum',
            key: 'payFlowNum',
            width:'10%'
          }, 
          {
            title: '银行卡号',
            dataIndex: 'bankCard',
            key: 'bankCard',
            width:'15%'
          }, 
          {
            title: '交易时间',
            dataIndex: 'pyTime',
            key: 'pyTime',
            width:'10%'
          },
          {
            title:'退款金额',
            dataIndex:'refundSUM',
            key:'refundSUM',
            width:'10%'
          },
          {
            title:'退款原因',
            dataIndex:'refundReason',
            key:'refundReason',
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
            <Button className={Class.search_btn} type="primary" onClick={this.view}>查看</Button>
            {record.needReg===true?<Button className={Class.search_btn} type="primary" onClick={this.refundReg}>登记</Button>:null}
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
<<<<<<< HEAD
      let res=await Utils.axiosRequest({
        url:'http://192.168.20.185:9777/oss/CTX_adv_manage',
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
=======
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'REC_refund_regist',
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
>>>>>>> ac4ed20d595b7d451147c65317257d5df03e8adb
    };

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
      let self=this;
      setTimeout(function(){
        self.setState({
          searchLoading:false
        });
      },2000);
    };

    async view(text){
       console.log(text);
       this.setState({
        detailsDrawer:{
          drawerVisible:true
        }
       });
    };
    
    async drawerClose(){
      this.setState({
        detailsDrawer:{
          drawerVisible:false
        }
      });
    };

    async refundReg(){
      this.setState({
        refundModal:{
          refundVisible:true
        }
      });
    };

    refundRegSubmit(){
      this.setState({
        refundModal:{
          refundVisible:false
        }
      });
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
>>>>>>> ac4ed20d595b7d451147c65317257d5df03e8adb
        }
      });
    };

    exportData(){
    
    };
    

    async gotoThispage(current,pagesize){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'REC_refund_regist',
          method:'post',
          data:{
            page: current,
        　　pagesize:pagesize
          }
        });
        if (res.data.code==='0000') {
          this.setState({                    
        　　dataSource:{
        　　　 count: res.data.dataSource.count,
        　　　 data: res.data.dataSource.data
        　　　 }
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

  componentWillMount(){
    this.setTableColumns();
    this.toSelectchange(1,10);
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      const {batchRegModal,refundModal,detailsDrawer}=this.state;
      const {BatchVisible}=this.state.batchRegModal;
      const {refundVisible}=this.state.refundModal;
      const {drawerVisible}=this.state.detailsDrawer;
      return(
        <article className={Class.main}>
        <Modal title="批量登记" visible={BatchVisible} onOk={self.batchRegSubmit} onCancel={self.batchRegCancel} okText='提交' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false} className={Class.ticModal} wrapClassName={Class.optModalTree}>
           <article>
             <div className={Class.modalInput}>
              <label className={Class.generalLabel} htmlFor="">退款日期</label>
              <RangePicker className={Class.generalInput} onChange={self.onChange} />
             </div>
           </article>
        </Modal>
        <Modal title="退款登记" visible={refundVisible} onOk={self.refundRegSubmit} onCancel={self.refundRegCancel} okText='提交' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false} className={Class.ticModal} wrapClassName={Class.optModalTree}>
           <article>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor="">退款日期</label>
               <RangePicker className={Class.generalInput} onChange={self.onChange} />
             </div>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>退款金额</label>
               <Input className={Class.generalInput} readOnly='readOnly' />
             </div>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>退款路径</label>
               <Input className={Class.generalInput} readOnly='readOnly' />
             </div>
             <div className={Class.modalInput}>
               <label className={Class.generalLabel} htmlFor=''>备&emsp;&emsp;注：</label>
               <TextArea className={Class.generalArea} defaultValue='Return重复缴纳，需做退款处理' onChange={self.remarkInput} />
             </div>
           </article>
        </Modal>
        <Drawer title="退款详情" placement="right" closable={true} onClose={this.drawerClose} visible={drawerVisible} width={`100%`} className={`${Class.drMain} w75`} destroyOnClose={true}>
            <article className={Class.mainDetails}>
                <nav className={Class.eachRow}>退款信息</nav>
                <aside className={Class.detailsBox}>
                   <div className={Class.boxEachRow}>
                     <p>退款状态：</p>
                     <p>退款金额：</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p>退款原因：</p>
                     <p>退款路径：</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p>退款日期：</p>
                   </div>
                </aside>

                <nav className={Class.eachRow}>交易信息</nav>
                <aside className={Class.detailsBox}>
                   <div className={Class.boxEachRow}>
                     <p>系统参考号：</p>
                     <p>支付流水号：</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p>支付金额：</p>
                     <p>支付时间：</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p>支付平台：</p>
                     <p>银行卡号：</p>
                   </div>
                   <div className={Class.boxEachRow}>
                     <p>商户名称：</p>
                   </div>
                </aside>
            </article>
          </Drawer>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>系统参考号</label>
               <Input className={Class.generalInput}/>
               <label className={Class.generalLabel} htmlFor=''>支付流水号</label>
               <Input className={Class.generalInput}/>
               <label className={Class.generalLabel} htmlFor=''>交易日期</label>
               <RangePicker className={Class.generalInput} />
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             
             <div className={`${Class.eachCol} ${Class.marginT1}`}>
             <label className={Class.generalLabel} htmlFor="">退款原因</label>
             <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearch}>
               <Option key='all' value='all'>全部</Option>
               <Option key='rushFailed' value='rushFailed'>冲正失败</Option>
               <Option key='supDataFailed' value='supDataFailed'>补数据失败（业务方）</Option>
               <Option key='repeatReturn' value='repeatReturn'>重复缴纳（Return）</Option>
               <Option key='repeatOther' value='repeatOther'>重复缴纳（其他渠道）</Option>
               <Option key='dataReturn' value='dataReturn'>数据回退（业务方）</Option>
             </Select>
             <label className={Class.generalLabel} htmlFor="">退款状态</label>
             <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option key='all' value='all'>全部</Option>
                 <Option key='wait2refund' value='repeatReturn'>待退款</Option>
                 <Option key='finish' value='repeatOther'>已退款</Option>
             </Select>
             <label className={Class.generalLabel} htmlFor="">退款日期</label>
              <RangePicker className={Class.generalInput} onChange={self.onChange} />
             </div>
             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" onClick={this.exportData}>导出数据</Button>
               <Button icon='plus' className={Class.batchReg_btn} type="primary" onClick={this.batchReg}>批量登记</Button>
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




