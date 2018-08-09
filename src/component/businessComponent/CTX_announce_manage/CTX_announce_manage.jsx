import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './CTX_announce_manage.less';
import {Table,Select,Button,DatePicker} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
const {RangePicker}=DatePicker;
export default class CTX_announce_manage extends Component {
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
        this.createAreaList=this.createAreaList.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.edit=this.edit.bind(this);
        this.delete=this.delete.bind(this);
        this.onChange=this.onChange.bind(this);
    };

    select(){

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

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '终端号', 
            dataIndex: 'terminal_no', 
            key: 'terminal_no',
            width:'10%'
          }, 
          {
            title: '终端区域',
            dataIndex: 'area',
            key: 'area',
            width:'8%'
          }, 
          {
            title: '公告内容',
            dataIndex: 'announce',
            key: 'announce',
            width:'20%'
          }, 
          {
            title: '上屏电话',
            dataIndex: 'tel',
            key: 'tel',
            width:'10%'
          },
          {
            title:'状态',
            dataIndex:'status',
            key:'status',
            width:'10%'
          },
          {
            title:'提交人',
            dataIndex:'submitter',
            key:'submitter',
            width:'11%'
          },
          {
            title:'提交时间',
            dataIndex:'submit_time',
            key:'submit_time',
            width:'8%'
          },
          {
            title:'截止时间',
            dataIndex:'end_time',
            key:'end_time',
            width:'11%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'11%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={`${Class.search_btn} ${Class.stand}`} type="primary" onClick={this.edit}>编辑</Button>
            {/* <Button className={Class.search_btn} type="danger" onClick={this.delete}>删除</Button> */}
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res=await Utils.axiosRequest({
        url:'http://192.168.20.185:9777/oss/CTX_announce_manage',
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
    
    onChange(data,dataSring){
       console.log(data,dataSring);
    };

    async edit(){
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
        url:'http://192.168.20.185:9777/oss/CTX_announce_manage',
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
             <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>终端地区</label>
             <Select id={Class.opt_select} className={Class.area} mode='multiple' style={{ width: `10%` }} onChange={self.selectSearch}>
               {this.createAreaList(this.state.areaList)}
             </Select>
             <label className={Class.opt_select_lable} htmlFor={Class.opt_staff}>公告状态</label>
             <Select id={Class.opt_staff} defaultValue='全部' className={Class.staff} style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>全部</Option>
                 <Option value='effective'>正常</Option>
                 <Option value='invalid'>过期</Option>
             </Select>
             <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
           </div>
           <div className={`${Class.eachCol} ${Class.marginT1}`}>
             <label className={Class.opt_select_lable} htmlFor="">提交时间</label>
             <RangePicker onChange={self.onChange} />
             <label className={Class.opt_select_lable} htmlFor="">截止时间</label>
             <RangePicker onChange={self.onChange} />
           </div>
           <div className={`${Class.eachCol} ${Class.marginT2}`}>
             <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
             <Button icon='exception' className={Class.tel_edit} type="primary" loading={this.state.editLoading} onClick={this.edit}>客服电话修改</Button>
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




