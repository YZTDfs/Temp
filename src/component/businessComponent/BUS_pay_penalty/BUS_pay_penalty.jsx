import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './BUS_pay_penalty.less';
import {Input,Button,Icon,notification,Modal} from 'antd';
import '../../comDefaultLess/importantCSS.css';

export default class BUS_pay_penalty extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
          penaltyStatus:false,
          submitLoading:false,
          subTips:'是否确认解档?',
          submitData:{
            sysRefNumber:'',
          },
          electronEYEinfo:{
             serNumber:'4201400026636767',
             decNumber:'420111142793457',
             handleTarget:'已处理',
             handleTime:'2018-03-20  23:20:00',
             penaltyMark:'已缴',
             penaltyTime:'2018-03-20  00:00:00',
             agenter:'WHYZTSJ0000050001216908288B80'
         },
         decInfo:{
             decNumber:'-',
             agent:'-',
             penaltyMark:'-',
             penaltyTime:'-'
         },
         releaseRecStatus:{
             decNumber:'420111142793457',
             enter:'WHYZTSJ0000050001216908288B80',
             matchMarks:'匹配成功',
             penaltyTime:'2018-03-20  00:00:00'
         },
         tipsModal:{
           visible:false,
         },
         destroyOnClose:true
        };
        this.getSysRefNum=this.getSysRefNum.bind(this);
        this.search=this.search.bind(this);
        this.solution=this.solution.bind(this);
        this.soSure=this.soSure.bind(this);
        this.soCancel=this.soCancel.bind(this);
    };

<<<<<<< HEAD
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
            <Button className={Class.search_btn} type="primary" onClick={this.view}>预览</Button>
            <Button className={Class.search_btn} type="primary" onClick={this.edit}>编辑</Button>
            <Button className={Class.search_btn} type="danger" onClick={this.delete}>删除</Button>
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
=======
    getSysRefNum(event){
       this.setState({
          submitData:{
            sysRefNumber:event.target.value
          }
       });
    };

    async solution(){
      this.setState({
        tipsModal:{
          visible:true
>>>>>>> ac4ed20d595b7d451147c65317257d5df03e8adb
        }
      });
    };

    async soSure(){
      this.setState({
        submitLoading:true,
        subTips:'正在解档'
      });
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'BUS_pay_penalty/submit',
          method:'post',
          data:{
            sysRefNumber:this.state.submitData.sysRefNumber
          }
        });
        if (res.data.code==='0000') {
          this.setState({
            submitLoading:false,
            subTips:'解当成功!'
          });
        }else{
          this.setState({
            submitLoading:false,
            subTips:'解档失败!'
          });
        };
      } catch (error) {
        this.setState({
          submitLoading:false,
          subTips:'解档失败!'
        });
        notification['error']({
          message:'接口异常!',
          description:'网络出现问题!',
        });
      };
    };

    soCancel(){
      this.setState({
        tipsModal:{
          visible:false
        }
      });
    };

<<<<<<< HEAD
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
=======
    async search(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'BUS_pay_penalty',
          method:'post',
          data:{sysRefNumber:this.state.submitData.sysRefNumber}
        });
        if (res.data.code==='0000') {
          const {penaltyStatus,electronEYEinfo,decInfo,releaseRecStatus}=res.data.dataSource;
          this.setState({
            penaltyStatus:penaltyStatus,
            electronEYEinfo:{
               serNumber:electronEYEinfo.serNumber,
               decNumber:electronEYEinfo.decNumber,
               handleTarget:electronEYEinfo.handleTarget,
               handleTime:electronEYEinfo.handleTime,
               penaltyMark:electronEYEinfo.penaltyMark,
               penaltyTime:electronEYEinfo.penaltyTime,
               agenter:electronEYEinfo.agenter
           },
           decInfo:{
               decNumber:decInfo.decNumber,
               agent:decInfo.agent,
               penaltyMark:decInfo.penaltyMark,
               penaltyTime:decInfo.penaltyTime
           },
           releaseRecStatus:{
               decNumber:releaseRecStatus.decNumber,
               enter:releaseRecStatus.enter,
               matchMarks:releaseRecStatus.matchMarks,
               penaltyTime:releaseRecStatus.penaltyTime
           }
          });
        }else if(res.data.code==='500'){
          notification['warning']({
            message: '错误',
            description: '非交罚解档的系统参考号',
          });
        }else if(res.data.code==='0300'){
          notification['warning']({
            message:'没有权限!',
            description:'没有权限进行此项操作!',
          })
        }else{
          notification['error']({
            message:'接口异常!',
            description:'网络出现问题!',
          });
        };
      } catch (error) {
        notification['error']({
          message:'接口异常!',
          description:'网络出现问题!',
        });
>>>>>>> ac4ed20d595b7d451147c65317257d5df03e8adb
      };
    };


  

  render(){
    const {penaltyStatus,electronEYEinfo,decInfo,releaseRecStatus,tipsModal,destroyOnClose,subTips,submitLoading}=this.state;
    let self=this;
      return(
        <article className={Class.main}>
          <Modal title="确认补打" visible={tipsModal.visible} onOk={self.soSure} onCancel={self.soCancel} okText='确认' cancelText='取消' destroyOnClose={destroyOnClose} closable={false} maskClosable={false} className={Class.ticModal} wrapClassName={Class.optModalTree} cancelButtonProps={submitLoading===true?{disabled:true}:{disabled:false}}>
          <Icon type="sync" spin={true} className={submitLoading===true?Class.showIcon:Class.hideIcon} />
           {`     ${subTips}`}
          </Modal>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.opt_staff_lable} htmlFor={Class.opt_staff}>系统参考号</label>
               <Input className={Class.generalInput} type='text' onChange={this.getSysRefNum} />
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>
           </nav>
           <div className={Class.table_main}>
           <article className={`${Class.mainDetails}  ${penaltyStatus===true?Class.onDisplay:Class.onHide}`}>
                <nav className={Class.eachRow}>电子眼信息</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdName}>序号</td>
                        <td>{electronEYEinfo.serNumber}</td>
                        <td className={Class.tdName}>决定书编号</td>
                        <td>{electronEYEinfo.decNumber}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>处理标记</td>
                        <td>{electronEYEinfo.handleTarget}</td>
                        <td className={Class.tdName}>处理时间</td>
                        <td>{electronEYEinfo.handleTime}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>交款标记</td>
                        <td>{electronEYEinfo.penaltyMark}</td>
                        <td className={Class.tdName}>交款时间</td>
                        <td>{electronEYEinfo.penaltyTime}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>经办人</td>
                        <td colSpan='3'>{electronEYEinfo.agenter}</td>
                      </tr>
                    </tbody>
                  </table>
                </aside>

                <nav className={Class.eachRow}>决定书信息</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdName}>决定书编号</td>
                        <td>{decInfo.decNumber}</td>
                        <td className={Class.tdName}>经办人</td>
                        <td>{decInfo.agent}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>交款标记</td>
                        <td>{decInfo.penaltyMark}</td>
                        <td className={Class.tdName}>交款日期</td>
                        <td>{decInfo.penaltyTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </aside>

                <nav className={Class.eachRow}>解档对账状态</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdName}>决定书编号</td>
                        <td>{releaseRecStatus.decNumber}</td>
                        <td className={Class.tdName}>录入人</td>
                        <td>{releaseRecStatus.enter}</td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>匹配标志</td>
                        <td>{releaseRecStatus.matchMarks}</td>
                        <td className={Class.tdName}>交款日期</td>
                        <td>{releaseRecStatus.penaltyTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </aside>
                {penaltyStatus===true?<Button icon='sync' className={Class.solution} type="Default" loading={this.state.searchLoading} onClick={this.solution}>解档</Button>:null}
            </article>
           </div>
        </article>
      )
    }
};





