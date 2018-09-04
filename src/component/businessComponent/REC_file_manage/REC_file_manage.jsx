import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_file_manage.less';
import {Table,Select,Input,Button,Icon,DatePicker,notification,Modal} from 'antd';
import '../../comDefaultLess/importantCSS.css';

const Option=Select.Option;
const {RangePicker}=DatePicker;
const confirm=Modal.confirm;
export default class REC_file_manage extends Component {
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

    /* table */
    setTableColumns() {
      this.tableColumns = [
          {
            title: '对账日期', 
            dataIndex: 'rec_time', 
            key: 'rec_time',
            width:'18%'
          }, 
          {
            title: '对账机构',
            dataIndex: 'rec_org',
            key: 'rec_org',
            width:'18%'
          }, 
          {
            title: '获取时间',
            dataIndex: 'acp_time',
            key: 'acp_time',
            width:'23%'
          }, 
          {
            title: '文件状态',
            dataIndex: 'file_status',
            key: 'file_status',
            width:'18%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'22%',
          render: (text, record) =>{
            return this.renderButton(record);
          } 
      }];
    };
    
    async toSelectchange(page,num) {
      let res;
      try {
        res=await Utils.axiosRequest({
          /* url:'http://192.168.20.111:8080/responseCode/list', */
          url:Utils.mutilDevURl+'SYS_file_manage',
          method:'post',
          data:{
            pageNum:page,
            pageSize:num
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              queryInfo:{
                pageSize:num
              },
              dataSource:{
                count: dataSource.count,
                data: dataSource.data
              }
            });
            break;
          case '0300':
            notification['warning']({
              message:'接口异常!',
              description:'啊哦，接口出现异常!'
            });
            break;
          case '0500':
            notification['warning']({
               message:'操作失败!',
               description:'您无权进行此项操作!'
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

    async gotoThispage(current,pagesize){
      let res;
      try {
        res=await Utils.axiosRequest({
          /* url:'http://192.168.20.111:8080/responseCode/list', */
          url:Utils.mutilDevURl+'SYS_file_manage',
          method:'post',
          data:{
            pageNum:current,
            pageSize:pagesize
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              queryInfo:{
                pageSize:pagesize
              },
              dataSource:{
                count: dataSource.count,
                data: dataSource.data
              }
            });
            break;
          case '0300':
            notification['warning']({
              message:'接口异常!',
              description:'啊哦，接口出现异常!'
            });
            break;
          case '0500':
            notification['warning']({
               message:'操作失败!',
               description:'您无权进行此项操作!'
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
    /* end */

    /* render table button */
    renderButton(record){
         if (record.file_status==='获取成功') {
           return(
            <span className={Class.opt_span}>
              <Button className={Class.search_btn} onClick={this.download.bind(this,record)} type='defalut'>下载</Button>
              <Button className={Class.search_btn} onClick={this.upload.bind(this,record)} type='defalut'>上传</Button>
            </span>
           )
         }else{
           return(
             <span className={Class.opt_span}>
              <Button className={Class.search_btn} onClick={this.re_download.bind(this,record)} type='defalut'>重新下载</Button>
              <Button className={Class.search_btn} onClick={this.re_upload.bind(this,record)} type='defalut'>重新上传</Button>
              <Button className={Class.search_btn} onClick={this.re_rec.bind(this,record)} type='defalut'>重新对账</Button>
            </span>
           )
         }
    };
    /* end */

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
    
    /* bussiness */
    async download(record){
      console.log(record);
    };
    async upload(record){
      console.log(record);
    };
    async re_download(record){
      confirm({
        title: '重新下载?',
        content: '该操作会覆盖已完成对账的文件，是否确认继续?',
        okText:'确定',
        cancelText:'取消',
        onOk() {
          console.log('OK',record);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
    async re_upload(record){
      confirm({
        title:'重新上传?',
        content:'该操作会覆盖已完成对账的文件，是否确认继续?',
        okText:'确定',
        cancelText:'取消',
        onOk(){
          console.log('OK',record);
        },
        onCancel(){
          console.log('cancel');
        }
      });
    };
    async re_rec(record){
      confirm({
        title:'重新对账?',
        content:'是否确认重新对账?',
        onOk(){
          console.log('ok',record);
        },
        onCancel(){
          console.log('cancel');
        }
      });
    };
    /* end */

    /* confirm */
    async checkFileStatus(record){
      /* TODO:judge record file status */
      /* end */
    };
    /* end */
    
    

  componentWillMount(){
    this.setTableColumns();
    this.getAreaList();
    this.toSelectchange(1,10);
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let { hint, modalTitle, againVisible,hintVisible,recVisible} = this.state;
      let self=this;
      return(
        <article className={Class.main}>
           <nav>
             <div className={Class.eachCol}>
              <label className={Class.generalLabel} htmlFor=''>对账日期</label>
              <DatePicker className={Class.generalInput} onChange={self.dateChange} />

              <label className={Class.generalLabel} htmlFor=''>对账机构</label>
              <Select className={Class.generalInput} style={{ width: `10%` }} onChange={self.orzChange}>
                {this.createAreaList(this.state.areaList)}
              </Select>

              <label className={Class.generalLabel} htmlFor=''>文件状态</label>
              <Select className={Class.generalInput} defaultValue='全部' style={{ width: `10%` }} onChange={self.statusSearch}>
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





