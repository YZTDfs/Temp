import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_ReturnCode_manage.less';
import {Table,Select,Input,Button,Icon,notification,Modal} from 'antd';
import '../../comDefaultLess/importantCSS.css';


const Option=Select.Option;
const confirm=Modal.confirm;
export default class SYS_ReturnCode_manage extends Component {
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
            tableSearch:{
              errorCode:null,
              errorType:{key:'0',label:''},
              optName:{key:'0',label:''}
            },
            modalState:{
              visible:false,
              title:''
            },
            submitData:{
              m_errorCode:null,
              m_terTips:null,
              m_help:null,
              m_errorType:{key:'0',label:''},
              m_optName:{key:'0','label':''}
            }
        };
        this.getAreaList=this.getAreaList.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
         /* modal */
         this.modalSubmit=this.modalSubmit.bind(this);
         this.modalCancel=this.modalCancel.bind(this);
         // bussniess
         this.m_errorCodeInput=this.m_errorCodeInput.bind(this);
         this.m_terTipsInput=this.m_terTipsInput.bind(this);
         this.m_helpInput=this.m_helpInput.bind(this);
         this.m_errorTypeSelect=this.m_errorTypeSelect.bind(this);
         this.m_optNameSelect=this.m_optNameSelect.bind(this);
         /* end */
         /* table search */
         this.errorCodeInput=this.errorCodeInput.bind(this);
         this.errorTypeSelect=this.errorTypeSelect.bind(this);
         this.optNameSelect=this.optNameSelect.bind(this);
         /* end */
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
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'oss/CTX_adv_manage',
          method:'post',
          data:{
            page:page,
            pagesize:num
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
                count:dataSource.count,
                data:dataSource.data
              }
            });
            break;
          case '0300':
            notification['warning']({
               message:Utils.warn300.msg,
               description:Utils.warn300.desc
            });
            break;
          case '0500':
            notification['warning']({
               message:Utils.warn500.msg,
               description:Utils.warn500.desc
            });
            break;
          default:
            break;
        };
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        });
      };
    };
    async gotoThispage(current,pagesize){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'oss/CTX_adv_manage',
          method:'post',
          data:{
            page:current,
            pagesize:pagesize
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              dataSource:{
                count:dataSource.count,
                data:dataSource.data
              }
            });
            break;
          case '0300':
            notification['warning']({
               message:Utils.warn300.msg,
               description:Utils.warn300.desc
            });
            break;
          case '0500':
            notification['warning']({
               message:Utils.warn500.msg,
               description:Utils.warn500.desc
            });
            break;
          default:
            break;
        };
      } catch (error) {
        notification['error']({
          message:Utils.error.msg,
          description:Utils.error.desc
        });
      };
    };
    /* end */
    async search(){
      this.toSelectchange(1,10);
    };
    async add(){
      this.setState({
        modalState:{
          visible:true,
          title:'新增返回码'
        }
      });
    };
    async edit(record){
      this.setState({
        modalState:{
          visible:true,
          title:'编辑返回码'
        },
      });
    };
    async delete(record){
      confirm({
        title: '删除返回码?',
        content: '是否确定删除返回码?',
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
    /* modal */
    async modalSubmit(){
      this.setState({
        modalState:{
          visible:false
        }
      });
    };
    modalCancel(){
      this.setState({
        modalState:{
          visible:false
        }
      });
    };
    /* end */

    /* bussniess */
    m_errorCodeInput(event){
      this.setState({
         submitData:Object.assign({},this.state.submitData,{
           m_errorCode:event.target.value
         })
      });
    };
    m_terTipsInput(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_terTips:event.target.value
        })
      });
    };
    m_helpInput(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_help:event.target.value
        })
      });
    };
    m_errorTypeSelect(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_errorType:value
        })
      });
    };
    m_optNameSelect(value){
       this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_optName:value
        })
       });
    };
    /* end */
    /* table search */
    errorCodeInput(event){
      this.setState({
        tableSearch:Object.assign({},this.state.tableSearch,{
          errorCode:event.target.value
        })
      });
    };
    errorTypeSelect(value){
      this.setState({
        tableSearch:Object.assign({},this.state.tableSearch,{
          errorType:value
        })
      });
    };
    optNameSelect(value){
      this.setState({
        tableSearch:Object.assign({},this.state.tableSearch,{
          optName:value
        })
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
      let component=this;
      const {errorCode,errorType,optName}=this.state.tableSearch;
      const {visible,title}=this.state.modalState;
      const {m_errorCode,m_terTips,m_help,m_errorType,m_optName}=this.state.submitData;
      return(
        <article className={Class.main}>
        <Modal 
           title={title} 
           visible={visible} 
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
              <label className={Class.generalLabel} htmlFor=''>错误码：</label>
              <Input className={Class.generalInput} onChange={this.m_errorCodeInput} value={m_errorCode} />
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>终端提示：</label>
              <Input className={Class.generalInput} onChange={this.m_terTipsInput} value={m_terTips}/>
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>帮助指引：</label>
              <Input className={Class.generalInput} onChange={this.m_helpInput} value={m_help}/>
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>错误类型：</label>
              <Select 
               className={Class.generalInput} 
               onChange={this.m_errorTypeSelect}
               labelInValue={true}
               value={m_errorType}
              >
                <Option value='effective'>终端业务</Option>
              </Select>
            </div>
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
          </Modal>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>错误码：</label>
               <Input className={Class.generalInput} onChange={this.errorCodeInput} value={errorCode}/>
               <label className={Class.generalLabel} htmlFor=''>错误状态：</label>
               <Select 
                 className={Class.generalInput}
                 labelInValue={true}
                 onChange={this.errorTypeSelect}
                 value={errorType}
               >
                 <Option value='all'>全部</Option>
                 <Option value='effective'>正常</Option>
                 <Option value='invalid'>过期</Option>
               </Select>
               <label className={Class.generalLabel} htmlFor=''>机构名称：</label>
               <Select 
                 className={Class.generalInput}
                 labelInValue={true}
                 onChange={this.optNameSelect}
                 value={optName}
               >
                 <Option value='all'>全部</Option>
                 <Option value='effective'>正常</Option>
                 <Option value='invalid'>过期</Option>
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