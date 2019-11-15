<template>
    <div class="container">
        <div class="filter">
            <span>
                <span>游戏账号</span>
                <Input class="game-account" size="small"/>
            </span>
            <span>
                <span>游戏ID</span>
                <Input class="game-id" size="small"/>
            </span>
            <span>
                <span>注册日期</span>
                <Date/>
                <span>至</span>
                <Date/>
                
            </span>
            <span>
                <span>IP地址</span>
                <Input class="ip-address" size="small"/>
            </span>
            <span class="acc-status">
                <span>账号状态</span>
                <!-- <Input class="account-status" size="small"/> -->
                <span >
                    <Select v-model="select_val" :options="options" style="width:70px;" @update="selectupdate"></Select>
                </span>
            </span>
            <span>
                <button class="btn-blue">查询</button>
            </span>
            <span>
                <button class="btn-blue">导出Excel</button>
            </span>
        </div>
        <div class="tool-bar">
            <button class="btn-blue">添加账号</button>
            <button class="btn-blue">赠送彩金</button>
            <button class="btn-blue">人工扣款</button>
            <button class="btn-blue">人工存款</button>
            <button class="btn-blue">重置登录密码</button>
            <button class="btn-blue">重置取款密码</button>
            <button class="btn-blue">清空姓名</button>
            <button class="btn-blue">清空银行卡</button>
            <button class="btn-blue">批量禁用</button>
            <button class="btn-blue">批量启用</button>
        </div>
      
        <Table :headers="headers" :column="list" @checkboxChange="checkboxChange" :haveCheckbox="true">
            <template  v-slot:item="{row}" >
                <td class="table-td">{{row.a}}</td>
                <td>{{row.b}}</td>
                <td>{{row.c}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
                <td>{{row.d}}</td>
            </template>
        </Table>

        <!-- <div class="modal-mask">
            <div class="v-modal">???</div>
        </div> -->
        <div id="editor">
            <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
        </div>
        <textarea style="border-radius:7px;font-size:20px" name="" id="" cols="30" rows="10"></textarea>
    </div>
</template>

<script>
export default {
   
    data(){
        return {
            headers:[
                {label:'状态'},
                {label:'游戏账号'},
                {label:'游戏ID'},
                {label:'VIP等级'},
                {label:'推广等级'},
                {label:'下级人数'},
                {label:'携带金币'},
                {label:'保险箱金币'},
                {label:'账号状态'},
                {label:'在线时长'},
                {label:'注册日期'},
                {label:'登录IP'},
                {label:'操作'}
            ],
            list:[
                {a:'1',b:'2',c:'3',d: '4'},
                {a:'1',b:'2',c:'3',d: '4'}
            ],
            select_val: '3',
            options:[
                {label:'一', value: '2'},
                {label:'二', value: '3'},
                {label:'三', value: '4'}
            ]
        }
    },
    methods: {
        checkboxChange(whitch,is_checked,check_list){
            console.log(" check_list", check_list)
            console.log("whitch", whitch)
            console.log("是否选中", is_checked)
            console.log(this.list);
            
        },
        selectupdate(val){
            this.$toast.info('你好')
        }
    },
    mounted() {
        var E = window.all.wangeditor

         var editor = new E(document.getElementById('editor'))
        editor.create()
        // 设置内容
        editor.txt.html('<p style="color:red;font-size:19px">用 JS 设置的内容</p>')
        // 获取内容
        let html = editor.txt.html()
    },
}
</script>

<style scoped>
    .container{
        font-size: 14px;
        background: #fff;
        padding: 10px 8px;
        border-radius: 5px;
        border-top-left-radius: 0;
    }
    .game-account, .game-id, .ip-address{
        width: 100px;
    }
    .filter{
        display:flex;
        align-items: center;
        /* white-space: nowrap; */
        line-height: 25px;
    }
    .filter>span{
        display: flex;
    }
    .filter>span:not(:first-child){
        margin-left: 6px;
    }
    .filter>span>span{
        margin-right: 3px;
    }
    .game-date{
        width: 80px;
    }
    .account-status{
        width: 80px;
    }
    .acc-status{
        /* display: flex;
        align-items: center; */
        /* display: inline-block; */
    }

    .btn-blue{
        /* padding: 4px 15px; */
        outline: none;
        border: none;
        border-radius: 3px;
        color: #fff;
        background: #4c8bfd;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
    .btn-blue:hover{
        background: #6a9bf5;
        box-shadow: none;
    }
    .filter .btn-blue{
        padding: 4px 15px;
    }
    .tool-bar .btn-blue{
        padding: 6px 15px;
    }
    .tool-bar{
        margin: 30px 0;
    }
    .table-td{
        /* width: 300px; */
        text-align: center;
        padding: 18px 6px;
    }
    /* .modal-mask   已转移到公共css*/
    .v-modal{
        width: 520px;
        height: 500px;
        position: absolute;
        top: 100px;
        z-index: 2;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        border-radius: 7px;
    }
</style>