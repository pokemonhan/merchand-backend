[1mdiff --cc src/components/views/report/ActiveReport.vue[m
[1mindex 92091b3,c11ca87..0000000[m
[1m--- a/src/components/views/report/ActiveReport.vue[m
[1m+++ b/src/components/views/report/ActiveReport.vue[m
[36m@@@ -1,12 -1,10 +1,19 @@@[m
  <template>[m
      <div class="container">[m
[32m++<<<<<<< HEAD[m
[32m +        <!-- 活动报表 -->[m
[32m +        [m
[32m++=======[m
[32m++>>>>>>> test[m
          <div class="filter p10">[m
              <ul class="left">[m
                  <li>[m
                      <span>活动名称</span>[m
[32m++<<<<<<< HEAD[m
[32m +                    <Input v-model="filter.acount" />[m
[32m++=======[m
[32m+                     <Input class="w100" v-model="filter.acount" />[m
[32m++>>>>>>> test[m
                  </li>[m
                  <li>[m
                      <span>日期范围</span>[m
[1mdiff --cc src/components/views/report/GameReoprtDetail.vue[m
[1mindex 925a43a,7860a26..0000000[m
[1m--- a/src/components/views/report/GameReoprtDetail.vue[m
[1m+++ b/src/components/views/report/GameReoprtDetail.vue[m
[36m@@@ -20,7 -20,7 +20,11 @@@[m
          </div>[m
          <div class="table">[m
              <Table :headers="headers" :column="list">[m
[32m++<<<<<<< HEAD[m
[32m +                <template v-slot:item="{row}">[m
[32m++=======[m
[32m+                 <template v-slot:item="{row}"> [m
[32m++>>>>>>> test[m
                      <td>{{row.a1}}</td>[m
                      <td>{{row.a2}}</td>[m
                      <td>{{row.a3}}</td>[m
[1mdiff --cc src/components/views/report/GameReport.vue[m
[1mindex c34f9c2,87b9f4e..0000000[m
[1m--- a/src/components/views/report/GameReport.vue[m
[1m+++ b/src/components/views/report/GameReport.vue[m
[36m@@@ -1,12 -1,10 +1,19 @@@[m
  <template>[m
      <div class="container">[m
[32m++<<<<<<< HEAD[m
[32m +        <!-- 游戏报表 -->[m
[32m +[m
[32m++=======[m
[32m++>>>>>>> test[m
          <div class="filter p10">[m
              <ul class="left">[m
                  <li>[m
                      <span>平台名称</span>[m
[32m++<<<<<<< HEAD[m
[32m +                    <Input v-model="filter.account" />[m
[32m++=======[m
[32m+                     <Input class="w100" v-model="filter.account" />[m
[32m++>>>>>>> test[m
                  </li>[m
                 <li>[m
                     <span style="margin-left:10px ">起始时间</span>[m
[1mdiff --cc src/components/views/report/MemberAudit.vue[m
[1mindex d4463ad,436fa42..0000000[m
[1m--- a/src/components/views/report/MemberAudit.vue[m
[1m+++ b/src/components/views/report/MemberAudit.vue[m
[36m@@@ -5,11 -5,11 +5,19 @@@[m
        <ul class="left">[m
          <li>[m
            <span>会员账号</span>[m
[32m++<<<<<<< HEAD[m
[32m +          <Input v-model="filter.account" />[m
[32m +        </li>[m
[32m +        <li>[m
[32m +          <span>会员ID</span>[m
[32m +          <Input v-model="filter.userid" />[m
[32m++=======[m
[32m+           <Input class="w90" v-model="filter.account" />[m
[32m+         </li>[m
[32m+         <li>[m
[32m+           <span>会员ID</span>[m
[32m+           <Input class="w90" v-model="filter.userid" />[m
[32m++>>>>>>> test[m
          </li>[m
          <li>[m
            <span>生成日期</span>[m
[36m@@@ -19,7 -19,7 +27,11 @@@[m
          </li>[m
          <li>[m
            <span>状态</span>[m
[32m++<<<<<<< HEAD[m
[32m +          <Select v-model="filter.user_state" :options="filter.user_state_opt"></Select>[m
[32m++=======[m
[32m+           <Select v-model="filter.user_state" :options="filter.user_state_opt" style="width:100px;"></Select>[m
[32m++>>>>>>> test[m
          </li>[m
          <li>[m
            <button class="btn-blue" @click="getList()">查询</button>[m
[1mdiff --cc src/components/views/report/PersonalReport.vue[m
[1mindex 0dc9789,a253a4e..0000000[m
[1m--- a/src/components/views/report/PersonalReport.vue[m
[1m+++ b/src/components/views/report/PersonalReport.vue[m
[36m@@@ -5,31 -5,27 +5,51 @@@[m
              <ul class="left">[m
                  <li>[m
                      <span>会员账号</span>[m
[32m++<<<<<<< HEAD[m
[32m +                    <Input v-model="filter.acount" />[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <span>会员ID</span>[m
[32m +                    <Input v-model="filter.user_id" />[m
[32m++=======[m
[32m+                     <Input class="w100" v-model="filter.acount" />[m
[32m+                 </li>[m
[32m+                 <li>[m
[32m+                     <span>会员ID</span>[m
[32m+                     <Input class="w100" v-model="filter.user_id" />[m
[32m++>>>>>>> test[m
                  </li>[m
                  <li>[m
                      <span>起止时间</span>[m
                      <Date v-model="filter.dates[0]" />[m
                      <span class="ph5">~</span>[m
[32m++<<<<<<< HEAD[m
[32m +                    <Date v-model="filter.dates[1]" />[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <button class="btn-blue">查询</button>[m
[32m +                    <button[m
[32m +                        class="btn-blue"[m
[32m +                        style="margin-left:10px;"[m
[32m +                        @click="exportExcel()"[m
[32m +                    >导出Excel</button>[m
[32m++=======[m
[32m+                     <Date v-model="filter.dates[1]"  />[m
[32m+                 </li>[m
[32m+                 <li>[m
[32m+                     <button class="btn-blue">查询</button>[m
[32m+                     <button class="btn-blue" style="margin-left:10px;" @click="exportExcel()">导出Excel</button>[m
[32m++>>>>>>> test[m
                  </li>[m
              </ul>[m
          </div>[m
          <div class="table">[m
              <Table :headers="headers" :column="list">[m
[32m++<<<<<<< HEAD[m
[32m +                <template v-slot:item="{row}">[m
[32m++=======[m
[32m+                 <template v-slot:item="{row}"> [m
[32m++>>>>>>> test[m
                      <td>{{row.a1}}</td>[m
                      <td>{{row.a2}}</td>[m
                      <td>{{row.a3}}</td>[m
[36m@@@ -59,29 -55,30 +79,56 @@@[m
  [m
  <script>[m
  export default {[m
[32m++<<<<<<< HEAD[m
[32m +    data() {[m
[32m +        return {[m
[32m +            filter: {[m
[32m +                account: '',[m
[32m +                user_id: '',[m
[32m +                dates: [][m
[32m +            },[m
[32m +            headers: [[m
[32m +                '日期',[m
[32m +                '会员账号',[m
[32m +                '会员ID',[m
[32m +                '入款金额/笔数',[m
[32m +                '出款金额/笔数',[m
[32m +                '总投注/笔数',[m
[32m +                '优惠金额',[m
[32m +                '有效投注额',[m
[32m +                '佣金/返利',[m
[32m +                '活动金额',[m
[32m +                '游戏盈亏',[m
[32m +                '实际盈亏'[m
[32m +            ],[m
[32m +            list: [[m
[32m +                {[m
[32m++=======[m
[32m+   [m
[32m+     data() {[m
[32m+         return {[m
[32m+             filter:{[m
[32m+                 account:'',[m
[32m+                 user_id:'',[m
[32m+                 dates:[],[m
[32m+             },[m
[32m+             headers:[[m
[32m+               '日期',[m
[32m+               '会员账号', [m
[32m+               '会员ID', [m
[32m+               '入款金额/笔数', [m
[32m+               '出款金额/笔数', [m
[32m+               '总投注/笔数', [m
[32m+               '优惠金额', [m
[32m+               '有效投注额', [m
[32m+               '佣金/返利', [m
[32m+               '活动金额', [m
[32m+               '游戏盈亏', [m
[32m+               '实际盈亏'  [m
[32m+             ],[m
[32m+             list:[[m
[32m+               {[m
[32m++>>>>>>> test[m
                      a1: '2019/10/30',[m
                      a2: '13245678942',[m
                      a3: '4563287',[m
[36m@@@ -94,7 -91,7 +141,11 @@@[m
                      a10: '500',[m
                      a11: '5000',[m
                      a12: '555'[m
[32m++<<<<<<< HEAD[m
[32m +                },[m
[32m++=======[m
[32m+                 },  [m
[32m++>>>>>>> test[m
                  {[m
                      a1: '2019/10/30',[m
                      a2: '13245678942',[m
[36m@@@ -108,47 -105,37 +159,81 @@@[m
                      a10: '500',[m
                      a11: '5000',[m
                      a12: '555'[m
[32m++<<<<<<< HEAD[m
[32m +                }[m
[32m +            ],[m
[32m +            total: 60,[m
[32m +            pageNo: 1,[m
[32m +            pageSize: 25[m
[32m +        }[m
[32m +    },[m
[32m +    methods: {[m
[32m +        updateNo(val) {},[m
[32m +        updateSize(val) {},[m
[32m +        exportExcel() {[m
[32m +            import('../../../js/config/Export2Excel').then(excel => {[m
[32m +                const tHeader = this.headers[m
[32m +                const data = this.list.map(item => {[m
[32m +                    return [[m
[32m +                        item.a1,[m
[32m +                        item.a2,[m
[32m +                        item.a3,[m
[32m +                        item.a4,[m
[32m +                        item.a5,[m
[32m +                        item.a6,[m
[32m +                        item.a7,[m
[32m +                        item.a8,[m
[32m +                        item.a9,[m
[32m +                        item.a10,[m
[32m +                        item.a11,[m
[32m +                        item.a12[m
[32m +                    ][m
[32m +                })[m
[32m +                excel.export_json_to_excel({[m
[32m +                    header: tHeader,[m
[32m +                    data,[m
[32m +                    filename: excel,[m
[32m +                    autoWidth: true,[m
[32m +                    bookType: 'xlsx'[m
[32m +                })[m
[32m +            })[m
[32m +        }[m
[32m +    },[m
[32m +    mounted() {}[m
[32m +}[m
[32m++=======[m
[32m+                 } ,[m
[32m+             ],[m
[32m+             total:60,[m
[32m+             pageNo:1,[m
[32m+             pageSize:25,[m
[32m+         };[m
[32m+     },[m
[32m+     methods: {[m
[32m+         updateNo(val){},[m
[32m+         updateSize(val){},[m
[32m+         exportExcel(){[m
[32m+             import('../../../js/config/Export2Excel').then(excel=>{[m
[32m+                 const tHeader=this.headers[m
[32m+                 const data=this.list.map(item=>{[m
[32m+                     return[item.a1,item.a2,item.a3,item.a4,item.a5,item.a6,item.a7,item.a8,item.a9,item.a10,item.a11,item.a12,][m
[32m+                 })[m
[32m+                 excel.export_json_to_excel({[m
[32m+                     header:tHeader,[m
[32m+                     data,[m
[32m+                     filename:excel,[m
[32m+                     autoWidth:true,[m
[32m+                     bookType:'xlsx'[m
[32m+                 })[m
[32m+             })[m
[32m+         }[m
[32m+ [m
[32m+     },[m
[32m+     mounted() {[m
[32m+        [m
[32m+     },[m
[32m+ };[m
[32m++>>>>>>> test[m
  </script>[m
  [m
  <style scoped>[m
[36m@@@ -156,10 -143,10 +241,17 @@@[m
      padding-left: 5px;[m
      padding-right: 5px;[m
  }[m
[32m++<<<<<<< HEAD[m
[32m +.p10 {[m
[32m +    padding: 10px;[m
[32m +}[m
[32m +.table {[m
[32m++=======[m
[32m+ .p10{[m
[32m+     padding: 10px;[m
[32m+ }[m
[32m+ .table{[m
[32m++>>>>>>> test[m
      margin-top: 20px;[m
  }[m
  </style>[m
[1mdiff --cc src/components/views/report/PlatformBet.vue[m
[1mindex e0319a1,6f17fcd..0000000[m
[1m--- a/src/components/views/report/PlatformBet.vue[m
[1m+++ b/src/components/views/report/PlatformBet.vue[m
[36m@@@ -6,11 -6,11 +6,19 @@@[m
                  <ul class="left">[m
                      <li>[m
                          <span>会员账号</span>[m
[32m++<<<<<<< HEAD[m
[32m +                        <Input v-model="filter.account" />[m
[32m +                    </li>[m
[32m +                    <li>[m
[32m +                        <span>会员ID</span>[m
[32m +                        <Input v-model="filter.userid" />[m
[32m++=======[m
[32m+                         <Input class="w100" v-model="filter.account" />[m
[32m+                     </li>[m
[32m+                     <li>[m
[32m+                         <span>会员ID</span>[m
[32m+                         <Input class="w100" v-model="filter.userid" />[m
[32m++>>>>>>> test[m
                      </li>[m
                      <li>[m
                          <span>派彩时间</span>[m
[36m@@@ -20,7 -20,7 +28,11 @@@[m
                      </li>[m
                      <li>[m
                          <span>派彩状态</span>[m
[32m++<<<<<<< HEAD[m
[32m +                        <Select v-model="filter.payOut_status" :options="filter.user_payOut_status" ></Select>[m
[32m++=======[m
[32m+                         <Select v-model="filter.payOut_status" :options="filter.user_payOut_status" style="width:100px;" ></Select>[m
[32m++>>>>>>> test[m
                      </li>[m
                  </ul>[m
              </div>[m
[36m@@@ -28,11 -28,11 +40,19 @@@[m
                  <ul class="left">[m
                      <li>[m
                          <span>游戏平台</span>[m
[32m++<<<<<<< HEAD[m
[32m +                        <Input  v-model="filter.gaming" />[m
[32m +                    </li>[m
[32m +                    <li>[m
[32m +                        <span>注单号</span>[m
[32m +                        <Input  v-model="filter.order_num" />[m
[32m++=======[m
[32m+                         <Input class="w100" v-model="filter.gaming" />[m
[32m+                     </li>[m
[32m+                     <li>[m
[32m+                         <span>注单号</span>[m
[32m+                         <Input class="w100" v-model="filter.order_num" />[m
[32m++>>>>>>> test[m
                      </li>[m
                      <li>[m
                          <span>注单时间</span>[m
[1mdiff --cc src/components/views/report/UserWashDetail.vue[m
[1mindex aa3efe9,b4e1233..0000000[m
[1m--- a/src/components/views/report/UserWashDetail.vue[m
[1m+++ b/src/components/views/report/UserWashDetail.vue[m
[36m@@@ -40,47 -33,57 +40,57 @@@[m
  [m
  <script>[m
  export default {[m
[31m -    data(){[m
[31m -        return{[m
[31m -            filter:{[m
[31m -                dates:[],[m
[32m +    data() {[m
[32m +        return {[m
[32m +            filter: {[m
[32m +                dates: [][m
              },[m
[31m -            headers:[[m
[31m -                '游戏名称',[m
[31m -                '下注额度',[m
[31m -                '有效投注',[m
[31m -                '洗码金额',[m
[31m -                '日期',[m
[31m -            ],[m
[31m -            list:[[m
[32m +            headers: ['游戏名称', '下注额度', '有效投注', '洗码金额', '日期'],[m
[32m +            list: [[m
                  {[m
                      a1: 'a'[m
[31m -                },[m
[32m +                }[m
              ],[m
[31m -            total:50,[m
[31m -            pageNo:1,[m
[31m -            pageSize:25,[m
[32m +            total: 50,[m
[32m +            pageNo: 1,[m
[32m +            pageSize: 25[m
          }[m
      },[m
[31m -    methods:{[m
[31m -        updateNo(val){},[m
[31m -        updateSize(val){},[m
[31m -        exportExcel(){[m
[31m -            import('../../../js/config/Export2Excel').then(excel=>{[m
[31m -                const tHeader=this.headers[m
[31m -                const data=this.list.map(item=>{[m
[31m -                    return[item.a1,item.a2,item.a3,item.a4,item.a5][m
[32m +    methods: {[m
[32m +        updateNo(val) {},[m
[32m +        updateSize(val) {},[m
[32m +        exportExcel() {[m
[32m +            import('../../../js/config/Export2Excel').then(excel => {[m
[32m +                const tHeader = this.headers[m
[32m +                const data = this.list.map(item => {[m
[32m +                    return [item.a1, item.a2, item.a3, item.a4, item.a5][m
                  })[m
                  excel.export_json_to_excel({[m
[31m -                    header:tHeader,[m
[32m +                    header: tHeader,[m
                      data,[m
[31m -                    filename:'',[m
[31m -                    autoWidth:true,[m
[31m -                    bookType:'xlsx'[m
[32m +                    filename: '',[m
[32m +                    autoWidth: true,[m
[32m +                    bookType: 'xlsx'[m
                  })[m
              })[m
[31m -        },[m
[32m +        }[m
      },[m
[31m -    mounted(){[m
[31m -[m
[31m -    }[m
[32m +    mounted() {}[m
  }[m
  </script>[m
[32m +[m
  <style scoped>[m
[32m++<<<<<<< HEAD[m
[32m +.table {[m
[32m +    margin-top: 20px;[m
[32m +}[m
[32m +</style>[m
[32m++=======[m
[32m+     [m
[32m+     [m
[32m+     [m
[32m+     .table{[m
[32m+         margin-top: 20px;[m
[32m+     }[m
[31m -</style>[m
[32m++</style>[m
[32m++>>>>>>> test[m
[1mdiff --cc src/components/views/set/AdminSort.vue[m
[1mindex cc974a3,e69de29..0000000[m
[1m--- a/src/components/views/set/AdminSort.vue[m
[1m+++ b/src/components/views/set/AdminSort.vue[m
[36m@@@ -1,566 -1,0 +1,569 @@@[m
[32m++<<<<<<< HEAD[m
[32m +<template>[m
[32m +    <div class="container">[m
[32m +        <div class="filter p10">[m
[32m +            <ul class="left">[m
[32m +              [m
[32m +                <li>[m
[32m +                    <!-- <button class="btn-blue">查找</button> -->[m
[32m +                    <button class="btn-blue" @click="addsort">创建分组</button>[m
[32m +                </li>[m
[32m +            </ul>[m
[32m +        </div>[m
[32m +        <div class="cont">[m
[32m +            <div class="cont-left">[m
[32m +                <ul>[m
[32m +                    <li v-for="(group,index) in group_list" :key="index">[m
[32m +                        <div class="li-left">[m
[32m +                            <p class="li-hd">[m
[32m +                                <span @click="check(group)">{{group.group_name}}</span>[m
[32m +                            </p>[m
[32m +                            <span>{{group.id!==1?group.created_at:''}}</span>[m
[32m +                        </div>[m
[32m +[m
[32m +                        <div class="li-right">[m
[32m +                            <span v-if="group.id!==1" class="a" @click="del(group)">删除</span>[m
[32m +                            <span v-if="group.id!==1" class="a" @click="edit(group)">编辑</span>[m
[32m +                        </div>[m
[32m +                    </li>[m
[32m +                </ul>[m
[32m +                <div class="vertical-line"></div>[m
[32m +            </div>[m
[32m +            <!-- 右边的 页面 -->[m
[32m +            <div class="cont-right">[m
[32m +                <div class="edit-form">[m
[32m +                    <div>[m
[32m +                        <span[m
[32m +                            class="cont-r-hd"[m
[32m +                        >{{right_show==='add'?'创建组':right_show==='check'?'查看组':right_show==='edit'?'编辑组':right_show}}</span>[m
[32m +                    </div>[m
[32m +                    <div class="edit-name">[m
[32m +                        <p class="mb10">组名称:</p>[m
[32m +                        <Input style="width:300px;" v-model="form.group_name" />[m
[32m +                        <span v-show="!form.group_name" class="err-tips">组名称不可为空</span>[m
[32m +                    </div>[m
[32m +                    <div class="edit-authority">[m
[32m +                        <p class="mb10">选择组权限:</p>[m
[32m +                        <div class="show-selected" @click="openTree">[m
[32m +                            <span[m
[32m +                                class="sel-item"[m
[32m +                                v-for="(item, index) in authority_list"[m
[32m +                                :key="index"[m
[32m +                                @click.stop[m
[32m +                            >[m
[32m +                                <span>{{item.label}}</span>[m
[32m +                                <i class="iconfont iconcuowuguanbi-" @click.stop="tabClose(item)"></i>[m
[32m +                            </span>[m
[32m +                        </div>[m
[32m +                        <!-- v-clickoutside="closeTree" -->[m
[32m +                        <div[m
[32m +                            v-show="tree_show"[m
[32m +                            ref="tree"[m
[32m +                            class="drop-list"[m
[32m +                            v-clickoutside="closeTree"[m
[32m +                        >[m
[32m +                            <Tree style="width:fit-content" :list.sync="tree_list" @change="treeUpd" />[m
[32m +                        </div>[m
[32m +                    </div>[m
[32m +[m
[32m +                    <div v-if="!(curr_group.id===1 &&right_show!=='add')" class="mt50 t-center">[m
[32m +                        <button class="btn-plain-large" @click="cancel">取消</button>[m
[32m +[m
[32m +                        <button[m
[32m +                            v-if="right_show==='add'"[m
[32m +                            class="btn-blue-large ml30"[m
[32m +                            @click="groupAddCfm"[m
[32m +                        >确定创建</button>[m
[32m +[m
[32m +                        <button[m
[32m +                            v-if="right_show==='edit'"[m
[32m +                            class="btn-blue-large ml30"[m
[32m +                            @click="groupSetCfm"[m
[32m +                        >确定修改</button>[m
[32m +[m
[32m +                        <button[m
[32m +                            v-if="right_show==='check'"[m
[32m +                            class="btn-blue-large ml30"[m
[32m +                            @click="groupSetCfm"[m
[32m +                        >确定</button>[m
[32m +                    </div>[m
[32m +                </div>[m
[32m +                <!-- 查看check之下面内容 -->[m
[32m +                <div v-if="right_show==='check'" class="mt20">[m
[32m +                    <!-- table 内容 -->[m
[32m +                    <div class="table">[m
[32m +                        <AdminTable :group_id="admin_id" />[m
[32m +                    </div>[m
[32m +                </div>[m
[32m +            </div>[m
[32m +        </div>[m
[32m +[m
[32m +        <Modal :show.sync="mod_show" :title="mod_title" :content="mod_cont" @confirm="modConf"></Modal>[m
[32m +    </div>[m
[32m +</template> <script>[m
[32m +import Tree from '../../commonComponents/Tree'[m
[32m +import AdminTable from './AdminSortDir/AdminTable'[m
[32m +export default {[m
[32m +    components: {[m
[32m +        Tree: Tree,[m
[32m +        AdminTable: AdminTable[m
[32m +    },[m
[32m +    data() {[m
[32m +        return {[m
[32m +            right_show: 'add', // 默认右侧为添加组[m
[32m +            // filter: {[m
[32m +            //     group: ''[m
[32m +            // },[m
[32m +            group_list: [], // 展示列表[m
[32m +            form: {[m
[32m +                group_name: ''[m
[32m +            },[m
[32m +            tree_list: [],[m
[32m +            authority_list: [],[m
[32m +            tree_show: false,[m
[32m +[m
[32m +            // table[m
[32m +            admin_id: '',[m
[32m +[m
[32m +            // 启用 禁用modal[m
[32m +            mod_show: false,[m
[32m +            curr_group: {},[m
[32m +            mod_status: '',[m
[32m +            mod_title: '',[m
[32m +            mod_cont: ''[m
[32m +        }[m
[32m +    },[m
[32m +    computed: {},[m
[32m +    methods: {[m
[32m +        // 初始化tree 使其无选中项[m
[32m +        initTree(tree) {[m
[32m +            let arr = tree.map(item => {[m
[32m +                item.checked = false[m
[32m +                if (item.child) {[m
[32m +                    item.child = this.initTree(item.child)[m
[32m +                }[m
[32m +                return item[m
[32m +            })[m
[32m +            return arr[m
[32m +        },[m
[32m +[m
[32m +        // 初始化mod 内容[m
[32m +        initMod() {[m
[32m +            this.mod_show = false[m
[32m +            this.curr_group = {}[m
[32m +            this.mod_status = ''[m
[32m +            this.mod_title = ''[m
[32m +            this.mod_cont = ''[m
[32m +        },[m
[32m +[m
[32m +        // 根据group 展示勾选 tree中此项[m
[32m +        treeSelectShow(group) {[m
[32m +            // 当前权限数组[m
[32m +            let authority_arr = group.detail.map(item => item.menu_id)[m
[32m +            console.log('authority_arr: ', authority_arr);[m
[32m +[m
[32m +            // id 是否在选择项数组中[m
[32m +            let isSelect = function(id) {[m
[32m +                return authority_arr.indexOf(id) !== -1[m
[32m +                return false[m
[32m +            }[m
[32m +[m
[32m +            let listSetCheked = function(arr) {[m
[32m +                let list = arr.map(item => {[m
[32m +                    item.checked = isSelect(item.id)[m
[32m +                    item.child && listSetCheked(item.child)[m
[32m +                    return item[m
[32m +                })[m
[32m +                return list[m
[32m +            }[m
[32m +[m
[32m +            this.tree_list = listSetCheked(this.tree_list)[m
[32m +            this.getAuthorityList()[m
[32m +            this.isChildSelAll()[m
[32m +        },[m
[32m +[m
[32m +        // 创建按钮[m
[32m +        addsort() {[m
[32m +            this.right_show = 'add'[m
[32m +            this.form.group_name = ''[m
[32m +            this.initTree(this.tree_list)[m
[32m +            this.getAuthorityList()[m
[32m +        },[m
[32m +[m
[32m +        // 查看其中一组[m
[32m +        check(group) {[m
[32m +            this.right_show = 'check'[m
[32m +            this.curr_group = Object.assign({}, group)[m
[32m +[m
[32m +            this.form.group_name = group.group_name[m
[32m +            this.admin_id = group.id[m
[32m +            this.treeSelectShow(group)[m
[32m +        },[m
[32m +[m
[32m +        // 删除分组列表 按钮[m
[32m +        del(group) {[m
[32m +            this.mod_show = true[m
[32m +            this.curr_group = group // 存储当前点击的组[m
[32m +            this.mod_status = 'del'[m
[32m +            this.mod_title = '删除'[m
[32m +            this.mod_cont = '是否确认删除该分组！'[m
[32m +        },[m
[32m +        edit(group) {[m
[32m +            this.right_show = 'edit'[m
[32m +            this.curr_group = group // 存储当前点击的组[m
[32m +            this.form.group_name = group.group_name[m
[32m +            this.treeSelectShow(group)[m
[32m +        },[m
[32m +[m
[32m +        // 后台res 转化为 tree 数组[m
[32m +        resToTree(list) {[m
[32m +            let arr = [][m
[32m +            arr = Object.keys(list).map(key => {[m
[32m +                let item = {}[m
[32m +[m
[32m +                item.label = list[key].label[m
[32m +                item.id = list[key].id[m
[32m +                item.checked = false[m
[32m +                if (list[key].child) {[m
[32m +                    item.child = this.resToTree(list[key].child)[m
[32m +                }[m
[32m +                return item[m
[32m +            })[m
[32m +            return arr[m
[32m +        },[m
[32m +[m
[32m +        // 获取后台所有权限树[m
[32m +        getTreeList() {[m
[32m +            // this.tree_list = JSON.parse(JSON.stringify(window.all.menu_list))[m
[32m +            // console.log('想要的tree_list: ', this.tree_list);[m
[32m +            // this.tree_list.forEach((item, index) => {[m
[32m +            //     item.id = index[m
[32m +            // })[m
[32m +            let self = this[m
[32m +            let { url, method } = this.$api.menu_all_list[m
[32m +            this.$http({[m
[32m +                method: method,[m
[32m +                url: url[m
[32m +            }).then(res => {[m
[32m +                // console.log('所有权限树: ', res)[m
[32m +                if (res && res.code === '200') {[m
[32m +                    self.total = res.data.total[m
[32m +                    self.tree_list = this.resToTree(res.data)[m
[32m +                }[m
[32m +            })[m
[32m +        },[m
[32m +[m
[32m +        // 返回已选中权限数组 （有[x]的tab框子）[m
[32m +        getAuthorityList() {[m
[32m +            let tem_arr = [][m
[32m +[m
[32m +            let getCheckedArr = function(arr) {[m
[32m +                arr.forEach(item => {[m
[32m +                    if (!item.child) {[m
[32m +                        // 没有子项，且选中，放入 tem_arr中，方便展示[m
[32m +                        item.checked &&[m
[32m +                            tem_arr.push({ label: item.label, id: item.id })[m
[32m +                    } else {[m
[32m +                        item.child && getCheckedArr(item.child)[m
[32m +                    }[m
[32m +                })[m
[32m +            }[m
[32m +            getCheckedArr(this.tree_list)[m
[32m +[m
[32m +            this.authority_list = tem_arr[m
[32m +        },[m
[32m +[m
[32m +        // 关闭 tree 下拉内容[m
[32m +        closeTree() {[m
[32m +            if (!this.tree_show) return[m
[32m +            this.tree_show = false[m
[32m +[m
[32m +        },[m
[32m +[m
[32m +        // tree 点击更新时[m
[32m +        treeUpd(bool, index, list) {[m
[32m +            // console.log('index: ', index);[m
[32m +            // console.log('外部获取里面反馈: ', list);[m
[32m +            // 重新赋值让其能检测到[m
[32m +            this.tree_list = list.slice()[m
[32m +            // console.log('this.tree_list: ', this.tree_list);[m
[32m +            this.getAuthorityList()[m
[32m +        },[m
[32m +[m
[32m +[m
[32m +        // 子集全选,则父级选中 。[m
[32m +        isChildSelAll() {[m
[32m +            let isSelectAll = function(arr) {[m
[32m +                arr.forEach(item => {[m
[32m +                    if (item.child) {[m
[32m +                        item.checked = item.child.every(item => item.checked)[m
[32m +                        isSelectAll(item.child)[m
[32m +                    }[m
[32m +                })[m
[32m +            }[m
[32m +            isSelectAll(this.tree_list)[m
[32m +            this.tree_list = this.tree_list.slice()[m
[32m +        },[m
[32m +        // 点击组权限框, 下拉打开 tree[m
[32m +        openTree() {[m
[32m +            if (!this.tree_show) {[m
[32m +                setTimeout(() => {[m
[32m +                    this.tree_show = true[m
[32m +                    $(this.$refs.tree).slideDown(200)[m
[32m +                }, 0)[m
[32m +            }[m
[32m +        },[m
[32m +        // 关闭 tab 框(点击tab里那个[x]时触发..)[m
[32m +        tabClose(sel_item) {[m
[32m +[m
[32m +            this.tree_list = this.tree_list.map((item, index) => {[m
[32m +                if (item.child) {[m
[32m +                    item.child.forEach((child_item, child_index) => {[m
[32m +                        if (child_item.id === sel_item.id) {[m
[32m +                            child_item.checked = false[m
[32m +                        }[m
[32m +                    })[m
[32m +                }[m
[32m +                if (item.id === sel_item.id) {[m
[32m +                    item.checked = false[m
[32m +                }[m
[32m +                return item[m
[32m +            })[m
[32m +[m
[32m +            this.getAuthorityList()[m
[32m +            this.isChildSelAll()[m
[32m +        },[m
[32m +        cancel() {[m
[32m +            let group = Object.assign({}, this.curr_group)[m
[32m +            this.form.group_name = group.group_name[m
[32m +            this.admin_id = group.id[m
[32m +            this.treeSelectShow(group)[m
[32m +        },[m
[32m +        // 创建分组 ——确认[m
[32m +        groupAddCfm() {[m
[32m +            if (this.form.group_name === '') {[m
[32m +                return this.$toast.error('组名称不可以为空！')[m
[32m +            }[m
[32m +[m
[32m +            let role = this.authority_list.map(item => {[m
[32m +                return item.id[m
[32m +            })[m
[32m +            let data = {[m
[32m +                group_name: this.form.group_name,[m
[32m +                role: '[' + role.join(',') + ']'[m
[32m +            }[m
[32m +[m
[32m +            // let { url, method } = this.$api[m
[32m +            let self = this[m
[32m +            this.$http({ method, url, data }).then(res => {[m
[32m +                if (res && res.code === '200') {[m
[32m +                    this.$toast.success(res.message)[m
[32m +                    this.getGroupList() // 刷新分组列表[m
[32m +                } else {[m
[32m +                    // self.$toast.error(res.message)[m
[32m +                }[m
[32m +            })[m
[32m +        },[m
[32m +[m
[32m +        //  编辑 确认, 查看确认[m
[32m +        groupSetCfm() {[m
[32m +            if (this.form.group_name === '') {[m
[32m +                return this.$toast.error('组名称不可以为空！')[m
[32m +            }[m
[32m +[m
[32m +            let role = this.authority_list.map(item => {[m
[32m +                return item.id[m
[32m +            })[m
[32m +            let data = {[m
[32m +                id: this.curr_group.id,[m
[32m +                group_name: this.form.group_name,[m
[32m +                role: '[' + role.join(',') + ']'[m
[32m +            }[m
[32m +            // let { method, url } = this.$api[m
[32m +            this.$http({ method, url, data }).then(res => {[m
[32m +                console.log(res)[m
[32m +                if (res.code === '200') {[m
[32m +                    this.$toast.success(res.message)[m
[32m +                }[m
[32m +                this.getGroupList() // 刷新分组列表[m
[32m +            })[m
[32m +        },[m
[32m +[m
[32m +        // 确认禁用,确认启用, 确认删除[m
[32m +        modConf() {[m
[32m +            // console.log('mod_确认');[m
[32m +            let group = this.curr_group[m
[32m +            switch (this.mod_status) {[m
[32m +                case 'del':[m
[32m +                    this.delGroup(group)[m
[32m +                    break[m
[32m +[m
[32m +                // default:[m
[32m +                //     break;[m
[32m +            }[m
[32m +        },[m
[32m +[m
[32m +        // 删除群组[m
[32m +        delGroup(group) {[m
[32m +            console.log('group: ', group)[m
[32m +            let data = {[m
[32m +                id: group.id,[m
[32m +                group_name: group.group_name[m
[32m +            }[m
[32m +            // let { method, url } = this.$api[m
[32m +            this.$http({ method, url, data }).then(res => {[m
[32m +                if (res.code === '200') {[m
[32m +                    this.$toast.success(res.message)[m
[32m +                    this.initMod()[m
[32m +                    this.getGroupList()[m
[32m +                }[m
[32m +            })[m
[32m +        },[m
[32m +[m
[32m +        // 获取群组列表 (左侧的列表)[m
[32m +        getGroupList() {[m
[32m +            // let { url, method } = this.$api.[m
[32m +[m
[32m +            this.$http({ method, url }).then(res => {[m
[32m +                // console.log('res: ', res)[m
[32m +                if (res && res.code === '200') {[m
[32m +                    this.group_list = res.data[m
[32m +                }[m
[32m +            })[m
[32m +        }[m
[32m +    },[m
[32m +    mounted() {[m
[32m +        // this.getGroupList()[m
[32m +        // this.getTreeList()[m
[32m +    }[m
[32m +}[m
[32m +</script>[m
[32m +[m
[32m +<style scoped>[m
[32m +[m
[32m +.cont {[m
[32m +    display: flex;[m
[32m +    margin-top: 20px;[m
[32m +}[m
[32m +.cont-left {[m
[32m +    display: flex;[m
[32m +    /* todo */[m
[32m +    margin-left: 40px;[m
[32m +}[m
[32m +.cont .cont-left li {[m
[32m +    display: flex;[m
[32m +    justify-content: space-between;[m
[32m +    align-items: center;[m
[32m +    width: 300px;[m
[32m +    height: 50px;[m
[32m +    padding: 10px;[m
[32m +}[m
[32m +.cont-left li:nth-child(2n) {[m
[32m +    background: #e5f7ff;[m
[32m +}[m
[32m +.cont-left li:nth-child(2n-1) {[m
[32m +    background: #f9fbfc;[m
[32m +}[m
[32m +.cont .li-left .li-hd span {[m
[32m +    font-size: 16px;[m
[32m +    font-weight: bold;[m
[32m +    color: #4c8bfd;[m
[32m +    cursor: pointer;[m
[32m +}[m
[32m +.cont .li-left .li-hd span:active {[m
[32m +    color: red;[m
[32m +}[m
[32m +.vertical-line {[m
[32m +    width: 1px;[m
[32m +    height: 100%;[m
[32m +    margin-left: 50px;[m
[32m +    margin-right: 50px;[m
[32m +    background: #ededed;[m
[32m +}[m
[32m +.edit-form {[m
[32m +    width: 550px;[m
[32m +}[m
[32m +.err-tips {[m
[32m +    font-size: 12px;[m
[32m +    margin-left: 10px;[m
[32m +    color: red;[m
[32m +}[m
[32m +.cont-r-hd {[m
[32m +    font-size: 16px;[m
[32m +    font-weight: bold;[m
[32m +    color: #4c8bfd;[m
[32m +    border-bottom: 2px solid #4c8bfd;[m
[32m +}[m
[32m +.mt25 {[m
[32m +    margin-top: 25px;[m
[32m +}[m
[32m +.mb10 {[m
[32m +    margin-bottom: 10px;[m
[32m +}[m
[32m +.edit-name {[m
[32m +    /* width: 300px; */[m
[32m +    margin-top: 25px;[m
[32m +}[m
[32m +.edit-authority {[m
[32m +    margin-top: 20px;[m
[32m +}[m
[32m +/* 选择组权限 */[m
[32m +.show-selected {[m
[32m +    /* display: flex; */[m
[32m +    /* flex-wrap: wrap; */[m
[32m +    min-height: 165px;[m
[32m +    border: 1px solid #d9ecff;[m
[32m +    padding: 0 10px 10px 0;[m
[32m +    border-radius: 5px;[m
[32m +}[m
[32m +[m
[32m +.sel-item {[m
[32m +    display: inline-block;[m
[32m +    margin-left: 10px;[m
[32m +    margin-top: 10px;[m
[32m +    padding: 3px 10px;[m
[32m +[m
[32m +    font-size: 12px;[m
[32m +    color: #409eff;[m
[32m +    border: 1px solid #d9ecff;[m
[32m +    border-radius: 4px;[m
[32m +    background-color: #ecf5ff;[m
[32m +}[m
[32m +.iconcuowuguanbi- {[m
[32m +    width: 12px;[m
[32m +    vertical-align: middle;[m
[32m +    cursor: pointer;[m
[32m +    transform: scale(1);[m
[32m +}[m
[32m +.iconcuowuguanbi-:hover {[m
[32m +    color: red;[m
[32m +}[m
[32m +/* 选择组 下拉list */[m
[32m +.drop-list {[m
[32m +    margin-top: 10px;[m
[32m +    padding-top: 10px;[m
[32m +    padding-left: 50px;[m
[32m +    border: 1px solid #d9ecff;[m
[32m +    border-radius: 4px;[m
[32m +}[m
[32m +/* 编辑组 确定取消 */[m
[32m +.mt50 {[m
[32m +    margin-top: 30px;[m
[32m +}[m
[32m +.t-center {[m
[32m +    text-align: center;[m
[32m +}[m
[32m +.ml30 {[m
[32m +    margin-left: 30px;[m
[32m +}[m
[32m +[m
[32m +.mt20 {[m
[32m +    margin-top: 20px;[m
[32m +}[m
[32m +/* table 内容*/[m
[32m +.table {[m
[32m +    margin-top: 20px;[m
[32m +}[m
[31m- </style>[m
[32m++</style>[m
[32m++=======[m
[32m++>>>>>>> test[m
[1mdiff --cc src/components/views/set/AllAreaSet.vue[m
[1mindex 21bb175,413d6d4..0000000[m
[1m--- a/src/components/views/set/AllAreaSet.vue[m
[1m+++ b/src/components/views/set/AllAreaSet.vue[m
[36m@@@ -1,311 -1,27 +1,338 @@@[m
  <template>[m
      <div class="container">[m
[32m++<<<<<<< HEAD[m
[32m +        <!-- 全域设置 -->[m
[32m +        <div class="head-set">[m
[32m +            <div class="set-label">设置选项:</div>[m
[32m +            <button[m
[32m +                :class="['mt20',item.value===curr_set_btn?'btn-blue':'btn-plain']"[m
[32m +                v-for="(item, index) in set_btns"[m
[32m +                :key="index"[m
[32m +                @click="setChange(item)"[m
[32m +            >{{item.label}}</button>[m
[32m +        </div>[m
[32m +        <div>[m
[32m +            <div class="set-cont">设置内容:</div>[m
[32m +[m
[32m +            <!-- 注册登录设定 -->[m
[32m +            <ul v-if="curr_set_btn===1" class="form">[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>登录密码错误限制次数:</span>[m
[32m +                        <Input v-model="login_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>注册邀请邀请码:</span>[m
[32m +                        <Switchbox v-model="login_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +            </ul>[m
[32m +            <!-- 游戏设定 -->[m
[32m +            <ul v-if="curr_set_btn===2" class="form">[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>系统维护总开关:</span>[m
[32m +                        <Switchbox v-model="game_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>是否开启洗码:</span>[m
[32m +                        <Switchbox v-model="game_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>聊天室用户等级:</span>[m
[32m +                        <Select v-model="game_set.aa" :options="chat_lev_opt"></Select>[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>最低充值多少才能游戏:</span>[m
[32m +                        <Switchbox v-model="game_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>取款密码错误限制次数:</span>[m
[32m +                        <Input v-model="game_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>推广分享地址:</span>[m
[32m +                        <Input v-model="game_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>下载域名地址:</span>[m
[32m +                        <Input v-model="game_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>APP大厅顶部域名配置:</span>[m
[32m +                        <Input v-model="game_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>输金额:</span>[m
[32m +                        <Input class="mr10" v-model="game_set.aa" />[m
[32m +                        <span>=1 积分</span>[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +            </ul>[m
[32m +            <!-- 活动金额限制设定 -->[m
[32m +            <ul v-if="curr_set_btn===3" class="form">[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>注册送活动最高金额限制:</span>[m
[32m +                        <Input v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span class="mr10">是否开启:</span>[m
[32m +                        <Switchbox v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>签到活动最高金额限制:</span>[m
[32m +                        <Input v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span class="mr10">是否开启:</span>[m
[32m +                        <Switchbox v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>首充送最高金额限制:</span>[m
[32m +                        <Input v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span class="mr10">是否开启:</span>[m
[32m +                        <Switchbox v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>抢红包最高金额限制:</span>[m
[32m +                        <Input v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span class="mr10">是否开启:</span>[m
[32m +                        <Switchbox v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>有奖竞猜最高金额限制:</span>[m
[32m +                        <Input v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span class="mr10">是否开启:</span>[m
[32m +                        <Switchbox v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>转盘活动最高金额限制:</span>[m
[32m +                        <Input v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span class="mr10">是否开启:</span>[m
[32m +                        <Switchbox v-model="active_limit_set.aa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +            </ul>[m
[32m +            <!-- 出入款设定 -->[m
[32m +            <ul v-if="curr_set_btn===4" class="form">[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>出款手续费 (%):</span>[m
[32m +                        <Input v-model="payment_form.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>每次出款免手续费笔数:</span>[m
[32m +                        <Input v-model="payment_form.aaa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>每次出款最低金额:</span>[m
[32m +                        <Input v-model="payment_form.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>每次出款最高金额:</span>[m
[32m +                        <Input v-model="payment_form.aaa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>每日出款金额限制:</span>[m
[32m +                        <Input v-model="payment_form.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>每日出款次数限制:</span>[m
[32m +                        <Input v-model="payment_form.aaa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>出款手续费最大金额:</span>[m
[32m +                        <Input v-model="payment_form.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>入款稽核倍数:</span>[m
[32m +                        <Input v-model="payment_form.aaa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>活动稽核倍数:</span>[m
[32m +                        <Input v-model="payment_form.aa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>稽核不足出款手续费（%）:</span>[m
[32m +                        <Input v-model="payment_form.aaa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>稽核不足限制出款:</span>[m
[32m +                        <Checkbox v-model="payment_form.aaa" />[m
[32m +                    </div>[m
[32m +                    <div class="li-right">[m
[32m +                        <span>人工充值最高金额限制:</span>[m
[32m +                        <Input v-model="payment_form.aaa" />[m
[32m +                    </div>[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <div class="li-left">[m
[32m +                        <span>新绑银行卡多少小时能出款:</span>[m
[32m +                        <Input v-model="payment_form.aa" />[m
[32m +                    </div>[m
[32m +                    <!-- <div class="li-right">[m
[32m +                        <span>出款密码错误限制:??</span>[m
[32m +                        <Input v-model="payment_form.aaa" />[m
[32m +                    </div>-->[m
[32m +                </li>[m
[32m +            </ul>[m
[32m +            <div class="flex-center mt20">[m
[32m +                <button class="btn-plain-large">重置</button>[m
[32m +                <button class="btn-blue-large ml50">保存</button>[m
[32m +            </div>[m
[32m +        </div>[m
[32m +    </div>[m
[32m +</template>[m
[32m +<script>[m
[32m +export default {[m
[32m +    data() {[m
[32m +        return {[m
[32m +            set_btns: [[m
[32m +                { label: '注册登录设定', value: 1 },[m
[32m +                { label: '游戏设定', value: 2 },[m
[32m +                { label: '金额限制设定', value: 3 },[m
[32m +                { label: '出入款设定', value: 4 }[m
[32m +            ],[m
[32m +            curr_set_btn: 1,[m
[32m +[m
[32m +            // 注册登录设定[m
[32m +            login_set: {[m
[32m +                aa: ''[m
[32m +            },[m
[32m +            // 游戏设定[m
[32m +            game_set: {[m
[32m +                aa: '' // 临时这样, 建议后台数据一致[m
[32m +            },[m
[32m +            // 活动金额限制设定[m
[32m +            active_limit_set: {[m
[32m +                aa: ''[m
[32m +            },[m
[32m +            // 出入款设定[m
[32m +            payment_form: {[m
[32m +                aa: ''[m
[32m +            },[m
[32m +[m
[32m +            //[m
[32m +            chat_lev_opt: [[m
[32m +                { label: '全部', value: '' },[m
[32m +                { label: 'VIP1', value: 0 },[m
[32m +                { label: 'VIP2', value: 0 },[m
[32m +                { label: 'VIP3', value: 0 }[m
[32m +            ][m
[32m +        }[m
[32m +    },[m
[32m +    methods: {[m
[32m +        setChange(item) {[m
[32m +            this.curr_set_btn = item.value[m
[32m +        }[m
[32m +    },[m
[32m +    mounted() {}[m
[32m +}[m
[32m +</script>[m
[32m +[m
[32m +<style scoped>[m
[32m +.head-set {[m
[32m +    background: #f2f2f2;[m
[32m +    padding: 20px 10px 20px 10px;[m
[32m +}[m
[32m +.set-label {[m
[32m +    font-size: 16px;[m
[32m +    font-family: PingFang SC;[m
[32m +    font-weight: 800;[m
[32m +}[m
[32m +.set-cont {[m
[32m +    margin-top: 20px;[m
[32m +    margin-left: 10px;[m
[32m +}[m
[32m +.form > li {[m
[32m +    display: flex;[m
[32m +    margin-top: 20px;[m
[32m +    /* border: 1px solid #000; */[m
[32m +}[m
[32m +.form > li > div {[m
[32m +    display: flex;[m
[32m +    align-items: center;[m
[32m +}[m
[32m +.form > li > div .v-input,[m
[32m +.form > li > div .v-select {[m
[32m +    /* width: 150px; */[m
[32m +    width: 200px;[m
[32m +}[m
[32m +.form > li .li-left {[m
[32m +    /* border: 1px solid #000; */[m
[32m +    min-width: 450px;[m
[32m +}[m
[32m +.form .li-left > span:first-child,[m
[32m +.form .li-right > span:first-child {[m
[32m +    min-width: 200px;[m
[32m +    margin-right: 10px;[m
[32m +    text-align: right;[m
[32m +}[m
[32m +.flex-center {[m
[32m +    display: flex;[m
[32m +    justify-content: center;[m
[32m +}[m
[32m++=======[m
[32m+         <div class="filter">[m
[32m+             <span style="font-size:18px;font-weight:bold">设定选项</span>[m
[32m+             <button></button>[m
[32m+         </div>[m
[32m+     </div>[m
[32m+ </template>[m
[32m+ [m
[32m+ <script>[m
[32m+ export default {[m
[32m+     data(){[m
[32m+         return{[m
[32m+ [m
[32m+         }[m
[32m+     },[m
[32m+     methods:{[m
[32m+ [m
[32m+     },[m
[32m+     mounted(){[m
[32m+ [m
[32m+     },[m
[32m+ }[m
[32m+ </script>[m
[32m+ <style scoped>[m
[32m+ [m
[32m++>>>>>>> test[m
  </style>[m
[1mdiff --cc src/components/views/user/BlackListManage.vue[m
[1mindex 4e1944e,5119912..0000000[m
[1m--- a/src/components/views/user/BlackListManage.vue[m
[1m+++ b/src/components/views/user/BlackListManage.vue[m
[36m@@@ -6,11 -6,11 +6,19 @@@[m
              <ul class="left">[m
                  <li>[m
                      <span>会员账号</span>[m
[32m++<<<<<<< HEAD[m
[32m +                    <Input limit="en-num" v-model="filter.account" />[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <span>会员ID</span>[m
[32m +                    <Input limit="en-num" v-model="filter.user_id" />[m
[32m++=======[m
[32m+                     <Input style="width:110px" limit="en-num" v-model="filter.mobile" />[m
[32m+                 </li>[m
[32m+                 <li>[m
[32m+                     <span>会员ID</span>[m
[32m+                     <Input style="width:110px" limit="en-num" v-model="filter.guid" />[m
[32m++>>>>>>> test[m
                  </li>[m
                  <li>[m
                      <span>进入黑名单时间</span>[m
[36m@@@ -20,7 -20,7 +28,11 @@@[m
                  </li>[m
                  <li>[m
                      <span>进入黑名单次数</span>[m
[32m++<<<<<<< HEAD[m
[32m +                    <Input limit="en-num" v-model="filter.times" />[m
[32m++=======[m
[32m+                     <Input style="width:110px" limit="en-num" v-model="filter.black_num" />[m
[32m++>>>>>>> test[m
                  </li>[m
              </ul>[m
              <div class="right">[m
[1mdiff --cc src/components/views/user/LoginLog.vue[m
[1mindex 7f7ef61,c232896..0000000[m
[1m--- a/src/components/views/user/LoginLog.vue[m
[1m+++ b/src/components/views/user/LoginLog.vue[m
[36m@@@ -5,11 -5,11 +5,19 @@@[m
              <ul class="left">[m
                  <li>[m
                      <span>会员账号</span>[m
[32m++<<<<<<< HEAD[m
[32m +                    <Input limit="en-num" v-model="filter.account" />[m
[32m +                </li>[m
[32m +                <li>[m
[32m +                    <span>会员ID</span>[m
[32m +                    <Input limit="en-num" v-model="filter.acc_id" />[m
[32m++=======[m
[32m+                     <Input style="width:100px;" limit="en-num" v-model="filter.mobile" />[m
[32m+                 </li>[m
[32m+                 <li>[m
[32m+                     <span>会员ID</span>[m
[32m+                     <Input style="width:100px" limit="en-num" v-model="filter.uniqueld" />[m
[32m++>>>>>>> test[m
                  </li>[m
                  <li>[m
                      <span>登录日期</span>[m
[36m@@@ -19,7 -19,7 +27,11 @@@[m
                  </li>[m
                  <li>[m
                      <span>登录IP</span>[m
[32m++<<<<<<< HEAD[m
[32m +                    <Input limit="en-num" v-model="filter.login_ip" />[m
[32m++=======[m
[32m+                     <Input style="width:100px" limit="en-num" v-model="filter.lastLoginIp" />[m
[32m++>>>>>>> test[m
                  </li>[m
              </ul>[m
              <div class="right">[m
