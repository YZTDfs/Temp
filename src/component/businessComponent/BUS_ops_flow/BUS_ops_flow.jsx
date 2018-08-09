import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './BUS_ops_flow.less';
import {Table,Select,Input,Button,Icon,DatePicker,Modal,Tree,Drawer,notification} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import './BUS_ops_flow_imtCss.css';

const TreeNode=Tree.TreeNode;
const InputGroup=Input.Group;
const Option=Select.Option;
const {RangePicker}=DatePicker;
export default class BUS_ops_flow extends Component {
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
            optInput:'',
            optModalVisible:false,
            ticketSUPmodalVisible:false,
            confirmLoading:false,
            destroyOnClose:true,
            treeData:[],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            treeInfo:'',
            selectedKeys: [],
            ticketSUP:{
              ModalVisible:false
            },
            submitData:{
              sysReNumber:'',
              optTime:[],
              terminal_no:'',
              userId:'',
              bankCardNumber:'',
              transAmount:[],
              optName:'',
              returnCode:'',
              status:''
            },
            detailsDrawer:{
              Drvisible:false
            },
            detailsData:{
              system:{
                returnCode:'',
                errorType:'',
                help:'',
                terminal_ref:'',
                terminal_no:'',
                optName:'',
                optTime:'',
                userId:'',
                pyCash:'',
                ticStatus:''
              },
              unionpay:{
                returnCode:'',
                payNum:'',
                payAmount:'',
                payTime:'',
                bankCard:'',
                busNum:''
              },
              policeDep:{
                returnCode:'',
                errorType:'',
                decNumber:'',
                illegaler:'',
                illegalTime:'',
                driverCard:'',
                fileNumber:'',
                illegalAction:'',
                illegalPoint:'',
                illegalType:'',
                illegalAddr:'', 
              },
              fines:{
                didHave:false,
                fines:'',
                lateFee:''
              }
            }
        };
        this.toSelectchange=this.toSelectchange.bind(this);
        this.exportExcel=this.exportExcel.bind(this);
        this.search=this.search.bind(this);
        this.ticketSUP=this.ticketSUP.bind(this);
        this.callOptModal=this.callOptModal.bind(this);
        this.optCancel=this.optCancel.bind(this);
        this.optSubmit=this.optSubmit.bind(this);
        this.onExpand=this.onExpand.bind(this);
        this.onCheck=this.onCheck.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.renderTreeNodes=this.renderTreeNodes.bind(this);
        this.terminal_no=this.terminal_no.bind(this);
        this.getTreeData=this.getTreeData.bind(this);
        this.sysReNumberIn=this.sysReNumberIn.bind(this);
        this.dataPick=this.dataPick.bind(this);
        this.userId=this.userId.bind(this);
        this.bankCardNumber=this.bankCardNumber.bind(this);
        this.transAmountStart=this.transAmountStart.bind(this);
        this.transAmountEnd=this.transAmountEnd.bind(this);
        this.ticSubmit=this.ticSubmit.bind(this);
        this.ticCancel=this.ticCancel.bind(this);
        /* this.drawerOpen=this.drawerOpen.bind(this); */
        this.drawerClose=this.drawerClose.bind(this);
    };

    setTableColumns() { 
      this.tableColumns = [
          {
            title: '系统参考号', 
            dataIndex: 'sysReNumber', 
            key: 'sysReNumber',
            width:'10%'
          }, 
          {
            title: '操作名称',
            dataIndex: 'optName',
            key: 'optName',
            width:'15%'
          }, 
          {
            title: '用户号',
            dataIndex: 'userId',
            key: 'userId',
            width:'13%'
          }, 
          {
            title: '交易金额',
            dataIndex: 'transAmount',
            key: 'transAmount',
            width:'10%'
          },
          {
            title:'操作时间',
            dataIndex:'optTime',
            key:'optTime',
            width:'16%'
          },
          {
            title:'状态',
            dataIndex:'status',
            key:'status',
            width:'11%'
          },
          {
            title:'返回码',
            dataIndex:'returnCode',
            key:'returnCode',
            width:'12%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'12%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.view.bind(this,text)}>查看</Button>
            {record.needSUP===true?<Button className={Class.search_btn} type="primary" onClick={this.ticketSUP.bind(this,text)}>票据补打</Button>:null}
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res=await Utils.axiosRequest({
        url:Utils.devURL+'BUS_ops_flow',
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

    async selectSearch(value){
      console.log(value);
    };

    async exportExcel(){
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
      const {sysReNumber,optTime,terminal_no,userId,bankCardNumber,transAmount,optName,returnCode,status}=this.state.submitData;
      let postData={
        sysReNumber:sysReNumber,
        optTime:optTime,
        terminal_no:terminal_no,
        userId:userId,
        bankCardNumber:bankCardNumber,
        transAmount:transAmount,
        optName:optName,
        returnCode:returnCode,
        status:status
      };
      let self=this;
      setTimeout(function(){
        self.setState({
          searchLoading:false
        });
      },2000);
    };

    async view(text){
       let res;
       try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'BUS_ops_flow/details',
          method:'post',
          data:{id:text.id}
        });
        if (res.data.code==='0000') {
          const {system,unionpay,policeDep,fines}=res.data.dataSource;
          this.setState({
            detailsDrawer:{
             Drvisible:true
            },
            detailsData:{
             system:{
               returnCode:system.returnCode,
               errorType:system.errorType,
               help:system.help,
               terminal_ref:system.terminal_ref,
               terminal_no:system.terminal_no,
               optName:system.optName,
               optTime:system.optTime,
               userId:system.userId,
               pyCash:system.pyCash,
               ticStatus:system.ticStatus
             },
             unionpay:{
               returnCode:unionpay.returnCode,
               payNum:unionpay.payNum,
               payAmount:unionpay.payAmount,
               payTime:unionpay.payTime,
               bankCard:unionpay.bankCard,
               busNum:unionpay.busNum
             },
             policeDep:{
               returnCode:policeDep.returnCode,
               decNumber:policeDep.decNumber,
               illegaler:policeDep.illegaler,
               illegalTime:policeDep.illegalTime,
               driverCard:policeDep.driverCard,
               fileNumber:policeDep.fileNumber,
               illegalAction:policeDep.illegalAction,
               illegalPoint:policeDep.illegalPoint,
               illegalType:policeDep.illegalType,
               illegalAddr:policeDep.illegalAddr
             },
             fines:{
               didHave:fines.didHave,
               fines:fines.fines,
               lateFee:fines.lateFee
             }
           }
          });
        }
       } catch (error) {
        notification['error']({
          message:'接口异常!',
          description:'网络出现问题!',
        });
       };
    };

    async ticketSUP(){
      this.setState({
        ticketSUP:{
          ModalVisible:true
        },
      });
    };

    async ticSubmit(){
      this.setState({
        ticketSUP:{
          ModalVisible:false
        }
      });
    };

    ticCancel(){
      this.setState({
        ticketSUP:{
          ModalVisible:false
        }
      });
    };
    

    async gotoThispage(current,pagesize){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.devURL+'BUS_ops_flow',
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
      } catch (error) {
        notification['error']({
          message:'接口异常!',
          description:'网络出现问题!',
        });
      };
    };

    callOptModal(){
      this.setState({
        optModalVisible:true
      });
    };

    optCancel(){
     this.setState({
        optModalVisible:false
     });
    };
    
    optSubmit(){
      let checkedkeySUM,eachCheck,submitCheck,treeStr;
      checkedkeySUM=this.state.checkedKeys;
      eachCheck=this.state.treeInfo.checkedNodes;
      eachCheck.forEach(x => {
        if(x.props.children){
          submitCheck=Utils.arrayRemove(checkedkeySUM,checkedkeySUM.indexOf(x.key));
        }else{
          submitCheck=checkedkeySUM;
        };
      });
      if (submitCheck!==undefined) {
        treeStr=submitCheck.toString();
      }else{
        treeStr='';
      };
      this.setState({
        optInput:treeStr,
        optModalVisible:false
      });
      /* end */
    };
    
    /* tree */
    async getTreeData(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.devURL+'BUS_ops_flow/tree',
          method:'post',
          data:{}
        });
        if (res.data.code='0000') {
          this.setState({
            treeData:res.data.dataSource.data
          });
        };
      } catch (error) {
        notification['error']({
          message:'接口异常!',
          description:'网络出现问题!',
        });
      }
      
    };
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
        }
        return <TreeNode {...item} />;
      });
    };
    /* end */

    /* business */
    terminal_no(event){
      this.setState({
        submitData:{
          terminal_no:event.target.value
        }
      });
    };

    dataPick(dates,dateStrings){
      this.setState({
        submitData:{
          optTime:dateStrings
        }
      });
    };

    sysReNumberIn(event){
      this.setState({
        submitData:{
          sysReNumber:event.target.value
        }
      });
    };

    userId(event){
      this.setState({
        submitData:{
          userId:event.target.value
        }
      });
    };

    bankCardNumber(event){
      this.setState({
        submitData:{
          bankCardNumber:event.target.value
        }
      })
    };

    /* drawer */
    async drawerClose(){
       this.setState({
        detailsDrawer:{
          Drvisible:false
        }
       });
    };
    /* end */

    transAmountStart(event){
      let cashArray=this.state.submitData.transAmount.concat();
      if (cashArray.length!==2) {
        cashArray.push(event.target.value);
      }else{
        cashArray[0]=event.target.value;
      };
      this.setState({
        submitData:{
          transAmount:cashArray
        }
      });
    };

    transAmountEnd(event){
      let cashArray=this.state.submitData.transAmount.concat();
      if (cashArray.length!==2) {
        cashArray.push(event.target.value);
      }else{
        cashArray[1]=event.target.value;
      };
      this.setState({
        submitData:{
          transAmount:cashArray
        }
      })
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
      let self=this;
      const {optModalVisible,confirmLoading,destroyOnClose,treeData,optInput ,sysReNumberIn}=this.state;
      const {ModalVisible}=this.state.ticketSUP;
      const {Drvisible}=this.state.detailsDrawer;
      const {system,unionpay,policeDep,fines}=this.state.detailsData;
      return(
        <article className={Class.main}>
          <Modal title="操作名称" visible={optModalVisible} onOk={self.optSubmit} confirmLoading={confirmLoading} onCancel={self.optCancel} okText='保存' cancelText='取消' destroyOnClose={destroyOnClose} closable={false} maskClosable={false}
           className={Class.optModal} wrapClassName={Class.optModalTree}>
             <Tree checkable onExpand={this.onExpand} expandedKeys={this.state.expandedKeys} autoExpandParent={this.state.autoExpandParent} onCheck={this.onCheck} checkedKeys={this.state.checkedKeys} onSelect={this.onSelect} selectedKeys={this.state.selectedKeys} checkStrictly={false} defaultExpandAll={true}>
              {this.renderTreeNodes(treeData)}
             </Tree>
          </Modal>
          <Modal title="确认补打" visible={ModalVisible} onOk={self.ticSubmit} confirmLoading={confirmLoading} onCancel={self.ticCancel} okText='确认' cancelText='取消' destroyOnClose={destroyOnClose} closable={false} maskClosable={false} className={Class.ticModal} wrapClassName={Class.optModalTree}>
           确认允许再次补打票据？
          </Modal>
          <Drawer title="流水详情" placement="right" closable={true} onClose={this.drawerClose} visible={Drvisible} width={`100%`} className={`${Class.drMain} w75`}>
            <article className={Class.mainDetails}>
                <nav className={Class.eachRow}>系统信息</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdName}>返回码</td>
                        <td>{system.returnCode}</td>
                        <td className={Class.tdName}>错误类型</td>
                        <td>{system.errorType}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>帮助指引</td>
                        <td colSpan='3'>{system.help}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>终端参考号</td>
                        <td>{system.terminal_ref}</td>
                        <td className={Class.tdName}>终端号</td>
                        <td>{system.terminal_no}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>操作名称</td>
                        <td>{system.optName}</td>
                        <td className={Class.tdName}>操作时间</td>
                        <td>{system.optTime}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>用户号</td>
                        <td>{system.userId}</td>
                        <td className={Class.tdName}>交易金额</td>
                        <td>{system.pyCash}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>票据补打</td>
                        <td colSpan='3'>{system.ticStatus}</td>
                      </tr>
                    </tbody>
                  </table>
                </aside>

                <nav className={Class.eachRow}>中国银联湖北分公司</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdName}>返回码</td>
                        <td>{unionpay.returnCode}</td>
                        <td className={Class.tdName}>支付流水号</td>
                        <td colSpan='3'>{unionpay.payNum}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>支付金额</td>
                        <td>{unionpay.payAmount}</td>
                        <td className={Class.tdName}>支付时间</td>
                        <td>{unionpay.payTime}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>银行卡卡号</td>
                        <td>{unionpay.bankCard}</td>
                        <td className={Class.tdName}>商户号</td>
                        <td>{unionpay.busNum}</td>
                      </tr>
                    </tbody>
                  </table>
                </aside>

                <nav className={Class.eachRow}>湖北省公安厅交通管理局</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdName}>返回码</td>
                        <td>{policeDep.returnCode}</td>
                        <td className={Class.tdName}>错误类型</td>
                        <td>{policeDep.errorType}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>决定书编号</td>
                        <td colSpan='3'>{policeDep.decNumber}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>违法当事人</td>
                        <td>{policeDep.illegaler}</td>
                        <td className={Class.tdName}>违法时间</td>
                        <td>{policeDep.illegalTime}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>驾驶证号</td>
                        <td>{policeDep.driverCard}</td>
                        <td className={Class.tdName}>档案编号</td>
                        <td>{policeDep.fileNumber}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>违法行为</td>
                        <td>{policeDep.illegalAction}</td>
                        <td className={Class.tdName}>违法记分数</td>
                        <td>{policeDep.illegalPoint}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>违法行为名称</td>
                        <td colSpan='3'>{policeDep.illegalType}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>违法地址</td>
                        <td colSpan='3'>{policeDep.illegalAddr}</td>
                      </tr>
                      {
                        fines.didHave===true?<tr><td className={Class.tdName}>罚款金额</td><td>{fines.fines}</td><td className={Class.tdName}>滞纳金额</td><td>{fines.lateFee}</td></tr>:null
                      }
                    </tbody>
                  </table>
                </aside>
            </article>
          </Drawer>
           <nav>
             <div className={`${Class.eachCol} ${Class.marginT1}`}>
               <label className={Class.generalLabel} htmlFor="">系统参考号</label>
               <Input className={Class.generalInput} type='text' onChange={sysReNumberIn} />
               <label className={Class.generalLabel} htmlFor="">操作日期</label>
               <RangePicker className={Class.generalInput} onChange={self.dataPick} />
               <label className={Class.generalLabel} htmlFor="">终端号</label>
               <Input className={Class.generalInput} type='text' onChange={this.terminal_no} />
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>用户号</label>
               <Input className={Class.generalInput} type='text' onChange={self.userId} />
               <label className={Class.generalLabel} htmlFor=''>银行卡号</label>
               <Input className={Class.generalInput} type='text' onChange={self.bankCardNumber}/>
               <label className={Class.generalLabel} htmlFor="">支付金额</label>
               <InputGroup className={Class.cashInputGroup} size="defalut">
                   <Input className={Class.cashStart} placeholder='金额范围' onChange={self.transAmountStart} type='number' />~
                   <Input className={Class.cashEnd} placeholder='金额范围' onChange={self.transAmountEnd} type='number' />
               </InputGroup>
             </div>

             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor=''>操作名称</label>
               <Input className={Class.generalInput} type="text" onClick={this.callOptModal} value={optInput} readOnly='readOnly'/>
               <label className={Class.generalLabel} >返回码</label>
               <Input className={Class.generalInput} type="text" />
               <label className={Class.generalLabel} htmlFor={Class.opt_select}>状态</label>
               <Select id={Class.opt_select} defaultValue='全部' style={{ width: `10%` }} onChange={self.selectSearch}>
                 <Option value='all'>全部</Option>
                 <Option value='init'>初始化</Option>
                 <Option value='optSuccess'>操作成功</Option>
                 <Option value='optFailed'>操作失败</Option>
                 <Option value='unfirm'>未确认</Option>
                 <Option value="waitForReversal">待冲正</Option>
                 <Option value="reversalSuccess">冲正成功</Option>
                 <Option value="reversalFailed">冲正失败</Option>
               </Select>
             </div>

             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.exportExcel}>导出数据</Button>
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

/* const mapStateToProps = (state) => ({
  dataArr:state.rightMenu.dataArr
});

export default withRouter(connect(
  mapStateToProps
)(BUS_open)) */




