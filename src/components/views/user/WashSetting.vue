<template>
    <div class="container">
        <div class="sort">
            <span
                v-for="(game, index) in games"
                :key="index"
                :class="[active_game===index?'actived':'']"
                @click="actSort(index)"
            >{{game}}</span>
        </div>
        <div class="game-plant">
            <span>选择游戏平台:</span>
            <button
                v-for="(game_plant, index) in plants"
                :key="index"
                :class="[active_plant===index?'btn-blue':'btn-plain']"
                @click="choose_platform(index)"
            >{{game_plant}}</button>
            <button style="margin-left:40px;" class="btn-blue" @click="addWash">添加洗码规则</button>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td style="height:30px">{{idx+1}}</td>
                    <td>{{row.bet}}</td>

                    <td v-for="(item,index) in row.percent_data" :key="index" >
                        {{item.percent*100}}%
                    </td>
                    <td>
                        <span class="a" @click="editWashModal(row)">编辑</span>
                        <span class="a" @click="delWashModal(row)">删除</span>
                    </td>
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
        <div class="modal-mask" v-if="show_modal">
            <div class="v-modal edit-modal">
                <div class="mod-head">
                    <span>洗码设置</span>
                    <i class="iconfont iconcuowuguanbi-" @click="show_modal=false"></i>
                </div>
                <div class="mod-body center-box">
                    <table :class="['form-table', !is_edit?'ml-210':'']">
                        <tr class="row1">
                            <td>前一列对比数据</td>
                            <td>编辑数据</td>
                            <td v-if="is_edit">后一列对比数据</td>
                        </tr>
                        <tr class="code-amount row2">
                            <td>
                                <div>
                                    <span>打码额度:</span>
                                    <Input class="w100 ml-10" v-model="wash_form.code_numbers[0]" />
                                    <i class="iconfont iconsousuo ml-10"></i>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>打码额度:</span>
                                    <Input class="w100 ml-10" v-model="wash_form.code_numbers[1]" />
                                    <i class="iconfont iconsousuo ml-10"></i>
                                </div>
                            </td>
                            <td>
                                <div v-if="is_edit">
                                    <span>打码额度:</span>
                                    <Input class="w100 ml-10" v-model="wash_form.code_numbers[2]" />
                                    <i class="iconfont iconsousuo ml-10"></i>
                                </div>
                            </td>
                        </tr>
                        <tr class="vip-data" v-for="n in 7" :key="n">
                            <td>
                                <span>VIP{{n}}:</span>
                                <span class="ml-10">
                                    {{aaaaaa}}
                                </span>
                            </td>
                            <td>
                                <div class="edit-form">
                                    <span>VIP{{n}}:</span>
                                    <Input class="w100 ml-10" v-model="aaaaaa" />
                                    <span class="ml-10">%</span>
                                </div>
                            </td>
                            <td  v-if="is_edit">
                                <div class="edit-form">
                                    <span>VIP{{n}}:</span>
                                    <span class="ml-10">{{aaaaaa}}</span>
                                    <span></span>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div style="margin-top:50px;text-align:center;">
                        <button class="btn-plain-large mr" @click="show_modal=false">取消</button>
                        <button class="btn-blue-large" @click="editModalSave">保存</button>
                    </div>
                </div>
            </div>
        </div>
    
        <Modal
            :show="show_del_modal"
            title="删除等级"
            content="是否删除该打码记录"
            @cancel="show_del_modal=false"
            @close="show_del_modal=false"
            @confirm="delConfirm"
        ></Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            games: ['刺激棋牌', '经典棋牌', '电子游艺', '趣味竞猜'],
            active_game: 0,

            // game_plant: 0,
            active_plant: 0,
            plants: ['开元棋牌', '龙城棋牌', '财神棋牌', '欢乐棋牌'],
            game_plant_option: [
                { label: '全部', value: '2' },
                { label: '甲', value: '3' }
            ],
            user_id: '',
            headers: ['编号','打码量','操作'
                // { label: '编号' },
                // { label: '打码量' },
                // { label: 'VIP1' },
                // { label: 'VIP2' },
                // { label: 'VIP3' },
                // { label: 'VIP4' },
                // { label: 'VIP5' },
                // { label: 'VIP6' },
                // { label: 'VIP7' },
                // { label: '操作' }
            ],
            list: [
                {
                    a: '1',
                    b: '1000',
                    c: '0.8%',
                    d: '0.8%',
                    e: '0.8%',
                    f: '0.8%',
                    g: '0.8%',
                    h: '0.8%',
                    i: '0.8%'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            //晋级方式
            up_method: '',
            up_method_opt: [
                { label: '充值', value: 1 },
                { label: '打码量', value: 2 }
            ],
            show_modal: false,
            /* ----------  wash_form ------------ */
            wash_form: {
                code_numbers: [],
                // vip1: { num: '', bonus: '' },
                // vip2: { num: '', bonus: '' },
                // vip3: { num: '', bonus: '' },
                // vip4: { num: '', bonus: '' },
                // vip5: { num: '', bonus: '' },
                // vip6: { num: '', bonus: '' },
                // vip7: { num: '', bonus: '' }
            },
            /* 删除 */
            show_del_modal: false,
            // modal_status: '',
            is_edit:true,
            aaaaaa: '0.8%'
        }
    },
    methods: {
        actSort(index) {
            this.active_game = index;
            this.getList()
        },
        choose_platform(index){
            this.active_plant=index;
            this.getList()
        },
        addWash() {
            this.show_modal = true
            // this.modal_status = 'add'
            this.is_edit = false
        },
        updateNo(val) {},
        updateSize(val) {},
        editWashModal(row) {
            this.show_modal = true
            // this.modal_status = 'edit'
            this.is_edit = true
            this.wash_form=Object.assign({},row)

        },
        delWashModal(row) {
            console.log(row)
            this.show_del_modal = true
        },
        editModalSave() {},
        delConfirm() {
            console.log('我删除了.')
        },
        getList(){
            let para={
                gameTypeId:this.active_game,
                gameVendorId:this.active_plant,
            };
            // let self=this
            let params = window.all.tool.rmEmpty(para)
            let {method,url}=this.$api.wash_code_list;
            this.$http({method:method,url:url,params:params}).then(res=>{
                console.log("res",res)
                if(res && res.code =='200'){
                    this.list=res.data
                    // { label: '编号' }
                    let vip_list = []
                    vip_list = (res.data && res.data[0] && res.data[0].percent_data) ||[]
                    let vip_head= vip_list.map(item=>{
                        return item.grade_name
                    })
                    this.headers= Array.concat(['编号','打码量'], vip_head, '操作')
                }else{
                    if(res && res.message !==''){
                        this.toast.error(res.message)
                    }
                }
            })
        },
    },
    mounted() {
        this.getList()
    }
}
</script>

<style scoped>
/* .container 公共区 */

.sort > span {
    padding: 4px 12px;
    cursor: pointer;
    /* border: 1px solid #000; */
    transition: all 0.3s;
}
.sort .actived {
    color: #4c8bfc;
    border-bottom: 2px solid #48f;
}
.game-plant {
    margin-top: 20px;
}
.btn {
    /* height: 26px; */
    padding-left: 15px;
    padding-right: 15px;
    /* padding: 3px 15px; */
    box-sizing: border-box;
    border-radius: 3px;
    outline: none;
    border: none;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    color: #333;
    border: 1px solid #333;
    background-color: #fff;
}

.btn:hover {
    box-shadow: none;
    /* color: #246aeb;
    border: 1px solid #48f; */
}

.table {
    margin-top: 15px;
}
.page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
/* modal-mask  --在index.html区域中 */
.edit-modal {
    width: 900px;
    height: 620px;
}

.center-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.mr {
    margin-right: 100px;
}
.ml-10{
    margin-left: 10px;
}
.bold{
    font-weight: 800;
}
/* 洗码编辑 */
.form-table {
    width: 700px;
    table-layout: fixed;
}
.ml-210{
    margin-left: 210px;
}
.form-table tr td {
    height: 50px;
}
.form-table .row1 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #4c8bfd;

}
.code-amount td div {
    display: flex;
    justify-content: center;
    align-items: center;
}
.code-amount td div {
    font-weight: 800;
}
.edit-form {
    display: flex;
    align-items: center;
}
.vip-data td span:first-child{
    margin-left: 40px;
}
</style>