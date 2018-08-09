import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './TER_manager.less';
import {Table,Select,Input,Button,Icon,DatePicker,notification,Drawer} from 'antd';
import '../../comDefaultLess/importantCSS.css';


//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
const {RangePicker}=DatePicker;
export default class TER_manager extends Component {
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
            areaList:[],
            wayList:[]
        };
        this.select=this.select.bind(this);
        this.getAreaList=this.getAreaList.bind(this);
        this.getWayList=this.getWayList.bind(this);
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
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'TER_manager/way',
          method:'post',
          data:{}
        });
        if (res.data.code==='0000') {
          this.setState({
            areaList:res.data.dataSource
          });
        }else if(res.data.code==='0500'){
           notification['warning']({
              message:'操作失败',
              description:'您没有此项操作的权限!'
           });
        }else if(res.data.code==='0300'){
           notification['warning']({
              message:'接口异常',
              description:'啊哦，接口出现问题'
           });
        };
      } catch (error) {
         notification['error']({
            message:'接口异常',
            description:'网路异常!'
         });
      }
    };

    async getWayList(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'TER_manager/way',
          method:'post',
          data:{}
        });
        if (res.data.code==='0000') {
          this.setState({
            wayList:res.data.dataSource
          });
        }else if(res.data.code==='0500'){
           notification['warning']({
              message:'操作失败',
              description:'您没有此项操作的权限!'
           });
        }else if(res.data.code==='0300'){
           notification['warning']({
              message:'接口异常',
              description:'啊哦，接口出现问题'
           });
        };
      } catch (error) {
         notification['error']({
            message:'接口异常',
            description:'网路异常!'
         });
      }
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
            title: '自助设备序列号',
            dataIndex: 'type',
            key: 'type',
            width:'8%'
          }, 
          {
            title: '终端地区',
            dataIndex: 'material',
            key: 'material',
            width:'23%'
          }, 
          {
            title: '终端渠道',
            dataIndex: 'status',
            key: 'status',
            width:'10%'
          },
          {
            title:'网点地址',
            dataIndex:'submitter',
            key:'submitter',
            width:'10%'
          },
          {
            title:'终端状态',
            dataIndex:'modify_time',
            key:'modify_time',
            width:'11%'
          },
          {
            title:'修改时间',
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
      console.log('toChange');
      let res;
      try {
        res=await Utils.axiosRequest({
           url:Utils.mutilDevURl+'TER_manager',
           method:'post',
           data:{
             page:page,
             pagesize:num
           }
        });
        let {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
               queryInfo : {
          　     pageSize: num
      　　　　  },                     
      　　     dataSource:{
      　　　     count: dataSource.count,
      　　　     data: dataSource.data
      　　　   }
      　　   });
            break;
          
          case '0500':
             notification['warning']({
               message:'操作失败!',
               description:'您无权进行此项操作'
             });
             break;
          case '0300':
             notification['warining']({
                message:'接口异常!',
                description:'啊哦，接口出现问题'
             });
             break;
          default:
            break;
        };
      } catch (error) {
            notification['error']({
                message:'接口异常!',
                description:'网络异常!'
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
      console.log('goPage');
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




