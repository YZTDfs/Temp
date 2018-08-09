import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_general_manage.less';
import { Table, Select, Input, Button, Icon, DatePicker, Modal, notification } from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
const {RangePicker}=DatePicker;
export default class REC_general_manage extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
            addLoading:false,
            searchLoading:false,
            queryInfo : {
            　pageSize: 10
            },
            ModalVisible: false,
            confirmLoading: false,
            dataSource:{
            　count: 0,
            　data: []
        　　},
            areaList:[]
        };
        this.select=this.select.bind(this);
        this.getAreaList=this.getAreaList.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.ModalShow = this.ModalShow.bind(this);
        this.ModalCancel = this.ModalCancel.bind(this);
        this.ticSubmit = this.ticSubmit.bind(this);
        this.openNotification= this.openNotification.bind(this);
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

    };

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '交易日期', 
            dataIndex: 'terminal_no', 
            key: 'terminal_no',
            width:'10%'
          }, 
          {
            title: '业务方',
            dataIndex: 'type',
            key: 'type',
            width:'9%'
          }, 
          {
            title: '商户',
            dataIndex: 'material',
            key: 'material',
            width:'9%'
          }, 
          {
            title: 'Return',
            dataIndex: 'status',
            key: 'status',
            width:'9%'
          },
          {
            title:'支付平台',
            dataIndex:'submitter',
            key:'submitter',
            width:'9%'
          },
          {
            title:'业务方',
            dataIndex:'modify_time',
            key:'modify_time',
            width:'9%'
          },
          {
            title: 'Return',
            dataIndex: 'status',
            key: 'status',
            width:'9%'
          },
          {
            title:'支付平台',
            dataIndex:'submitter',
            key:'submitter',
            width:'9%'
          },
          {
            title:'业务方',
            dataIndex:'modify_time',
            key:'modify_time',
            width:'9%'
          },
          {
            title:'对账状态',
            dataIndex:'end_time',
            key:'end_time',
            width:'9%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'9%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.ModalShow}>重新对账</Button>  
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
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
    };

    async selectSearch(value){
      console.log(value);
    };


    async openNotification(type,msg){
        notification[type]({
          message: msg
        });
    }
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

    async ModalShow(text){
      console.log(text);
      this.setState({
        ModalVisible: true
      })
    };

    async ModalCancel(){
      this.setState({
          ModalVisible:false
      });
    };

    async ticSubmit(){
      console.log(this.state);
      this.openNotification('warning',"已进行轧差处理，无法重新对账")
    };

    async gotoThispage(current,pagesize){
      let res=await Utils.axiosRequest({
        url:'http://192.168.20.185:9777/oss/CTX_adv_manage',
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

  componentWillMount(){
    this.setTableColumns();
    this.getAreaList();
    this.toSelectchange(1,10);
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      const { ModalVisible, confirmLoading} = this.state;
      return(
        <article className={Class.main}>
          <Modal title="重新对账" visible={ModalVisible} onOk={self.ticSubmit} onCancel={self.ModalCancel} confirmLoading={confirmLoading} okText='确认' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false}
            className={Class.ticModal} wrapClassName={Class.optModalTree}>
            是否确认重新对账?
          </Modal>
           <nav>
             <div className={Class.eachCol}>
              <label className={Class.opt_select_lable} htmlFor="">截止时间</label>
              <RangePicker onChange={self.onChange} />
               <label id={Class.opt_staff_lable} htmlFor={Class.opt_staff}>业务方</label>
               <Select id={Class.opt_select} defaultValue='上屏' style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>上屏</Option>
                 <Option value='effective'>查询广告</Option>
                 
                 <Option value='invalid'>办理广告</Option>
               </Select>
               <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>商户</label>
               <Select id={Class.opt_select} defaultValue='全部' style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>全部</Option>
                 <Option value='effective'>正常</Option>
                 <Option value='invalid'>过期</Option>
               </Select>
               <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>对账状态</label>
               <Select id={Class.opt_select} defaultValue='全部' style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>全部</Option>
                 <Option value='effective'>正常</Option>
                 <Option value='invalid'>过期</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
           </nav>
           <div className={Class.table_main}>
              <Table columns={this.tableColumns}
                     rowKey='terminal_no'
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




