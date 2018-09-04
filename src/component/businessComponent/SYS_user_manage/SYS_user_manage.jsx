import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_user_manage.less';
import {Table,Select,Input,Button,notification,Modal,Tree} from 'antd';
import '../../comDefaultLess/importantCSS.css';

const TreeNode=Tree.TreeNode;
const Option=Select.Option;
export default class SYS_user_manage extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
            addLoading:false,
            searchLoading:false,
            queryStatus:null,
            queryInfo : {
            　pageSize: 10
            },     
            dataSource:{
            　count: 0,
            　data: []
        　　},
            pageNum:1,
            treeData:[],
            expandedKeys:[],
            autoExpandParent:false,
            checkedKeys:[],
            treeInfo:'',
            userModal:{
              visible:false,
              title:''
            },
            changPWD:{
              visible:false,
            },
            passwordTips:'',
            inputNewPwd:'',
            avatorSelect:[],
            submitData:{
              userid:null,
              username:'',
              password:'',
              realname:'',
              rolesName:[],
              isencrypt:'',
              status:'',
              permissions:''
            }
        };
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.userModalSubmit=this.userModalSubmit.bind(this);
        this.userModalCancel=this.userModalCancel.bind(this);
        this.changPWDSubmit=this.changPWDSubmit.bind(this);
        this.changPWDCancel=this.changPWDCancel.bind(this);
        this.inputNewPwd=this.inputNewPwd.bind(this);
        this.checkPwd=this.checkPwd.bind(this);
        this.renderTreeNodes=this.renderTreeNodes.bind(this);
        this.onExpand=this.onExpand.bind(this);
        this.onCheck=this.onCheck.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.selectSearch=this.selectSearch.bind(this);
        this.userMutiSelect=this.userMutiSelect.bind(this);
        this.inputUserName=this.inputUserName.bind(this);
        this.inputPassWord=this.inputPassWord.bind(this);
        this.inputRealName=this.inputRealName.bind(this);
        this.inputIsencrypt=this.inputIsencrypt.bind(this);
        this.inputStatus=this.inputStatus.bind(this);
    };
    createSelectList(e){
      let item=[];
      let obj_keys=[];
      for (const obj_key in e[0]) {
       obj_keys.push(obj_key);
      };
      if (e.length!==0) {
        e.forEach(x => {
          item.push(
            <Option key={x[obj_keys[0]]} value={x[obj_keys[0]]}>{x[obj_keys[1]]}</Option>
          );
        });
      };
      return item;
    };
    setTableColumns() { 
      this.tableColumns = [
          {
            title: '用户名', 
            dataIndex: 'userName', 
            key: 'userName',
            width:'10%'
          }, 
          {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
            width:'8%'
          }, 
          {
            title: '角色',
            dataIndex: 'rolesName',
            key: 'rolesName',
            width:'34%'
          }, 
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width:'10%'
          },
          {
            title:'最后操作人',
            dataIndex:'lastOperator',
            key:'lastOperator',
            width:'10%'
          },
          {
            title:'修改日期',
            dataIndex:'gmtModified',
            key:'gmtModified',
            width:'12%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'15%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.changePwd.bind(this,record)}>修改密码</Button>
            <Button className={Class.search_btn} type="primary" onClick={this.edit.bind(this,record)}>编辑</Button>
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
          url:Utils.prodURL+'/user/userList',
          method:'post',
          data:{
            pageNum:page,
            pageSize:num,
            statusStr:this.state.queryStatus
          }
        });
        const {dataSource}=res.data;
        switch (res.data.code) {
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
             message:Utils.warn500.msg,
             description:Utils.warn500.desc
           });
           break;
          case '0300':
           notification['warning']({
             message:Utils.warn300.msg,
             description:Utils.warn300.desc
           });
           break;
          default:
            break;
        }
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
          url:Utils.prodURL+'/user/userList',
          method:'post',
          data:{
            pageNum:current,
            pageSize:pagesize,
            statusStr:this.state.queryStatus
          }
        });
        const {dataSource}=res.data;
        switch (res.data.code) {
          case '0000':
            this.setState({
              queryInfo:{
                pageSize:pagesize
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
             message:Utils.warn500.msg,
             description:Utils.warn500.desc
           });
           break;
          case '0300':
           notification['warning']({
             message:Utils.warn300.msg,
             description:Utils.warn300.desc
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
    async selectSearch(value){
      this.setState({
        queryStatus:value
      });
    };

    async add(){
      this.setState({
        userModal:{
          visible:true,
          title:'新增用户'
        },
        checkedKeys:[],
        submitData:{
          username:'',
          password:'',
          realname:'',
          rolesName:[],
          isencrypt:'',
          status:'',
          permissions:''
        }
      });
    };

    async search(){
      this.toSelectchange(1,10);
    };

    async edit(record){
      let res,resSetData;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'user/getUserInfo',
          method:'post',
          data:{
            userId:record.userId
          }
        });
        const {code,dataSource}=res.data;
        if (dataSource.data.roleIds===null) {
          resSetData={
              userid:record.userId,
              username:dataSource.data.userName,
              password:dataSource.data.password,
              realname:dataSource.data.realName,
              isencrypt:{key:dataSource.data.isEncrypt},
              status:dataSource.data.status,
              permissions:dataSource.data.permissionIds===null?null:dataSource.data.permissionIds
          };
        }else{
          let recRolesName=dataSource.data.roleIds.split(',');
          const rolesDisplay=[];
          recRolesName.forEach(x=>{
            rolesDisplay.push({key:parseInt(x,10)});
          });
          resSetData={
              userid:record.userid,
              username:dataSource.data.userName,
              password:dataSource.data.password,
              realname:dataSource.data.realName,
              rolesName:rolesDisplay,
              isencrypt:{key:dataSource.data.isEncrypt},
              status:dataSource.data.status,
              permissions:dataSource.data.permissionIds===null?null:dataSource.data.permissionIds
          };
        };
        switch (code) {
          case '0000':
            this.setState({
              submitData:resSetData,
              checkedKeys:dataSource.data.permissionIds===null?null:dataSource.data.permissionIds.split(','),
              userModal:{
                visible:true,
                title:'编辑用户'
              }
            });
            break;
          case '0500':
            notification['warning']({
              message:Utils.warn500.msg,
              description:Utils.warn500.desc
            }); 
            break;
          case '0300':
            notification['warning']({
              message:Utils.warn300.msg,
              description:Utils.warn300.desc
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

    async changePwd(){
      this.setState({
        changPWD:{
          visible:true,
        }
      });
    };
    
    /* bussiness */
    async userModalSubmit(){
      const {userid,username,realname,rolesName,isencrypt,status}=this.state.submitData;
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
        treeStr=this.state.checkedKeys===null?'':this.state.checkedKeys.toString();
      };
      if (username===''||realname===''||rolesName.length===0||isencrypt===''||status===''||treeStr==='') {
        notification['warning']({
          message:'不能留空!',
          description:'必须填写完整!'
        });
        return;
      };
      let rolesNameArr=[];
      rolesName.forEach(x=>{
        rolesNameArr.push(x.key);
      });
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'user/saveUser',
          method:'post',
          data:{
          userId:userid,
          userName:username,
          realName:realname,
          roleIds:rolesNameArr.toString(),
          isEncrypt:isencrypt,
          status:status,
          permissionIds:treeStr
          }
        });
        const {code}=res.data;
        switch (code) {
          case '0000':
            notification['success']({
              message:'操作成功!',
              description:'提交成功!'
            });
            this.toSelectchange(1,10);
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
            description:'网络错误!'
        });
      };
      this.setState({
        userModal:{
          visible:false,
          title:''
        }
      });
    };

    async userModalCancel(){
      this.setState({
        userModal:{
          visible:false,
          title:''
        }
      });
    };

    async changPWDSubmit(){
      this.setState({
        changPWD:{
          visible:false
        }
      });
    };

    async changPWDCancel(){
      this.setState({
        changPWD:{
          visible:false
        }
      });
    };

    inputNewPwd(event){
      this.setState({
        inputNewPwd:event.target.value
      });
    };

    checkPwd(event){
       if (event.target.value!==this.state.inputNewPwd) {
         this.setState({
            passwordTips:'两次输入的密码不一致!'
         });
       }else{
         this.setState({
            passwordTips:''
         });
       }
    };
    
 

    userMutiSelect(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
           rolesName:value
        })
      });
    };

    inputUserName(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          username:event.target.value
        })
      });
    };

    inputPassWord(event){
      this.setState({
         submitData:Object.assign({},this.state.submitData,{
           password:event.target.value
         })
      });
    };

    inputIsencrypt(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          isencrypt:value
        })
      });
    };

    inputStatus(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          status:value
        })
      });
    };
    
    inputRealName(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{
          realname:event.target.value
        })
      });
    };


    async getTreeData(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'SYS_user_manage/tree',
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
              message:'操作失败!',
              description:'您无权进行此项操作!'
            });
            break;

          case '0300':
            notification['warning']({
              message:'接口异常！',
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

    /* treeData */
    onExpand (expandedKeys){
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

    /* avator bus */
    async getAvator(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.prodURL+'role/roleAll',
          method:'post',
          data:{}
        });
        const {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
              avatorSelect:dataSource.data
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
           description:'网络异常！'
        });
      };
    };
    /* end */

    /* end */

   
    componentWillMount(){
    this.setTableColumns();
    this.toSelectchange(1,10);
    this.getTreeData();
    this.getAvator();
    };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      const {userModal,changPWD,inputNewPwd,treeData,avatorSelect,submitData,pageNum}=this.state;
      return(
        <article className={Class.main}>
          <Modal 
           title={userModal.title}
           visible={userModal.visible}
           onOk={this.userModalSubmit}
           onCancel={this.userModalCancel}
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
                <label className={Class.generalLabel} htmlFor=''>用户名：</label>
                <Input className={Class.generalInput} value={submitData.username} onChange={this.inputUserName} />
                <label className={Class.generalLabel} htmlFor=''>姓名：</label>
                <Input className={Class.generalInput} value={submitData.realname} onChange={this.inputRealName} />
              </div>
              <div className={Class.eachCol}>
                <label className={Class.generalLabel} htmlFor=''>角色：</label>
                <Select className={Class.generalInputAll} labelInValue={true} mode='multiple' onChange={this.userMutiSelect} value={submitData.rolesName} >
                {self.createSelectList(avatorSelect)}
                </Select>
              </div>
              <div className={Class.eachCol}>
                <label className={Class.generalLabel} htmlFor=''>隐私加密：</label>
                <Select className={Class.generalInput} labelInValue={true} onChange={this.inputIsencrypt} value={submitData.isencrypt} >
                  <Option value='是'>是</Option>
                  <Option value='否'>否</Option>
                </Select>
                <label className={Class.generalLabel} htmlFor=''>状态：</label>
                <Select className={Class.generalInput} defaultActiveFirstOption={true} onChange={this.inputStatus} value={submitData.status}>
                  <Option value='启用'>启用</Option>
                  <Option value='禁用'>禁用</Option>
                </Select>
              </div>
              <div className={Class.eachCol}>
                <label className={Class.generalTreeLable} htmlFor=''>用户权限：</label>
                <Tree checkable onExpand={this.onExpand} expandedKeys={this.state.expandedKeys} autoExpandParent={this.state.autoExpandParent} onCheck={this.onCheck} checkedKeys={this.state.checkedKeys} onSelect={this.onSelect} selectedKeys={this.state.selectedKeys} checkStrictly={false} defaultExpandAll={true} className={Class.treeBlock}>
                {this.renderTreeNodes(treeData)}
              </Tree>
              </div>
          </article> 
          </Modal>
          <Modal
           title="修改密码" 
           visible={changPWD.visible}
           onOk={this.changPWDSubmit}
           onCancel={this.changPWDCancel}
           okText='提交'
           cancelText='取消'
           destroyOnClose={true}
           closable={false}
           maskClosable={false}
           className={Class.optModal}
           wrapClassName={Class.optModalTree}
          >
              <div className={Class.modalInput}>
                <label className={Class.generalLabel} htmlFor=''>新密码</label>
                <Input className={Class.generalInput} onChange={this.inputNewPwd} value={inputNewPwd} />
              </div>
              <div className={Class.modalInput}>
                <label className={Class.generalLabel} htmlFor=''>确认密码</label>
                <Input className={Class.generalInput} onBlur={this.checkPwd} />
              </div>
              <div className={Class.modalInput}>
                <p id='passwordError' className={Class.errorTips}>{this.state.passwordTips}</p>
              </div>
          </Modal>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel}>状态</label>
               <Select className={Class.generalInput} defaultValue='全部' style={{ width: `10%` }} onChange={this.selectSearch}>
                 <Option value='null'>全部</Option>
                 <Option value='启用'>启用</Option>
                 <Option value='禁用'>禁用</Option>
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
             </div>
           </nav>
           <div className={Class.table_main}>
              <Table columns={this.tableColumns}
                     rowKey='userId'
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





