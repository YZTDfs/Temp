import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './OPS_ops_manage.less';
import {Table,Select,Input,Button,Icon} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
export default class OPS_ops_manage extends Component {
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
        };
        this.select=this.select.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        /* this.edit=this.edit.bind(this);
        this.delete=this.delete.bind(this); */
    };

    select(){

    };

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '运维卡号', 
            dataIndex: 'card_number', 
            key: 'card_number',
            width:'10%'
          }, 
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width:'5%'
          }, 
          {
            title: '访问范围',
            dataIndex: 'scope',
            key: 'scope',
            width:'23%'
          }, 
          {
            title: '生效日期',
            dataIndex: 'effective_date',
            key: 'effective_date',
            width:'10%'
          },
          {
            title:'截止日期',
            dataIndex:'end_date',
            key:'end_date',
            width:'10%'
          },
          {
            title:'最后登录时间',
            dataIndex:'lastLoginTime',
            key:'lastLoginTime',
            width:'11%'
          },
          {
            title:'运维人员',
            dataIndex:'opt_staff',
            key:'opt_staff',
            width:'8%'
          },
          {
            title:'电话',
            dataIndex:'staff_tel',
            key:'staff_tel',
            width:'11%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'11%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.edit.bind(this,record)}>编辑</Button>
            <Button className={Class.search_btn} type="danger" onClick={this.delete.bind(this,record)}>删除</Button>
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res=await Utils.axiosRequest({
        url:'http://localhost:9777/oss/OPS_ops_manage',
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

    async edit(record){
      console.log(record);
      this.setState({
        editLoading:true
      });
      let self=this;
      setTimeout(function(){
        self.setState({
          editLoading:false
        });
      },2000);
    };
    
    async delete(){

    };

    async gotoThispage(current,pagesize){
      let res=await Utils.axiosRequest({
        url:'http://localhost:9777/oss/OPS_ops_manage',
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
    this.toSelectchange(1,10);
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      return(
        <article className={Class.main}>
           <nav>
             <div className={Class.eachCol}>
               <label id={Class.opt_staff_lable} htmlFor={Class.opt_staff}>运维人员</label>
               <Input id={Class.opt_staff} placeholder="运维人员" />
               <label id={Class.opt_select_lable} htmlFor={Class.opt_select}>状态</label>
               <Select id={Class.opt_select} defaultValue='全部' style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>全部</Option>
                 <Option value='effective'>有效</Option>
                 <Option value='invalid'>无效</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
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




