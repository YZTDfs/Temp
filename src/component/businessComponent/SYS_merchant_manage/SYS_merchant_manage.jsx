import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_merchant_manage.less';
import {Table,Select,Input,Button,Icon,DatePicker,Modal,notification} from 'antd';
import '../../comDefaultLess/importantCSS.css';


const Option=Select.Option;
const {RangePicker}=DatePicker;
export default class SYS_merchant_manage extends Component {
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
            pageNum:1,
            instiList:[],
            sign:1,
            merchantNum:null,
            modalState:{
              visible:false,
              title:''
            },
            submitData:{
              institueid:{key:''},
              gnetshop:null,
              gnetshopname:null,
              type:{key:'T'},
              typeno:null
            }
        };
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.merchantNumInput=this.merchantNumInput.bind(this);
        this.institueidSelect=this.institueidSelect.bind(this);
        this.gnetshopNameInput=this.gnetshopNameInput.bind(this);
        this.typeSelect=this.typeSelect.bind(this);
        this.typeNoInput=this.typeNoInput.bind(this);
        this.modalSubmit=this.modalSubmit.bind(this);
        this.modalCancel=this.modalCancel.bind(this);
        this.createInsList=this.createInsList.bind(this);
        this.gnetshopInput=this.gnetshopInput.bind(this);
    };

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '机构名称', 
            dataIndex: 'institute.institutename', 
            key: 'institute.institutename',
            width:'12.5%'
          }, 
          {
            title: '商户号',
            dataIndex: 'gnetshop',
            key: 'gnetshop',
            width:'12.5%'
          }, 
          {
            title: '商户名称',
            dataIndex: 'gnetshopname',
            key: 'gnetshopname',
            width:'12.5%'
          }, 
          {
            title: '接口类型',
            dataIndex: 'type',
            key: 'type',
            width:'12.5%'
          },
          {
            title:'接口序号',
            dataIndex:'typeno',
            key:'typeno',
            width:'12.5%'
          },
          {
            title:'最后操作人',
            dataIndex:'lastOperator',
            key:'lastOperator',
            width:'12.5%'
          },
          {
            title:'修改时间',
            dataIndex:'gmtModified',
            key:'gmtModified',
            width:'12.5%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'12.5%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={`${Class.search_btn} ${Class.stand}`} type="primary" onClick={this.edit.bind(this,record)}>编辑</Button>
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
      const {merchantNum}=this.state;
      let res;
      try {
        res=await Utils.axiosRequest({
           url:Utils.prodURL+'shop/shopList',
           method:'post',
           data:{
             pageNum:page,
             pageSize:num,
             gnetshop:Utils.whiteToNull(merchantNum)
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
              },
              pageNum:page
            });
            break;
          case '0500':
            notification['warning']({
              message:'操作失败!',
              description:'您无权进行此项操作!'
            });
            break;
          case '0300':
            notification['warning']({
              message:'接口异常!',
              description:'啊哦，接口出现问题!'
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
      const {merchantNum}=this.state;
      let res;
      try {
        res=await Utils.axiosRequest({
           url:Utils.prodURL+'shop/shopList',
           method:'post',
           data:{
             pageNum:current,
             pageSize:pagesize,
             gnetshop:Utils.whiteToNull(merchantNum)
           }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              queryInfo:{
                pageSize:current
              },
              dataSource:{
                count:dataSource.count,
                data:dataSource.data
              },
              pageNum:current
            });
            break;
          case '0500':
            notification['warning']({
              message:'操作失败!',
              description:'您无权进行此项操作!'
            });
            break;
          case '0300':
            notification['warning']({
              message:'接口异常!',
              description:'啊哦，接口出现问题!'
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
    
    /**
     * select
     * @param {stateData} e 
     */
    createInsList(e){
      let item=[];
      e.forEach(x => {
        item.push(
          <Option key={x.instituteid} value={x.instituteid}>{x.institutename}</Option>
        )
      });
      return item;
    };

    async getIniSelectList(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'institute/instituteAll',
          method:'post',
          data:{}
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
                instiList:dataSource.data
            });
            break;
          case '0500':
            notification['warning']({
              message:'操作失败!',
              description:'您无权进行此项操作!'
            });
            break;
          case '0300':
            notification['warning']({
               message:'接口异常!',
               description:'啊哦，接口出现问题!'
            });
            break;
          default:
            break;
        }
      } catch (error) {
        notification['error']({
          message:'接口异常!',
          description:'网络异常!'
        });
      };
    };

    /* end */

    async selectSearch(value){
      console.log(value);
    };

    async add(){
      this.setState({
        modalState:{
          visible:true,
          title:'新增商户'
        },
        submitData:{
          institueid:{key:'0',label:''},
          gnetshop:null,
          gnetshopname:null,
          type:{key:'0',label:''},
          typeno:null
        },
        sign:0
      });
    };

    async edit(record){
     let res;
     try {
       res=await Utils.axiosRequest({
          url:Utils.prodURL+'shop/getPaymentmsgInfo',
          method:'post',
          data:{
            gnetshop:record.gnetshop,
            type:record.type,
            typeno:record.typeno
          }
       });
       const {code,dataSource}=res.data;
       switch (code) {
         case '0000':
           this.setState({
             modalState:{
               visible:true,
               title:'编辑商户',
            },
            submitData:{
              institueid:{key:dataSource.data.institueid},
              gnetshop:dataSource.data.gnetshop,
              gnetshopname:dataSource.data.gnetshopname,
              type:{key:dataSource.data.zmk,label:dataSource.data.type},
              typeno:dataSource.data.typeno
            },
            sign:1
           });
           break;
         case '0300':
           notification['warning']({
              message:'接口异常!',
              description:'啊哦，接口出现问题!'
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

    async search(){
      this.toSelectchange(1,10);
    };

    

    /* bussniess */
    async merchantNumInput(event){
      this.setState({
        merchantNum:event.target.value
      });
    };

    institueidSelect(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          institueid:{key:`${value.key}`}
        })
      });
    };
    
    gnetshopInput(event){
       this.setState({
         submitData:Object.assign({},this.state.submitData,{
           gnetshop:event.target.value 
         })
       });
    };

    gnetshopNameInput(event){
       this.setState({
         submitData:Object.assign({},this.state.submitData,{
           gnetshopname:event.target.value
         })
       });
    };
    
    typeSelect(value){
       this.setState({
         submitData:Object.assign({},this.state.submitData,{
           type:value
         })
       });
    };

    typeNoInput(event){
       this.setState({
         submitData:Object.assign({},this.state.submitData,{
           typeno:event.target.value
         })
       });
    };
    
    /* end */

    /* modal */
    async modalSubmit(){
      const {institueid,gnetshop,gnetshopname,type,typeno}=this.state.submitData;
      let res;
      if (institueid===''||institueid.label===''||gnetshop===''||Utils.noWhite(gnetshop)===false||gnetshopname===''||Utils.noWhite(gnetshopname)===false||type===''||type.label===''||typeno===''||Utils.noWhite(typeno)===false) {
        notification['error']({
          message:'输入不合法!',
          description:'不能为空或含有空格!'
        });
        return;
      };
      try {
        res=await Utils.axiosRequest({
           url:Utils.prodURL+'shop/saveShop',
           method:'post',
           data:{
             institueid:parseInt(institueid.key,10),
             gnetshop:gnetshop,
             gnetshopname:gnetshopname,
             type:type.label,
             typeno:typeno,
             sign:this.state.sign
           }
        });
        const {code,msg}=res.data;
        switch (code) {
          case '0000':
            notification['success']({
              message:'操作成功!',
              description:'提交成功!'
            });
            this.setState({
              modalState:{
                visible:false,
                title:''
              }
            });
            break;
          case '0300':
            notification['warning']({
              message:'接口异常!',
              description:msg
            });
            break;
          case '0500':
            notification['warning']({
              message:'操作失败!',
              description:msg
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
     
    modalCancel(){
       this.setState({
        modalState:{
          visible:false,
          title:''
        }
       });
    };
    /* end */
    

    
  componentWillMount(){
    this.setTableColumns();
    this.toSelectchange(1,10);
    this.getIniSelectList();
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      const {merchantNum,instiList,pageNum}=this.state;
      const {visible,title}=this.state.modalState;
      const {institueid,gnetshop,gnetshopname,type,typeno}=this.state.submitData;
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
              <label className={Class.generalLabel} htmlFor={Class.opt_select}>机构名称：</label>
              <Select 
               className={Class.generalInput}
               labelInValue={true}
               onChange={this.institueidSelect} 
               value={institueid}
              >
                {this.createInsList(instiList)}
              </Select>
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>商户号：</label>
              <Input className={Class.generalInput} onChange={this.gnetshopInput} value={gnetshop} />
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>商户名称：</label>
              <Input className={Class.generalInput} onChange={this.gnetshopNameInput} value={gnetshopname} />
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>接口类型：</label>
               <Select
                className={Class.generalInput}
                labelInValue={true}
                onChange={this.typeSelect}
                value={type}
               >
                 <Option value='M'>手机业务</Option>
                 <Option value='W'>网站业务</Option>
                 <Option value='T'>终端业务</Option>
                 <Option value='P'>支付机构</Option>
               </Select>
            </div>
            <div className={Class.m_eachCol}>
              <label className={Class.generalLabel} htmlFor=''>接口序号：</label>
               <Input className={Class.generalInput} onChange={this.typeNoInput} value={typeno} />
            </div>
          </Modal>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>商户号：</label>
               <Input className={Class.generalInput} value={merchantNum} onChange={this.merchantNumInput} />
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
             </div>
           </nav>
           <div className={Class.table_main}>
              <Table columns={this.tableColumns}
                     rowKey={Utils.uuid}
                     dataSource={dataSource}
                     pagination={{
                     current:pageNum,
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





