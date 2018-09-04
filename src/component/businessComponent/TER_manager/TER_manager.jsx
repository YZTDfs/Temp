import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './TER_manager.less';
import {Table,Select,Input,Button,Icon,DatePicker,notification,Drawer,Modal} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import './TER_managerImt.css';
import {Map} from 'react-amap';


const Option=Select.Option;
const {RangePicker}=DatePicker;
/* Map */
/* const terMap=(
    <div style={{width: 800, height: 600}}>
    
    
    </div>
); */
/* end */


export default class TER_manager extends Component {
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
            wayList:[],
            drawer:{
              visible:false,
            },
            modal:{
              visible:false,
              title:''
            },
            mapDrawer:{
              visible:false,
            },
            submitData:{
               terminal_no:'',
               selfTerminal:'',
               status:'',
               area:'',
               way:'',
               keyboard:'',
               netWorkName:'',
               netWorkAddr:'',
               netWorkLoa:'',
               netWorkConcat:'',
               netWorkTel:'',
               workTime:''
            }
        };
        this.createSelectList=this.createSelectList.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
        this.add=this.add.bind(this);
        this.search=this.search.bind(this);
        this.drawerClose=this.drawerClose.bind(this);
        this.terSubmit=this.terSubmit.bind(this);
        this.terCancel=this.terCancel.bind(this);
        this.showMap=this.showMap.bind(this);
        this.mapEvents={
          click: (e) => {
            const {terminal_no,selfTerminal,status,area,way,keyboard,netWorkName,netWorkAddr,netWorkConcat,netWorkTel,workTime}=this.state.submitData;
            this.setState({
              submitData:{
                terminal_no:terminal_no,
                selfTerminal:selfTerminal,
                status:status,
                area:area,
                way:way,
                keyboard:keyboard,
                netWorkName:netWorkName,
                netWorkAddr:netWorkAddr,
                netWorkLoa:`${e.lnglat.lat},${e.lnglat.lng}`,
                netWorkConcat:netWorkConcat,
                netWorkTel:netWorkTel,
                workTime:workTime
             },
             mapDrawer:{
              visible:false,
            },
            });
          },
        }
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
            <Option key={x[obj_keys[0]]} value={x[obj_keys[1]]}>{x[obj_keys[1]]}</Option>
          );
        });
      };
      return item;
    };

    async getAreaList(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'TER_manager/area',
          method:'post',
          data:{}
        });
        if (res.data.code==='0000') {
          this.setState({
            areaList:res.data.dataSource
          });
        }else if(res.data.code==='0500'){
           notification['warning']({
              message:'操作失败',
              description:'您没有此项操作的权限!'
           });
        }else if(res.data.code==='0300'){
           notification['warning']({
              message:'接口异常',
              description:'啊哦，接口出现问题'
           });
        };
      } catch (error) {
         notification['error']({
            message:'接口异常',
            description:'网路异常!'
         });
      }
    };

    async getWayList(){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'TER_manager/way',
          method:'post',
          data:{}
        });
        if (res.data.code==='0000') {
          this.setState({
            wayList:res.data.dataSource
          });
        }else if(res.data.code==='0500'){
           notification['warning']({
              message:'操作失败',
              description:'您没有此项操作的权限!'
           });
        }else if(res.data.code==='0300'){
           notification['warning']({
              message:'接口异常',
              description:'啊哦，接口出现问题'
           });
        };
      } catch (error) {
         notification['error']({
            message:'接口异常',
            description:'网路异常!'
         });
      }
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
            title: '自助设备序列号',
            dataIndex: 'selfTerminal',
            key: 'selfTerminal',
            width:'11%'
          }, 
          {
            title: '终端地区',
            dataIndex: 'area',
            key: 'area',
            width:'23%'
          }, 
          {
            title: '终端渠道',
            dataIndex: 'way',
            key: 'way',
            width:'10%'
          },
          {
            title:'网点地址',
            dataIndex:'branch',
            key:'branch',
            width:'10%'
          },
          {
            title:'终端状态',
            dataIndex:'status',
            key:'status',
            width:'11%'
          },
          {
            title:'修改时间',
            dataIndex:'editTime',
            key:'editTime',
            width:'12%'
          },
          {
          title: '操作',
          key: 'operation',
          width:'12%',
          render: (text, record) => (
          <span className={Class.opt_span}>
            <Button className={Class.search_btn} type="primary" onClick={this.view.bind(this,record)}>预览</Button>
            <Button className={Class.search_btn} type="default" onClick={this.edit.bind(this,record)}>编辑</Button>
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res;
      try {
        res=await Utils.axiosRequest({
           url:Utils.mutilDevURl+'TER_manager',
           method:'post',
           data:{
             page:page,
             pagesize:num
           }
        });
        let {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
               queryInfo : {
          　     pageSize: num
      　　　　  },                     
      　　     dataSource:{
      　　　     count: dataSource.count,
      　　　     data: dataSource.data
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
             notification['warining']({
                message:'接口异常!',
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

    async selectSearch(value){
      console.log(value);
    };

    async add(){
      this.setState({
        modal:{
          visible:true,
          title:'新增终端机'
        }
      });
    };

    async search(){
      this.setState({
        searchLoading:true
      });
      let self=this;
      setTimeout(function(){
        self.setState({
          searchLoading:false
        });
      },2000);
    };

    async view(record){
       console.log(record);
       this.setState({
         drawer:{
           visible:true
         }
       });
    };

    drawerClose(){
      this.setState({
         drawer:{
           visible:false
         }
      });
    };

    async edit(record){
      this.setState({
        modal:{
          visible:true,
          title:'编辑终端机'
        }
      }); 
    };
    
    async delete(){

    };

    async gotoThispage(current,pagesize){
      let res;
      try {
        res=await Utils.axiosRequest({
          url:Utils.mutilDevURl+'TER_manager',
          method:'post',
          data:{
            page:current,
            pagesize:pagesize
          }
        });
        let {code,dataSource}=res.data;
        switch (code) {
          case '0000':
            this.setState({
               queryInfo : {
          　     pageSize: pagesize
      　　　　  },                     
      　　     dataSource:{
      　　　     count: dataSource.count,
      　　　     data: dataSource.data
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
             notification['warining']({
                message:'接口异常!',
                description:'啊哦，接口出现问题'
             });
             break;
          default:
            break;
        };
      } catch (error) {
        notification['error']({
           message:'接口异常',
           description:'网络异常!'
        });
      }
    };

    /* bussiness */
    async terSubmit(){

    };

    async terCancel(){
      this.setState({
        modal:{
          visible:false
        }
      })
    };

    async showMap(){
       this.setState({
        mapDrawer:{
          visible:true,
        }
       });
    };
    /* end */


    componentDidMount(){
     this.setTableColumns();
     this.getAreaList();
     this.getWayList();
     this.toSelectchange(1,10);
    };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      const {wayList,areaList,drawer,modal,mapDrawer,submitData}=this.state;
      return(
        <article className={Class.main}>
        <Modal title={modal.title} visible={modal.visible} onOk={self.terSubmit} onCancel={self.terCancel} okText='提交' cancelText='取消' destroyOnClose={true} closable={false} maskClosable={false} className={Class.optModal} wrapClassName={Class.optModalTree}>
             <article className={Class.modalMain}>
               <div className={Class.eachCol}>
                 <label className={Class.generalLabel} htmlFor=''>终端号</label>
                 <Input className={Class.generalInput}/>
                 <label className={Class.generalLabel} htmlFor=''>自助设备编号</label>
                 <Input className={Class.generalInput}/>
                 <label className={Class.generalLabel} htmlFor=''>终端状态</label>
                 <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearch} defaultValue='启用'>
                   <Option key='enable'>启用</Option>
                   <Option key='disable'>禁用</Option>
                 </Select>
               </div>
               <div className={Class.eachCol}>
                 <label className={Class.generalLabel} htmlFor=''>终端地区</label>
                 <Select className={Class.generaSelect} onChange={self.selectSearch}>
                  {this.createSelectList(areaList)}
                 </Select>
                 <label className={Class.generalLabel} htmlFor=''>终端渠道</label>
                 <Select className={Class.generaSelect} onChange={self.selectSearch}>
                  {this.createSelectList(wayList)}
                 </Select>
                 <label className={Class.generalLabel} htmlFor=''>键盘编号</label>
                 <Input className={Class.generalInput}/>
                 </div>
               <div className={Class.eachCol}>
                 <label className={Class.generalLabel} htmlFor=''>网点名称</label>
                 <Input className={Class.generalInput}/>
                 <label className={Class.generalLabel} htmlFor=''>网点地址</label>
                 <Input className={Class.generalInput}/>
                 <label className={Class.generalLabel} htmlFor=''>网点经纬度</label>
                 <Input className={Class.generalInput} readOnly='readOnly' onClick={this.showMap} value={submitData.netWorkLoa} />
               </div>
               <div className={Class.eachCol}>
                 <label className={Class.generalLabel} htmlFor=''>网点联系人</label>
                 <Input className={Class.generalInput}/>
                 <label className={Class.generalLabel} htmlFor=''>网点联系电话</label>
                 <Input className={Class.generalInput}/>
                 <label className={Class.generalLabel} htmlFor=''>工作时间</label>
                 <RangePicker className={Class.generaSelect} />
               </div>
             </article>
        </Modal>
        <Drawer title='地图选点' placement='left' closable={false} visible={mapDrawer.visible} className={`${Class.drMain} w75`} width={`100%`} >
           <Map amapkey={Utils.amapKey} zoom={20} events={this.mapEvents} viewMode={'3D'} pitch={35} />
        </Drawer>
        <Drawer title="终端机信息" placement="right" closable={true} onClose={this.drawerClose} visible={drawer.visible} width={`100%`} className={`${Class.drMain} w75`}>
            <article className={Class.mainDetails}>
                <nav className={Class.eachRow}>终端基本信息</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdName}>终端号</td>
                        <td></td>
                        <td className={Class.tdName}>自助设备编号</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>终端状态</td>
                        <td></td>
                        <td className={Class.tdName}>银联密钥</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>终端地区</td>
                        <td></td>
                        <td className={Class.tdName}>终端渠道</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>运维区域</td>
                        <td></td>
                        <td className={Class.tdName}>运维组长</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>组长电话</td>
                        <td></td>
                        <td className={Class.tdName}>网点名称</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>网点地址</td>
                        <td></td>
                        <td className={Class.tdName}>网点经纬度</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>网点联系人</td>
                        <td></td>
                        <td className={Class.tdName}>网点联系电话</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Class.tdName}>工作时间</td>
                        <td colSpan='3'></td>
                      </tr>
                    </tbody>
                  </table>
                </aside>

                <nav className={Class.eachRow}>业务开通</nav>
                <aside className={Class.detailsTable}>
                  <table>
                    <tbody className={Class.detailsTr}>
                      <tr>
                        <td className={Class.tdName}>开停业务</td>
                        <td></td>
                        <td className={Class.tdName}>开停范围</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </aside>
            </article>
          </Drawer>
           <nav>
             <div className={Class.eachCol}>
               <label className={Class.generalLabel} htmlFor={Class.opt_staff}>终端号</label>
               <Input className={Class.generalInput} />
               <label className={Class.generalLabel} htmlFor=''>终端地区</label>
               <Select className={Class.generaSelect} style={{  width: `10%` }} onChange={self.selectSearch}>
                 {this.createSelectList(areaList)}
               </Select>
               <label className={Class.generalLabel} htmlFor=''>终端渠道</label>
               <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearch}>
                 {this.createSelectList(wayList)}
               </Select>
               <Button icon='search' className={Class.search_btn} type="Default" loading={this.state.searchLoading} onClick={this.search}>查询</Button>
             </div>

             <div className={`${Class.eachCol} ${Class.marginT1}`}>
               <label className={Class.generalLabel} htmlFor="">终端状态</label>
               <Select className={Class.generaSelect} style={{ width: `10%` }} onChange={self.selectSearch}
               defaultValue='全部'>
                <option key='all' value='all'>全部</option>
                <option key='init' value='init'>初始化</option>
                <option key='optSuc' value='optSuc'>操作成功</option>
                <option key='optFailed' value='optFailed'>操作失败</option>
                <option key='waitRush' value='waitRush'>等待冲正</option>
                <option key='rushSuc' value='rushSuc'>冲正成功</option>
                <option key='rushFailed' value='rushFailed'>冲正失败</option>
                <option key='waitRefund' value='waitRefund'>等待退款</option>
                <option key='refundSuc' value='refundSuc'>退款成功</option>
                <option key='unSure' value='unSure'>未确认</option>
               </Select>
               <label className={Class.generalLabel} htmlFor="">修改时间</label>
              <RangePicker className={Class.generaSelect} onChange={self.onChange} />
             </div>

             <div className={`${Class.eachCol} ${Class.marginT2}`}>
               <Button icon='plus' className={Class.add_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>新增</Button>
               <Button icon='plus' className={Class.export_btn} type="primary" loading={this.state.addLoading} onClick={this.add}>导入键盘数据</Button>
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






