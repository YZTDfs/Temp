import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_org_manage.less';
import { Table, Select, Input, Button, Icon, Modal, notification} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
export default class SYS_org_manage extends Component {
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
            modalTitle: '',
            modalVisible: false,
            areaList:[]
        };
        this.select=this.select.bind(this);
        this.getAreaList=this.getAreaList.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.edit=this.edit.bind(this);
        this.modalClose = this.modalClose.bind(this);
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
            title: '机构名称', 
            dataIndex: 'terminal_no', 
            key: 'terminal_no',
            width:'15%'
          }, 
          {
            title: '机构类型',
            dataIndex: 'type',
            key: 'type',
            width:'10%'
          }, 
          {
            title: '对账文件',
            dataIndex: 'material',
            key: 'material',
            width:'10%'
          }, 
          {
            title: '最后操作人',
            dataIndex: 'status',
            key: 'status',
            width:'10%'
          },
          {
            title:'修改时间',
            dataIndex:'submitter',
            key:'submitter',
            width:'15%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'8%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.edit}>编辑</Button>
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

    async add(){
      this.setState({
        modalVisible:true,
        modalTitle: '新增机构'
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

    async edit(){
      this.setState({
        modalVisible:true,
        modalTitle: '编辑机构'
      });
      let self=this;
      setTimeout(function(){
        self.setState({
          editLoading:false
        });
      },2000);
    };

    async modalClose(){
      this.setState({
        modalVisible: false
      })
    }

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
      let {modalTitle,modalVisible} = this.state;
      let self=this;
      return(
        <article className={Class.main}>
          <Modal title={modalTitle} visible={modalVisible} onOk={self.ticSubmit} onCancel={self.modalClose} confirmLoading={false} okText='确认' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false}
            className={Class.ticModal} wrapClassName={Class.optModalTree}>
            <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构名称：</label>
            <Input id={Class.organization} className={Class.marginB2}/>
            <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构类型：</label>
            <Select id={Class.opt_select} defaultValue='全部' style={{ width: `80%` }} onChange={self.selectSearch} className={Class.marginB2}>
              <Option value='effective'>平台机构</Option>
              <Option value=''>业务机构</Option>
              <Option value='invalid'>支付机构</Option>
            </Select>
            <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>对账文件：</label>
            <Select id={Class.opt_select} defaultValue='全部' style={{ width: `80%` }} onChange={self.selectSearch} className={Class.marginB2}>
              <Option value='effective'>需要下载</Option>
              <Option value='invalid'>无需下载</Option>
            </Select>
          </Modal>
           <nav>
             <div className={Class.eachCol}>
              <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
              <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构名称</label>
              <Input id={Class.organization_name}/>
               <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构类型</label>
               <Select id={Class.opt_select} defaultValue='全部' style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>全部</Option>
                 <Option value='effective'>平台机构</Option>
                 <Option value=''>业务机构</Option>
                 <Option value='invalid'>支付机构</Option>
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




