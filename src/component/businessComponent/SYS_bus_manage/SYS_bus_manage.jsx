import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_bus_manage.less';
import { Table, Select, Input, Button, Icon, DatePicker ,Modal, notification} from 'antd';
import '../../comDefaultLess/importantCSS.css';



const Option=Select.Option;
const confirm=Modal.confirm;
export default class SYS_bus_manage extends Component {
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
            modalTitle: '',
            modalVisible: false,
            /* select */
            optName:{key:'0',label:''},
            busType:{key:'0',label:''},
            /* submitData */
            m_optName:{key:'0',label:''},
            m_busType:null
            /* end */

        };
        this.getAreaList=this.getAreaList.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        /* bussiness */
        this.optNameSelect=this.optNameSelect.bind(this);
        this.busTypeSelect=this.busTypeSelect.bind(this);
        /* modal */
        this.m_optNameSelect=this.m_optNameSelect.bind(this);
        this.m_busTypeInput=this.m_busTypeInput.bind(this);
        this.modalSubmit=this.modalSubmit.bind(this);
        this.modalCancel=this.modalCancel.bind(this);
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
            title: '机构名称', 
            dataIndex: 'terminal_no', 
            key: 'terminal_no',
            width:'16%'
          }, 
          {
            title: '业务类型',
            dataIndex: 'type',
            key: 'type',
            width:'25%'
          }, 
          {
            title: '最后操作人',
            dataIndex: 'material',
            key: 'material',
            width:'20%'
          },
          {
            title:'修改时间',
            dataIndex:'modify_time',
            key:'modify_time',
            width:'25%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'14%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.edit.bind(this,record)}>编辑</Button>
            <Button className={Class.search_btn} type="danger" onClick={this.delete.bind(this,record)}>删除</Button>
          </span>
          ),
      }];
    };
    /**
     * Table
     * @param {currentPage} page 
     * @param {currentSize} num 
     */
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
    /* end */
    async search(){
      this.toSelectchange(1,10);
    };
    async modalSubmit() {
      
    };
    async modalCancel(){
      this.setState({
        modalVisible: false
      });
    };
    async add(){
      this.setState({
        modalVisible:true,
        modalTitle: '新增业务',
        m_optName:{key:'0',label:''},
        m_busType:null
      });
    };
    async edit(){
      this.setState({
        modalVisible:true,
        modalTitle: '编辑业务'
      });
    };
    async delete(record){
      confirm({
        title: '删除机构?',
        content: '是否确定删除机构?',
        okText: '确定',
        okType: 'danger',
        cancelText:'取消',
        onOk() {
          console.log('OK',record);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
    /* bussniess */
    optNameSelect(value){
       this.setState({
         optName:value
       });
    };
    busTypeSelect(value){
       this.setState({
         busType:value
       });
    };
    m_optNameSelect(value){
      this.setState({
        m_optName:value
      });
    };
    m_busTypeInput(event){
      this.setState({
        m_busType:event.target.value
      });
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
      let {modalTitle, modalVisible,optName,busType,m_optName,m_busType} = this.state;
      let component=this;
      return(
        <article className={Class.main}>
          <Modal 
           title={modalTitle} 
           visible={modalVisible} 
           onOk={this.modalSubmit} 
           onCancel={this.modalCancel} 
           confirmLoading={false} 
           okText='确认' 
           cancelText='取消' 
           destroyOnClose={true} 
           closable={false} 
           maskClosable={false}
           className={Class.ticModal} 
           wrapClassName={Class.optModalTree}
          >
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>机构名称：</label>
              <Select 
               className={Class.generalInput} 
               onChange={this.m_optNameSelect}
               labelInValue={true}
               value={m_optName}
              >
                <Option value='effective'>终端业务</Option>
              </Select>
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>业务类型：</label>
              <Input className={Class.generalInput} onChange={this.m_busTypeInput} value={m_busType}/>
            </div>
          </Modal>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>机构名称：</label>
               <Select 
                className={Class.generalInput} 
                onChange={this.optNameSelect}
                labelInValue={true}
                value={optName}
               >
                 <Option value='0'>上屏</Option>
                 <Option value='1'>查询广告</Option>
                 <Option value='2'>办理广告</Option>
               </Select>
               <label className={Class.generalLabel} htmlFor=''>业务类型：</label>
               <Select 
                className={Class.generalInput} 
                onChange={this.busTypeSelect}
                labelInValue={true}
                value={busType}
               >
                 <Option value='null'>全部</Option>
                 <Option value='0'>正常</Option>
                 <Option value='1'>过期</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
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
                       component.toSelectchange(current, pageSize);
                     },
                     onChange(current) {
                       component.gotoThispage(current, component.state.queryInfo.pageSize);
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





