import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_HandleCode_manage.less';
import {Table,Select,Input,Button,Icon,Modal,notification} from 'antd';
import '../../comDefaultLess/importantCSS.css';



const Option=Select.Option;
const confirm=Modal.confirm;
export default class SYS_HandleCode_manage extends Component {
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
              optNum:null,
              optName:null,
              busType:{key:'null',label:''},
              busOpt:{key:'null',label:''}
            },
            modalState:{
              visible:false,
              title:''
            },
            submitData:{
              m_optName:{key:'0',label:''},
              m_busType:{key:'0',label:''},
              m_busOpt:{key:'0',label:''},
              m_meanCN:null,
              m_optCode:null
            }
        };
        this.getAreaList=this.getAreaList.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        /* modal */
        this.modalSubmit=this.modalSubmit.bind(this);
        this.modalCancel=this.modalCancel.bind(this);
        //bussiness
        this.m_optNameSelect=this.m_optNameSelect.bind(this);
        this.m_busTypeSelect=this.m_busTypeSelect.bind(this);
        this.m_busOptSelect=this.m_busOptSelect.bind(this);
        this.m_meanCNInput=this.m_meanCNInput.bind(this);
        this.m_optCodeInput=this.m_optCodeInput.bind(this);
        /* end */
        /* table search */
        this.optNumInput=this.optNumInput.bind(this);
        this.optNameInput=this.optNameInput.bind(this);
        this.busTypeSelect=this.busTypeSelect.bind(this);
        this.busOptSelect=this.busOptSelect.bind(this);
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
        url:Utils.mutilDevURl+'oss/CTX_announce_manage_city',
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
          url:Utils.testDevURL+'oss/CTX_adv_manage',
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
    async edit(record){
      this.setState({
        modalState:{
          visible:true,
          title:'编辑操作码'
        }
      });
    };
    async add(){
      this.setState({
        modalState:{
          visible:true,
          title:'新增操作码'
        }
      });
    };
    async delete(record){
      confirm({
        title: '删除操作码?',
        content: '是否确定删除操作码?',
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
    modalSubmit(){
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

    /* bussiness */
    m_optNameSelect(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_optName:value          
        })
      });
    };
    m_busTypeSelect(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_busType:value 
        })
      });
    };
    m_busOptSelect(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_busOpt:value
        })
      });
    };
    m_meanCNInput(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_meanCN:event.target.value
        })
      });
    };
    m_optCodeInput(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          m_optCode:event.target.value
        })
      });
    };
    /* end */

    /* table search */
    optNumInput(event){
      this.setState({
        tableSearch:Object.assign({},this.state.tableSearch,{
          optNum:event.target.value
        })
      });
    };
    optNameInput(event){
      this.setState({
        tableSearch:Object.assign({},this.state.tableSearch,{
          optName:event.target.value
        })
      });
    };
    busTypeSelect(value){
      this.setState({
        tableSearch:Object.assign({},this.state.tableSearch,{
          busType:value
        })
      });
    };
    busOptSelect(value){
      this.setState({
        tableSearch:Object.assign({},this.state.tableSearch,{
          busOpt:value
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
      const {optNum,optName,busType,busOpt}=this.state.tableSearch;
      const {visible,title}=this.state.modalState;
      const {m_optName,m_busType,m_busOpt,m_meanCN,m_optCode}=this.state.submitData;
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
              <Select 
               className={Class.generalInput} 
               onChange={this.m_busTypeSelect}
               labelInValue={true}
               value={m_busType}
              >
                <Option value='effective'>终端业务</Option>
              </Select>
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>业务操作：</label>
              <Select 
               className={Class.generalInput} 
               onChange={this.m_busOptSelect}
               labelInValue={true}
               value={m_busOpt}
              >
                <Option value='effective'>终端业务</Option>
              </Select>
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>中文名称：</label>
              <Input className={Class.generalInput} onChange={this.m_meanCNInput} value={m_meanCN}/>
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>操作码：</label>
              <Input className={Class.generalInput} onChange={this.m_optCodeInput} value={m_optCode}/>
            </div>
          </Modal>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>操作码：</label>
               <Input className={Class.generalInput} onChange={this.optNumInput} value={optNum}/>
               <label className={Class.generalLabel} htmlFor=''>中文名称：</label>
               <Input className={Class.generalInput} onChange={this.optNameInput} value={optName}/>
               <label className={Class.generalLabel} htmlFor=''>业务类型：</label>
               <Select 
                className={Class.generalInput}
                labelInValue={true}
                onChange={this.busTypeSelect}
                value={busType}
               >
                 <Option value='null'>全部</Option>
                 <Option value='0'>武汉交罚电子眼</Option>
                 <Option value='1'>湖北交罚电子眼</Option>
                 <Option value='2'>武汉交罚决定书</Option>
                 <Option value='3'>湖北交罚决定书</Option>
               </Select>
               <label className={Class.generalLabel} htmlFor=''>业务操作：</label>
               <Select 
                className={Class.generalInput}
                labelInValue={true}
                onChange={this.busOptSelect}
                value={busOpt}
               >
                 <Option value='null'>全部</Option>
                 <Option value="0">查询操作</Option>
                 <Option value="1">缴纳操作</Option>
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




