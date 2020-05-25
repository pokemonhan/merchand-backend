<template>
    <div class="container">
        <!----------------        收件箱          ----->
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <!-- filter 筛选 -->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>收件人</span>
                    <Input v-model="filter.receivers" />
                </li>
                <li>
                    <span>发件日期</span>
                    <!-- <Date v-model="filter.dates[0]" @update="timeUpdate()" />
                    <span style="margin: 0 5px;">~</span>
                    <Date v-model="filter.dates[1]" @update="timeUpdate()" /> -->
                    <Date type="daterange" v-model="filter.dates" />
                </li>
                <li>
                    <span>发件人:</span>
                    <Select v-model="filter.sender" :options="sender_opt" ></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询?</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                </li>
            </ul>
        </div>
        <div style="margin-top:20px;">
            <!-- 控制栏 -->
            <div class="tab-control">
                <div class="left">
                    <button class="btn-plain" @click="del">删除</button>
                </div>
                <div class="right">
                    <span>{{pageNo}}/{{Math.ceil(total/pageSize)}}</span>
                    <button
                        :disabled="pageNo<2"
                        :class="[pageNo>1?'btn-plain':'btn-disabled']"
                        @click="prevPage"
                    >上一页</button>
                    <button
                        :class="[pageNo<Math.ceil(total/pageSize)?'btn-plain':'btn-disabled']"
                        @click="nextPage"
                    >下一页</button>
                    <!-- <button class="btn-plain">上一页</button>
                    <button class="btn-plain">下一页</button> -->
                </div>
            </div>
            <!-- table -->
            <div style="margin-top:5px;"></div>
            <Table :headers="headers" :column="list" @checkboxChange="checkboxChange" hadCheckbox>
                <template v-slot:item="{row,idx}">
                    <!-- '发件人', '内容', '发送日期','发送状态' -->
                    <td class="pointer" style="width:140px;" @click="showDetail(row,idx)">
                        <p v-for="(item, index) in row.receivers" :key="index">{{item}}</p>
                    </td>
                    <!-- <td>{{title}}</td> -->
                    <td
                        class="pointer"
                        style="min-width:560px;padding:5px;"
                        @click="showDetail(row,idx)"
                    >{{getText(row.content)}}</td>
                    <td class="pointer" @click="showDetail(row,idx)">{{row.send_time}}</td>
                    <td :class="['bold',row.is_send?'green':'red']" >{{row.is_send===1?'已发送':row.is_send===0?'未发送':'???'}}</td>
                </template>
            </Table>
            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <!-- 详情 -->
        <Dialog :show.sync="dia_show" title="已发邮件详情">
            <div class="dia-inner">
                <Detail class="email-detail" isSend :row="curr_row" @close="dia_show=false" />
            </div>
        </Dialog>
        <!-- 删除确认 -->
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否删除选中邮件"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>


<script>
import Detail from './EmailDetail'
export default {
    name: 'EmailSent',
    components: {
        Detail: Detail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                sender: '',
                dates: []
            },
            sender_opt: [
                {label:'全部',value: ''},
                {label:'已发送',value:1},
                {label:'未发送',value:2},
            ],
            headers: ['发件人', '内容', '发送日期','发送状态'],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            curr_row: {},
            dia_show: false,

            mod_show: false,
            mod_status: '',
        }
    },
    methods: {
        timeUpdate() {
            //同步快捷查询按钮状态
            this.quick_query = this.filter.dates
        },
        qqUpd(dates) {
            //同步时间筛选值
            this.filter.dates = dates
            this.filter = Object.assign(this.filter)
        },
        clearFilter() {
            this.filter = {
                sender: '',
                dates: []
            }
        },
        prevPage() {
            if(this.pageNo>1) {
                this.pageNo--
                this.getList()
            }
        },
        nextPage() {
            if(this.pageNo<Math.ceil(this.total/this.pageSize)) {
                this.pageNo ++
                this.getList()
            }
        },
        checkboxChange(index, e) {
            // console.log('e: ', e);
            // console.log('index: ', index);
            // console.log(this.list);
        },
        showDetail(row, index) {
            this.curr_row = row
            this.curr_row.pageSize = this.pageSize
            this.curr_row.pageNo = this.pageNo
            this.curr_row.total = this.total
            this.curr_row.index = index
            // console.log(row);
            this.dia_show = true
        },
        del() {
            this.mod_status = 'del'
            this.mod_show = true
        },
        modConf() {
            // console.log('确认删除')
            if(this.mod_status==='del') {
                this.delConf()
            }
        },
        delConf() {
            let delIdArray = (this.list || []).filter(item => {
                return item.checked
            })
            delIdArray = delIdArray.map(item => {
                return item.id
            })
            if (delIdArray.length === 0) {
                this.$toast.info('未选中任何邮件')
                return
            }
            console.log('delIdArray: ', delIdArray)
            let data = {
                email_id: JSON.stringify(delIdArray)
            }
                       
            let { url, method } = this.$api.email_sent_del
            this.$http({ method, url, data }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200') {
                    this.$toast.success(res.message)
                    this.mod_show = false
                    //this.dia_show = false
                    this.getList()
                }
            })
        },
        getText(content) {
            let divLink = document.createElement('div')
            divLink.innerHTML = content
            return divLink.innerText
        },
        getList() {
            let created_at = ''
            if (this.filter.dates[0] && this.filter.dates[1]) {
                created_at = JSON.stringify(this.filter.dates)
            }
            let para = {
                name: this.filter.vendor,
                created_at: created_at,
                pageSize: this.pageSize,
                page: this.pageNo
            }
            let data = window.all.tool.rmEmpty(para)

            let { url, method } = this.$api.email_sent
            this.$http({ method, url, data }).then(res => {
                console.log('已发邮👌: ', res)
                if (res && res.code === '200') {
                    this.total = res.data.total
                    this.list = res.data.data
                }
            })
        },
        updateNo() {
            this.getList()
        },
        updateSize() {
            this.pageNo = 1
            this.getList()
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style scoped>

.tab-control {
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    padding: 10px;
    background: #d8e2f5;
}
.pointer {
    cursor: pointer;
}
.btn-disabled {
    padding: 5px 15px;
    color: #ccc;
    border: 1px solid #ccc;
    cursor: not-allowed;
}
.dia-inner {
    min-width: 1000px;
    max-width: 80vw;
    max-height: 80vh;
    overflow: auto;
}
/* .email-detail {
    min-width: 800px;
    width: 100vw;
} */
</style>
