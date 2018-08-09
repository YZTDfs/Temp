import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './REC_file_manage.less';
import { Table, Select, Input, Button, Icon, DatePicker, Modal, notification} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
const {RangePicker}=DatePicker;
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
            hintVisible: false,
            areaList:[],
            hint:'',
            modalTitle: '',
            againVisible: false,
            creatTime: '',
            endTime: '',
            organizationId: '',
            status: ''
        };
        this.select=this.select.bind(this);
        this.getAreaList=this.getAreaList.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.download=this.download.bind(this);
        this.upload=this.upload.bind(this);
        this.hintClose=this.hintClose.bind(this);
        this.againClose=this.againClose.bind(this);
        this.openNotification= this.openNotification.bind(this);
        this.ticSubmit = this.ticSubmit.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.orzChange = this.orzChange.bind(this);
        this.statusSearch = this.statusSearch.bind(this);
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
            title: '对账日期', 
            dataIndex: 'terminal_no', 
            key: 'terminal_no',
            width:'10%'
          }, 
          {
            title: '对账机构',
            dataIndex: 'type',
            key: 'type',
            width:'8%'
          }, 
          {
            title: '获取时间',
            dataIndex: 'material',
            key: 'material',
            width:'23%'
          }, 
          {
            title: '文件状态',
            dataIndex: 'status',
            key: 'status',
            width:'10%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'15%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.download}>下载</Button>
            <Button className={Class.search_btn} type="primary" onClick={this.upload}>上传</Button>
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

    async ticSubmit() {
      this.openNotification('success',"成功")
    }
    async openNotification(type,msg){
        notification[type]({
          message: msg
        });
    }

    async orzChange(value){
      this.setState({
        organizationId: value
      })
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
      let res = await Utils.axiosRequest({
        url: 'http://192.168.20.185:9777/oss/REC_file_manage',
        method: 'post',
        data: {
          creatTime: this.state.creatTime,
          endTime: this.state.endTime,
          organizationId: this.state.organizationId
        }
      });
      if (res.data.code === '0000') {
        this.setState({
          dataSource: {
            count: res.data.dataSource.count,
            data: res.data.dataSource.data
          }
        })
      };
    };

    async statusSearch(value){
      this.setState({
        status: value
      })
    }

    async download(){
      this.setState({
        hintVisible: true,
        hint: '下载失败，你可以手动上传对账文件'
      })
    };

    async hintClose(){
      this.setState({
        hintVisible: false
      })
    };  
    
    async upload(){
      this.setState({
        modalTitle: "重新下载",
        againVisible: true,
        hint: "文件类型或格式有误"
      })
    };

    async againClose(){
      this.setState({
        againVisible: false
      });
    }

    async dateChange(date, dateString) {
      this.setState({
        creatTime: dateString[0],
        endTime: dateString[1]
      });
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
      let { hint, modalTitle, againVisible,hintVisible} = this.state;
      let self=this;
      return(
        <article className={Class.main}>
          <Modal visible={hintVisible} footer={null} confirmLoading={false} onCancel={self.hintClose} destroyOnClose={true} closable={true} maskClosable={false}
            className={Class.ticModal} wrapClassName={Class.optModalTree}>
            {hint}
          </Modal>
          <Modal title={modalTitle} visible={againVisible} onOk={self.ticSubmit} onCancel={self.againClose} confirmLoading={false} okText='确认' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false}
            className={Class.ticModal} wrapClassName={Class.optModalTree}>
            {hint}
          </Modal>
           <nav>
             <div className={Class.eachCol}>
                <label className={Class.opt_select_lable} htmlFor="">对账日期</label>
                <RangePicker onChange={self.dateChange} />

              <label className={Class.opt_select_lable} htmlFor="">对账机构</label>
              <Select id={Class.opt_select} style={{ width: `10%` }} onChange={self.orzChange}>
                {this.createAreaList(this.state.areaList)}
              </Select>

              <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>文件状态</label>
              <Select id={Class.opt_select} defaultValue='全部' style={{ width: `10%` }} onChange={self.statusSearch}>
                <Option value='all'>全部</Option>
                <Option value='effective'>获取成功</Option>
                <Option value='invalid'>获取失败</Option>
              </Select>
              <Button icon='search' className={Class.search_btn} type="Default" loading={self.state.searchLoading} onClick={self.search}>查询</Button>
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




