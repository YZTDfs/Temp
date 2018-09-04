import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_org_manage.less';
import { Table, Select, Input, Button, Icon, Modal, notification} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
const Option=Select.Option;
export default class SYS_org_manage extends Component {
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
            modalTitle: '',
            modalVisible: false,
            areaList:[],
            submitData:{
              institutename:null,
              institutetype:null
            },
            signType:0,
            modalDetails:{
              m_instituteid:null,
              m_institutename:null,
              m_institutetype:null
            }
        };
        this.select=this.select.bind(this);
        this.getAreaList=this.getAreaList.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.ticSubmit=this.ticSubmit.bind(this);
        this.institutenameInput=this.institutenameInput.bind(this);
        this.selectSearch=this.selectSearch.bind(this);
        this.optNameInput=this.optNameInput.bind(this);
        this.optNumberInput=this.optNumberInput.bind(this);
        this.m_select=this.m_select.bind(this);
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
            title: '机构编号', 
            dataIndex: 'instituteid', 
            key: 'instituteid',
            width:'15%'
          },
          {
            title: '机构名称', 
            dataIndex: 'institutename', 
            key: 'institutename',
            width:'15%'
          }, 
          {
            title: '机构类型',
            dataIndex: 'institutetypeEnum',
            key: 'institutetypeEnum',
            width:'15%'
          }, 
          {
            title: '最后操作人',
            dataIndex: 'lastOperator',
            key: 'lastOperator',
            width:'15%'
          },
          {
            title:'修改时间',
            dataIndex:'gmtModified',
            key:'gmtModified',
            width:'15%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'15%',
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
      const {institutename,institutetype}=this.state.submitData;
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'institute/instituteList',
          method:'post',
          data:{
            pageNum: page,
            pageSize:num,
            institutename:Utils.whiteToNull(institutename),
            institutetype:Utils.whiteToNull(institutetype)
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
        }
      } catch (error) {
        notification['error']({
           message:'接口异常!',
           description:'网络异常!'
        });
      };
    };

    async gotoThispage(current,pagesize){
      const {institutename,institutetype}=this.state.submitData;
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'institute/instituteList',
          method:'post',
          data:{
            pageNum: current,
            pageSize:pagesize,
            institutename:Utils.whiteToNull(institutename),
            institutetype:Utils.whiteToNull(institutetype)
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
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
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          institutetype:parseInt(value,10)
        })
      });
    };

    async add(){
      this.setState({
        modalVisible:true,
        modalTitle: '新增机构',
        modalDetails:{
          m_instituteid:null,
          m_institutename:null,
          m_institutetype:{key:'1'}
        },
        signType:0
      });
    };

    async search(){
      /* this.setState({
        searchLoading:true
      });
      let self=this;
      setTimeout(function(){
        self.setState({
          searchLoading:false
        });
      },2000); */
      this.toSelectchange(1,10);
    };

    async edit(record){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'institute/getInstituteInfo',
          method:'post',
          data:{
            instituteid:record.instituteid
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              modalVisible:true,
              modalTitle: '编辑机构',
              modalDetails:{
                m_instituteid:dataSource.data.instituteid,
                m_institutename:dataSource.data.institutename,
                m_institutetype:{key:`${dataSource.data.institutetype}`}
              },
              signType:1
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

    async modalClose(){
      this.setState({
        modalVisible: false
      })
    }

    async ticSubmit() {
      const {m_instituteid,m_institutename,m_institutetype}=this.state.modalDetails;
      if (m_instituteid===''||Utils.noWhite(m_instituteid)===false||m_institutename===''||Utils.noWhite(m_institutename)===false) {
        notification['error']({
          message:'输入不合法!',
          description:'不能留空或包含空格!'
        });
        return;
      };
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'institute/saveInstitute',
          method:'post',
          data:{
            instituteid:m_instituteid,
            institutename:m_institutename,
            institutetype:parseInt(m_institutetype.key,10),
            sign:this.state.signType
          }
        });
        const {code,msg}=res.data;
        switch (code) {
          case '0000':
            notification['success']({
              message:'操作成功!',
              description:'编辑成功!'
            });
            this.setState({
              modalVisible: false
            });
            break;
          case '0500':
            notification['warning']({
              message:'操作失败!',
              description:msg
            });
            break;
          case '0300':
            notification['warning']({
              message:'接口异常!',
              description:'啊哦,接口出现问题!'
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

    async openNotification(type,msg){
        notification[type]({
          message: msg
        });
    }

    async institutenameInput(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          institutename:event.target.value
        })
      });
    };

    /* bussniess */
    optNumberInput(event){
      this.setState({
        modalDetails:Object.assign({},this.state.modalDetails,{
          m_instituteid:event.target.value.substr(0,6)
        })
      });
    };

    optNameInput(event){
      this.setState({
        modalDetails:Object.assign({},this.state.modalDetails,{
          m_institutename:event.target.value
        })
      });
    };

    m_select(value){
      this.setState({
        modalDetails:Object.assign({},this.state.modalDetails,{
          m_institutetype:{key:`${value.key}`}
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
      let {modalTitle,modalVisible,pageNum} = this.state;
      let self=this;
      const {institutename,institutetype}=this.state.submitData;
      const {m_instituteid,m_institutename,m_institutetype}=this.state.modalDetails;
      return(
        <article className={Class.main}>
          <Modal title={modalTitle} visible={modalVisible} onOk={self.ticSubmit} onCancel={self.modalClose} confirmLoading={false} okText='确认' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false}
            className={Class.ticModal} wrapClassName={Class.optModalTree}>
            <div>
              <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构编号：</label>
              <Input id={Class.organization} className={Class.marginB2} onChange={this.optNumberInput} value={m_instituteid} />
            </div>
            <div>
              <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构名称：</label>
              <Input id={Class.organization} className={Class.marginB2} onChange={this.optNameInput} value={m_institutename} />
            </div>
            <div>
              <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构类型：</label>
              <Select id={Class.opt_select} 
               style={{ width: `80%` }} 
               onChange={this.m_select} 
               className={Class.marginB2}
               labelInValue={true}
               value={m_institutetype}
              >
                <Option value='0'>系统机构</Option>
                <Option value='2'>业务机构</Option>
                <Option value='1'>支付机构</Option>
              </Select>
            </div>
          </Modal>
           <nav>
             <div className={Class.eachCol}>
              <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构名称</label>
              <Input id={Class.organization_name} value={institutename} onChange={this.institutenameInput} />
               <label className={Class.opt_select_lable} htmlFor={Class.opt_select}>机构类型</label>
               <Select id={Class.opt_select} 
                 defaultValue='全部' 
                 style={{ width: `10%` }} 
                 onChange={self.selectSearch}
               >
                 <Option value='null'>全部</Option>
                 <Option value='0'>系统机构</Option>
                 <Option value='2'>业务机构</Option>
                 <Option value='1'>支付机构</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             <div className={`${Class.eachCol} ${Class.marginT2_5}`}>
              <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
             </div>
           </nav>
           <div className={Class.table_main}>
              <Table columns={this.tableColumns}
                     rowKey='instituteid'
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

/* const mapStateToProps = (state) => ({
  dataArr:state.rightMenu.dataArr
});

export default withRouter(connect(
  mapStateToProps
)(BUS_open)) */




