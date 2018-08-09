import React, { Component } from 'react';
import * as Utils from '../../../utils/fetch';
import * as Class from './BUS_open.less';
import {Table} from 'antd';
import '../../comDefaultLess/importantCSS.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

//const { Column, ColumnGroup } = Table;
export default class BUS_open extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
            queryInfo : {
            　pageSize: 10
            },     
            dataSource:{
            　count: 0,
            　data: []
        　　},
        };
        this.select=this.select.bind(this);
        this.toSelectchange=this.toSelectchange.bind(this);
    };

    select(){

    };

    setTableColumns() { 
      this.tableColumns = [{
          title: '序号', 
          dataIndex: 'id', 
          key: 'id'
          }, {
          title: '城市',
          dataIndex: 'city',
          key: 'city'
          }, {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
          }, {
          title: '时间',
          dataIndex: 'date',
          key: 'date',
          }, {
          title: '操作',
          key: 'operation',
          render: (text, record) => (
          <span>
            <a className="edit-data">查看</a>
            <a className="delete-data">修改</a>
          </span>
          ),
      }];
    };
    
    async toSelectchange(page,num) {
      let res=await Utils.axiosRequest({
        url:'http://localhost:9777/oss/getTableData',
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

    async gotoThispage(current,pagesize){
      let res=await Utils.axiosRequest({
        url:'http://localhost:9777/oss/getTableData',
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
    };

  componentWillMount(){
    this.setTableColumns();
    this.toSelectchange(1,10);
  };


  render(){
      let count=this.state.dataSource.count;
      let pageSize=this.state.queryInfo.pageSize;
      let dataSource=this.state.dataSource.data;
      let self=this;
      return(
        <article className={Class.main}>
           <nav>
              111
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
                     }
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




