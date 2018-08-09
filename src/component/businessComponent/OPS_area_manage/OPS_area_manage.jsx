import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './OPS_area_manage.less';
import {Table,Select,Input,Button,Icon} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
export default class OPS_area_manage extends Component {
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
            areaList:[]
        };
        this.select=this.select.bind(this);
        this.getAreaList=this.getAreaList.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        /* this.edit=this.edit.bind(this); */
        this.delete=this.delete.bind(this);
    };

    select(){

    };

    async getAreaList(){
       let res=await Utils.axiosRequest({
         url:'http://192.168.20.185:9777/oss/OPS_area_manage_area',
         method:'post',
         data:{}
       });
       if (res.data.code==='0000') {
          this.setState({
            areaList:res.data.data
          });
       };
    };

    createAreaList(e){
       let item=[];
       e.forEach(x => {
         item.push(
           <Option key={x.num} value={x.area_code}>{x.area_code}</Option>
         )
       });
       return item;
    };

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '运维区域', 
            dataIndex: 'area', 
            key: 'area',
            width:'10%'
          }, 
          {
            title: '运维人员',
            dataIndex: 'staff',
            key: 'staff',
            width:'10%'
          }, 
          {
            title: '电话',
            dataIndex: 'tel',
            key: 'tel',
            width:'10%'
          }, 
          {
            title: '备注',
            dataIndex: 'note',
            key: 'note',
            width:'10%'
          },
          {
            title:'终端数量',
            dataIndex:'terminals',
            key:'terminals',
            width:'10%'
          },
          {
            title:'操作人',
            dataIndex:'opter',
            key:'opter',
            width:'11%'
          },
          {
            title:'修改时间',
            dataIndex:'modify_time',
            key:'modify_time',
            width:'15%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'11%',
          render: (text, record,index) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.edit.bind(this,record)}>编辑</Button>
            <Button className={Class.search_btn} type="danger" onClick={this.delete}>删除</Button>
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res=await Utils.axiosRequest({
        url:'http://192.168.20.185:9777/oss/OPS_area_manage',
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
        url:'http://192.168.20.185:9777/oss/OPS_area_manage',
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
      return(
        <article className={Class.main}>
           <nav>
             <div className={Class.eachCol}>
               <label id={Class.opt_select_lable} htmlFor={Class.opt_select}>运维区域</label>
               <Select id={Class.opt_select} className={Class.area} mode='multiple' style={{ width: `10%` }} onChange={self.selectSearch}>
                 {this.createAreaList(this.state.areaList)}
               </Select>
               <label id={Class.opt_select_lable} htmlFor={Class.opt_staff}>运维组长</label>
               <Select id={Class.opt_staff} className={Class.staff} style={{ width: `10%` }} onChange={self.selectSearch}>
                 {/* {this.createAreaList(this.state.areaList)} */}
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




