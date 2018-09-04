import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_file_send.less';
import {Table,Select,Input,Button,Icon,DatePicker} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
const {RangePicker}=DatePicker;
export default class REC_file_send extends Component {
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
        this.edit=this.edit.bind(this);
        this.delete=this.delete.bind(this);
        this.view=this.view.bind(this);
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
        url:'http://localhost:9777/oss/CTX_announce_manage_city',
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
            title: '终端号', 
            dataIndex: 'terminal_no', 
            key: 'terminal_no',
            width:'10%'
          }, 
          {
            title: '广告类型',
            dataIndex: 'type',
            key: 'type',
            width:'8%'
          }, 
          {
            title: '素材名称',
            dataIndex: 'material',
            key: 'material',
            width:'23%'
          }, 
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width:'10%'
          },
          {
            title:'提交人',
            dataIndex:'submitter',
            key:'submitter',
            width:'10%'
          },
          {
            title:'提交时间',
            dataIndex:'modify_time',
            key:'modify_time',
            width:'11%'
          },
          {
            title:'截止日期',
            dataIndex:'end_time',
            key:'end_time',
            width:'12%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'15%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.view}>预览</Button>
            <Button className={Class.search_btn} type="primary" onClick={this.edit}>编辑</Button>
            <Button className={Class.search_btn} type="danger" onClick={this.delete}>删除</Button>
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res=await Utils.axiosRequest({
        url:'http://localhost:9777/oss/CTX_adv_manage',
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

    async view(text){
       console.log(text);
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
        url:'http://localhost:9777/oss/CTX_adv_manage',
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
               <label id={Class.opt_staff_lable} htmlFor={Class.opt_staff}>广告类型</label>
               <Select id={Class.opt_select} defaultValue='上屏' style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>上屏</Option>
                 <Option value='effective'>查询广告</Option>
                 <Option value='invalid'>办理广告</Option>
               </Select>
               <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>状态</label>
               <Select id={Class.opt_select} defaultValue='全部' style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>全部</Option>
                 <Option value='effective'>正常</Option>
                 <Option value='invalid'>过期</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             <div className={`${Class.eachCol} ${Class.marginT1}`}>
             <label className={Class.opt_select_lable} htmlFor="">终端地区</label>
             <Select id={Class.opt_select} className={Class.area} mode='multiple' style={{ width: `10%` }} onChange={self.selectSearch}>
               {this.createAreaList(this.state.areaList)}
             </Select>
             <label className={Class.opt_select_lable} htmlFor="">截止时间</label>
              <RangePicker onChange={self.onChange} />
             </div>
             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
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




