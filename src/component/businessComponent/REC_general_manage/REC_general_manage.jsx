import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_general_manage.less';
import {Table,Select,Input,Button,Icon,DatePicker} from 'antd';
import '../../comDefaultLess/importantCSS.css';


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
          title: '交易日期', 
          dataIndex: 'rec_time', 
          key: 'rec_time',
          width:'9%'
        }, 
        {
          title: '支付平台',
          dataIndex: 'pay_plat',
          key: 'pay_plat',
          width:'12%'
        }, 
        {
          title: '业务方',
          dataIndex: 'bus_side',
          key: 'bus_side',
          width:'12%'
        },
        {
          title: '商户',
          dataIndex: 'merchats',
          key: 'merchats',
          width:'9%'
        }, 
        {
          title: '调账前',
          dataIndex:'rec_before',
          key:'rec_before',
          children:[
            {
              title: 'Return',
              dataIndex: 'rec_before.return',
              key: 'rec_before.return',
              width: '8%'
            },
            {
              title: '支付平台',
              dataIndex: 'rec_before.pay_side',
              key: 'rec_before.pay_side',
              width: '8%'
            },
            {
              title: '业务方',
              dataIndex: 'rec_before.bus_side',
              key: 'rec_before.bus_side',
              width: '8%'
            }
          ]
        },
        {
          title: '调账后',
          dataIndex:'rec_after',
          key:'rec_after',
          children:[
            {
              title: 'Return',
              dataIndex: 'rec_after.return',
              key: 'rec_after.return',
              width: '8%'
            },
            {
              title: '支付平台',
              dataIndex: 'rec_after.pay_side',
              key: 'rec_after.pay_side',
              width: '8%'
            },
            {
              title: '业务方',
              dataIndex: 'rec_after.bus_side',
              key: 'rec_after.bus_side',
              width: '8%'
            }
          ]
        },
        {
          title:'对账状态',
          dataIndex:'rec_status',
          key:'rec_status',
          width:'9%'
        }];
    };
    
    async toSelectchange(page,num) {
      let res=await Utils.axiosRequest({
        url:Utils.mutilDevURl+'REC_general_manage',
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
        url:Utils.mutilDevURl+'REC_general_manage',
        method:'post',
        data:{
          pageNum:current,
          pageSize:pagesize
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
              <label className={Class.generalLabel} htmlFor=''>对账日期</label>
              <DatePicker className={Class.generalInput} onChange={self.dateChange} />

              <label className={Class.generalLabel} htmlFor=''>支付平台</label>
              <Select className={Class.generalInput} style={{ width: `10%` }} onChange={self.orzChange}>
                {this.createAreaList(this.state.areaList)}
              </Select>

              <label className={Class.generalLabel} htmlFor=''>业务方</label>
              <Select className={Class.generalInput} defaultValue='全部' onChange={self.statusSearch}>
                <Option key='all' value='all'>全部</Option>
                <Option key='recSuccess' value='effective'>获取成功</Option>
                <Option key='recFailed' value='invalid'>获取失败</Option>
              </Select>
              <label className={Class.generalLabel} htmlFor=''>商户</label>
              <Select className={Class.generalInput} defaultValue='全部' onChange={self.statusSearch}>
                <Option key='all' value='all'>全部</Option>
                <Option key='recSuccess' value='effective'>获取成功</Option>
                <Option key='recFailed' value='invalid'>获取失败</Option>
              </Select>
              <label className={Class.generalLabel} htmlFor=''>对账状态</label>
              <Select className={Class.generalInput} defaultValue='全部' onChange={self.statusSearch}>
                <Option key='all' value='all'>全部</Option>
                <Option key='recSuccess' value='effective'>获取成功</Option>
                <Option key='recFailed' value='invalid'>获取失败</Option>
              </Select>
              <Button icon='search' className={Class.search_btn} type="Default" loading={self.state.searchLoading} onClick={self.search}>查询</Button>
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





