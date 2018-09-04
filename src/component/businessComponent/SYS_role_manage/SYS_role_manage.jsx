import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_role_manage.less';
import {Table,Select,Input,Button,Modal,Tree,notification} from 'antd';
import '../../comDefaultLess/importantCSS.css';


const TreeNode=Tree.TreeNode;
const Option=Select.Option;
const confirm=Modal.confirm;
export default class SYS_role_manage extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
            addLoading:false,
            searchLoading:false,
            searchInfo:{
              status:0
            },
            optId:null,
            queryStatus:{key:'null',label:'全部'},
            pageNum:1,
            queryInfo : {
            　pageSize: 10
            },     
            dataSource:{
            　count: 0,
            　data: []
        　　},
            treeData:[],
            expandedKeys:[],
            autoExpandParent:false,
            checkedKeys:[],
            treeInfo:'',
            avatorModal:{
              visible:false,
              title:''
            },
            submitData:{
              rolename:'',
              permissionStr:''
            }
        };
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.avatorModalSubmit=this.avatorModalSubmit.bind(this);
        this.avatorModalCancel=this.avatorModalCancel.bind(this);
        this.onExpand=this.onExpand.bind(this);
        this.onCheck=this.onCheck.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.inputRoleName=this.inputRoleName.bind(this);
        this.selectSearch=this.selectSearch.bind(this);
    };

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '角色名称', 
            dataIndex: 'roleName', 
            key: 'roleName',
            width:'15%'
          }, 
          {
            title: '最后操作人',
            dataIndex: 'lastOperator',
            key: 'lastOperator',
            width:'15%'
          }, 
          {
            title: '修改时间',
            dataIndex: 'gmtModified',
            key: 'gmtModified',
            width:'54%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'15%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.edit.bind(this,record)}>编辑</Button>
            <Button className={Class.search_btn} type="danger" onClick={this.showConfirm.bind(this,record)}>删除</Button>
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'role/roleList',
          method:'post',
          data:{
            pageNum:page,
            pageSize:num,
            statusEnum:this.state.queryStatus.key==='null'?null:this.state.queryStatus.key
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
               description:'您无权进行此项操作'
            });
            break;
          case '0300':
            notification['warning']({
               message:'接口异常!',
               description:'啊哦，接口出现问题'
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
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'role/roleList',
          method:'post',
          data:{
            pageNum:current,
            pageSize:pagesize,
            statusEnum:this.state.queryStatus.key==='null'?null:this.state.queryStatus.key
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              pageNum:current,
              dataSource:{
                count:dataSource.count,
                data:dataSource.data
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
            notification['warning']({
               message:'接口异常!',
               description:'啊哦，接口出现问题'
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

    async selectSearch(value){
      this.setState({
        queryStatus:value
      });
    }; 

    add(){
      this.setState({
        avatorModal:{
          visible:true,
          title:'新增角色'
        },
        submitData:{
          rolename:'',
          permissionStr:''
        },
        optId:null,
        checkedKeys:[]
      });
    };

    async search(){
      this.toSelectchange(1,10);
    };

    async edit(record){
      let res,permissionIds;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'role/getRoleInfo',
          method:'post',
          data:{
            roleId:record.roleId
          }
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            permissionIds=dataSource.data.permissionIds
            break;
          case '0300':
            notification['warning']({
               message:'接口异常!',
               description:'啊哦，接口出现问题'
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
      this.setState({
        avatorModal:{
          visible:true,
          title:'编辑角色'
        },
        optId:record.roleId,
        submitData:{
          rolename:record.roleName,
          permissionStr:permissionIds
        },
        checkedKeys:permissionIds===null?[]:permissionIds.split(',')
      });
    };
    
    /* confirm */
    showConfirm(record) {
      let component=this;
      confirm({
        title: '删除角色',
        content: '确定要删除这个角色吗?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          let res;
          try {
            res=await Utils.axiosRequest({
              url:Utils.prodURL+'role/deleteRole',
              method:'post',
              data:{
                roleId:record.roleId
              }
            });
            const {code}=res.data;
            switch (code) {
              case '0000':
                notification['success']({
                  message:'操作成功!',
                  description:'删除成功!'
                });
                break;
              case '0300':
                notification['warning']({
                  message:'接口异常',
                  description:'啊哦，接口出现问题'
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
            component.toSelectchange(1,10);
          } catch (error) {
            notification['error']({
              message:'接口异常!',
              description:'网络异常!'
            });
          };
        },
        onCancel() {
          
        },
      });
    }
    /* end */

   

    /* bussniess */
    async getTreeData(){
       let res;
       try {
         res=await Utils.axiosRequest({
            url:Utils.mutilDevURl+'SYS_role_manage/tree',
            method:'post',
            data:{}
         });
         const {code,dataSource}=res.data;
         switch (code) {
           case '0000':
             this.setState({
               treeData:dataSource.data
             });
             break;
           case '0500':
             notification['warning']({
               message:'操作失败',
               description:'您无权进行此项操作'
             });
             break;
           case '0300':
             notification['warning']({
               message:'接口异常',
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
    
    inputRoleName(event){
      this.setState({
        submitData:{
          rolename:event.target.value,
          permissionStr:this.state.submitData.permissionStr
        }
      });
    };

    /* treeData */
    onExpand(expandedKeys){
      this.setState({
        expandedKeys,
        autoExpandParent: false,
      });
    };
  
    onCheck(checkedKeys,info){
      this.setState({ 
        checkedKeys:checkedKeys,
        treeInfo:info 
      });
    };
  
    onSelect(selectedKeys, info){
      this.setState({ selectedKeys });
    };
  
    renderTreeNodes (data){
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode isFather={true} title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        };
        return <TreeNode {...item} />;
      });
    };
    /* end */
    async avatorModalSubmit(){
      let res,checkedkeySUM,eachCheck,submitCheck,treeStr;
      checkedkeySUM=this.state.checkedKeys;
      eachCheck=this.state.treeInfo.checkedNodes;
      if (eachCheck!==undefined) {
        eachCheck.forEach(x => {
          if(x.props.children){
            submitCheck=Utils.arrayRemove(checkedkeySUM,checkedkeySUM.indexOf(x.key));
          }else{
            submitCheck=checkedkeySUM;
          };
        });
      };
      if (submitCheck!==undefined) {
        treeStr=submitCheck.toString();
      }else{
        /* treeStr=''; */
        treeStr=this.state.checkedKeys.toString();
      };
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'role/saveRole',
          method:'post',
          data:{
            roleName:this.state.submitData.rolename,
            permissionIds:treeStr,
            roleId:this.state.optId
          }
        });
        const {code}=res.data;
        switch (code) {
          case '0000':
            notification['success']({
              message:'操作成功!',
              description:'添加成功!'
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
        this.setState({avatorModal:{visible:false,}});
        this.toSelectchange(1,10);
      } catch (error) {
        notification['error']({
           message:Utils.error.msg,
           description:Utils.error.desc
        });
      };
      this.setState({avatorModal:{visible:false,}});
    };

    avatorModalCancel(){
      this.setState({
        avatorModal:{
          visible:false,
        }
      });
    };
    /* end */

  componentWillMount(){
    this.setTableColumns();
    this.toSelectchange(1,10);
    this.getTreeData();
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let component=this;
      const {avatorModal,treeData,submitData}=this.state;
      const {pageNum}=this.state;
      return(
        <article className={Class.main}>
        <Modal 
         title={avatorModal.title}
         visible={avatorModal.visible}
         onOk={this.avatorModalSubmit}
         onCancel={this.avatorModalCancel}
         okText='提交'
         cancelText='取消' 
         destroyOnClose={true} 
         closable={false} 
         maskClosable={false} 
         className={Class.optModal} 
         wrapClassName={Class.optModalTree}
        >
            <article className={Class.modalMain}>
              <div className={Class.eachCol}>
                <label className={Class.generalLabel} htmlFor=''>角色名称：</label>
                <Input className={Class.generalInput} onChange={this.inputRoleName} value={submitData.rolename}/>
              </div>
              <div className={Class.eachCol}>
                <label className={Class.generalTreeLable} htmlFor=''>用户权限：</label>
                <Tree checkable onExpand={this.onExpand} expandedKeys={this.state.expandedKeys} autoExpandParent={this.state.autoExpandParent} onCheck={this.onCheck} checkedKeys={this.state.checkedKeys} onSelect={this.onSelect} selectedKeys={this.state.selectedKeys} checkStrictly={false} defaultExpandAll={true} className={Class.treeBlock}>
                {this.renderTreeNodes(treeData)}
              </Tree>
              </div>
          </article> 
          </Modal>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor={Class.opt_select}>状态</label>
               <Select id={Class.generalInput} labelInValue={true} defaultValue={{key:'null',label:'全部'}} style={{ width: `10%` }} onChange={this.selectSearch}>
                 <Option value='null'>全部</Option>
                 <Option value='启用'>已启用</Option>
                 <Option value='禁用'>已禁用</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
             </div>
           </nav>
           <div className={Class.table_main}>
              <Table columns={this.tableColumns}
                     rowKey='roleId'
                     dataSource={dataSource}
                     pagination={{
                     current:pageNum,
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




