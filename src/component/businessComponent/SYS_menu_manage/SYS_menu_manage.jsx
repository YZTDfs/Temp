import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './SYS_menu_manage.less';
import {Select,Input,Button,Icon,notification,Tree} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import _ from 'lodash'

const Option=Select.Option;
const TreeNode = Tree.TreeNode;
const DirectoryTree = Tree.DirectoryTree;
export default class SYS_menu_manage extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
            addLoading:false,
            searchLoading:false,
            treeData:[],
            treeInfo:'',
            selectedKeys:[],
            submitData:{
              level:{key:'1'},
              name:'',
              url:'',
              sort:''
            },
            treeSelectInfo:[]
        };
        this.add=this.add.bind(this);
        this.edit=this.edit.bind(this);
        this.delete=this.delete.bind(this);
        this.onExpand=this.onExpand.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.renderTree=this.renderTree.bind(this);
        this.renderTreeNodes=this.renderTreeNodes.bind(this);
        this.levelSelect=this.levelSelect.bind(this);
        this.menuName=this.menuName.bind(this);
        this.menuUrl=this.menuUrl.bind(this);
        this.menuSort=this.menuSort.bind(this);
        this.renderEachMenu=this.renderEachMenu.bind(this);
    };

    async getTreeData(){
       let res;
       try {
         res=await Utils.axiosRequest({
            url:Utils.mutilDevURl+'SYS_menu_manage/tree',
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

    async add(){

    };

    async edit(){

    };
    
    async delete(){

    };

    /* treeData */
    onExpand (expandedKeys){
      this.setState({
        expandedKeys
      });
    };
  
    onSelect(selectedKeys, info){
      console.log('selectedKeys',selectedKeys)
      console.log('info',info);
      let sendInfo,currentSelect;

      currentSelect=info.node;
      sendInfo=[];
      if (selectedKeys.length===1) {
        sendInfo.push(info.selectedNodes[0]);
        /* judge is Delete */
        if (info.selected) {
          /* selectd */
          /* sendInfo.push(info.selectedNodes) */
          sendInfo.push(currentSelect);
          /* end */
        }else{
          /* cancel selected */
          let obj_i=_.findIndex(sendInfo,currentSelect);
          console.log(obj_i);
          /* end */
        };
        /* end */
      }else{
        sendInfo=info.selectedNodes.concat();
      };
      this.setState({ selectedKeys });
      const {eventKey,com_level,com_name,com_url,com_sort}=info.node.props;
      this.setState({
         autoExpandParent: true,
         submitData:Object.assign({},this.state.submitData,{
           level:{key:com_level},
           name:com_name,
           url:com_url,
           sort:com_sort
         }),
         treeSelectInfo:sendInfo
      });
    };
  
    renderTreeNodes(data){
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode 
             icon={<Icon type="windows" />}
             com_sort={item.com_sort}
             com_name={item.com_Name}
             com_level={item.com_level}
             com_url={item.com_url} 
             title={item.com_Name} 
             key={item.com_key} 
             dataRef={item}
            >
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        };
        return (
           <TreeNode
             icon={<Icon type="api" />}
             com_sort={item.com_sort}
             com_name={item.com_Name}
             com_level={item.com_level}
             com_url={item.com_url} 
             title={item.com_Name} 
             key={item.com_key} 
             dataRef={item}
            />
        );
      });
    };
    
    renderTree(data){
      if (data.length!==0) {
        return(
          <DirectoryTree 
           showIcon 
           defaultExpandAll
           multiple
           onExpand={this.onExpand}
           onSelect={this.onSelect}            
           className={Class.treeBlock}
          >
            {this.renderTreeNodes(this.state.treeData)}
          </DirectoryTree>
        )
      }else{
        return
      }
    };
    /* end */
    
    /* bussiness */
    levelSelect(value){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{level:value})
      });
    };

    menuName(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{name:event.target.value})
      });
    };
    
    menuUrl(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{url:event.target.value})
      });
    };

    menuSort(event){
      this.setState({
        submitData:Object.assign({},this.state.submitData,{sort:event.target.value})
      });
    };

    /* end */

    /* render menu */
    renderEachMenu(OriginData){
      console.log('recevieData',OriginData);
      const renderList=[];
      const data=[];
      if (OriginData.length===0) {
        return renderList;
      };
      OriginData.forEach(x=>{
        if (x!==undefined) {
          data.push(x);
        };
      });
      for (let i =0;i<data.length;i++) {
        let {dataRef}=data[i].props;
        renderList.push(
          <aside key={dataRef.com_key} className={Class.eachMenuDetails}>
              <div className={Class.eachRow}>
                  <label className={Class.generalLabel} htmlFor=''>菜单级别：</label>
                  <Select
                   className={Class.generalInput}
                   defaultActiveFirstOption={true}
                   labelInValue={true}
                   onChange={this.levelSelect}
                   value={[{key:dataRef.com_level}]}
                  >
                    <Option key='1' value='1'>一级</Option>
                    <Option key='2' value='2'>二级</Option>
                    <Option key='3' value='3'>三级</Option>
                    <Option key='4' value='4'>四级</Option>
                    <Option key='5' value='5'>五级</Option>
                    <Option key='6' value='6'>六级</Option>
                    <Option key='7' value='7'>七级</Option>
                    <Option key='8' value='8'>八级</Option>
                  </Select>
                 </div>
                 <div className={Class.eachRow}>
                   <label className={Class.generalLabel} htmlFor=''>菜单名称：</label>
                   <Input 
                    className={Class.generalInput}
                    onChange={this.menuName}
                    value={dataRef.com_Name}
                   />
                 </div>
                 <div className={Class.eachRow}>
                   <label className={Class.generalLabel} htmlFor=''>菜单URL：</label>
                   <Input 
                    className={Class.generalInput}
                    onChange={this.menuUrl}
                    value={dataRef.com_url}
                   />
                 </div>
                 <div className={Class.eachRow}>
                   <label className={Class.generalLabel} htmlFor=''>菜单排序：</label>
                   <Input 
                    className={Class.generalInput}
                    onChange={this.menuSort}
                    value={dataRef.com_sort}
                   />
                 </div>
                 <Button
                   icon='check-circle'
                   className={Class.submit_btn}
                 >提交</Button>
          </aside>
        );
      };
      /* console.log('renderList',renderList); */
      return renderList;
    };
    /* end */


  componentWillMount(){
    this.getTreeData();
  };
  
  render(){
    const {treeData,treeSelectInfo}=this.state;
    const {level,name,url,sort}=this.state.submitData;
      return(
        <article className={Class.main}>
           <nav>
             <div className={Class.eachCol}>
               <Button icon='plus' className={Class.options_btn} type="primary" loading={this.state.searchLoading}>新建</Button>
               <Button icon='form' className={Class.options_btn} type="primary" loading={this.state.searchLoading}>编辑</Button>
               <Button icon='minus' className={Class.options_btn} type="danger" loading={this.state.searchLoading}>删除</Button>
             </div>
             <nav className={Class.eachColTreeModules}>
               <article className={Class.leftTree}>
                 {this.renderTree(treeData)}
               </article>
               <article className={Class.rightDetails}>
                 {this.renderEachMenu(treeSelectInfo)}
               </article>
             </nav>
           </nav>
        </article>
      )
    }
};





