<template>
    <div class="v-page">
        <div class="total-num">共 {{total}} 条</div>
        <ul class="page-list">
            <li
                :class="['previous-page', pageNo <= 2 ? 'icon-disabled' : '']"
                @click="updatePageNo('-')"
                title="上一页">
                <a href="javascript:;"
                class="iconfont icon-shangyiye"></a>
            </li>
            <li v-if="pagesNum" @click="updatePageNo(1)"
                :class="[pageNo === 1 ? 'active' : '']">
                <a href="javascript:;">1</a>
            </li>
            <li
                title="向前5页"
                @click="pageBack"
                v-if="pagesNum > pagerCount & pageNo > Math.ceil(pagerCount/2)"
                class="pages-back">
                <a href="javascript:;" class="iconfont icon-more"></a>
                <a href="javascript:;" class="iconfont icon-zuofanyezuohua icon-hover"></a>
            </li>
            <li 
                v-for="n in pageRange"
                @click="updatePageNo(n)"
                :class="[pageNo === n ? 'active' : '']"
                :key="n"
                :title="n">
                <a href="javascript:;">{{n}}</a>
            </li>
            <li
                title="向后5页"
                @click="pageForward"
                v-if="pagesNum > pagerCount && pageNo < pagesNum-Math.floor(pagerCount/2)"
                class="pages-forward">
                <a href="javascript:;" class="iconfont icon-more"></a>
                <a href="javascript:;" class="iconfont icon-youfanyeyouhua icon-hover"></a>
            </li>
            <li v-if="pagesNum" @click="updatePageNo(pagesNum)"
                :class="[pageNo === pagesNum ? 'active' : '']">
                <a href="javascript:;">{{pagesNum}}</a>
            </li>
            <li
                :class="['next-page', pageNo >= pagesNum-1 ? 'icon-disabled' : '']"
                @click="updatePageNo('+')"
                title="下一页">
                <a class="iconfont icon-xiayiye"></a>
            </li>
        </ul>
        <Select  v-model="pageSize" @update="updatePageSize" :options="pageSizeList"/>
        <div class="page-jump">跳至<input @blur="pageJump" v-model.number="jumpNo" v-inputLimit="'p-integer'" type="text">页</div>
    </div>
</template>

<script>
    /* 
        event
            updateNo: 页码改变 返回 (pageNo)
            updateSize: 每页条数改变 返回 (pageSize)
    */
    export default {
        name: 'Page',
        props: {
            total: {    // 数据总条数
                type: Number,
                default: () => 0            },
            pagerCount: {// total: Number 数据总条目
                type: Number,
                default: () => 7
            }
        },
        data() {
            return {
                pageNo: 1,
                pageSize: 10,
                pagesNum: 0,
                pageRange: [],
                pageSize: 10,
                pageSizeList: [{
                    value: 10,
                    label: '10 条/页'
                },{
                    value: 25,
                    label: '25 条/页'
                },{
                    value: 50,
                    label: '50 条/页'
                }, {
                    value: 100,
                    label: '100 条/页'
                }],
                jumpNo: 0
            }
        },
        methods: {
            updatePageNo(num) {
                if(num==='-') {
                    this.pageNo > 1 && this.pageNo--
                }else if(num==='+') {
                    this.pageNo < this.pagesNum && this.pageNo++
                }else{
                    if(num === this.pageNo) {
                        return
                    }
                    this.pageNo = num
                }

                this.$emit('updateNo', this.pageNo)

                this.pageRange = []
                let centerCount = this.pagerCount - 2
                if(this.pageNo <= 4) {
                    for(let i=0; i< centerCount; i++) {
                        let page = i + 2
                        if(page >= this.pagesNum) {
                            break
                        }
                        this.pageRange[i] = page
                    }
                }else if(this.pageNo >= this.pagesNum - Math.floor(centerCount/2)) {
                    for(let i=0; i< centerCount; i++) {
                        let page = this.pagesNum - centerCount + i
                        if(page < 2) {
                            continue
                        }else if(page >= this.pagesNum) {
                            break
                        }else{
                            this.pageRange.push(page)                    
                        }
                    }
                }else{
                    for(let i=0; i< centerCount; i++) {
                        this.pageRange[i] = this.pageNo - Math.floor(centerCount/2) + i
                    }
                }
            },
            updatePageSize(size) {
                this.$emit('updateSize', size)
            },
            pageBack() {
                this.updatePageNo(this.pageNo - 5 < 1 ? 1 : this.pageNo - 5)
            },
            pageForward() {
                this.updatePageNo(this.pageNo + 5 > this.pagesNum ? this.pagesNum : this.pageNo + 5)
            },
            pageJump() {
                if(this.jumpNo > this.pagesNum) {
                    console.log('不能超过最大页')
                }else if(this.jumpNo == 0){
                    console.log('不存在0页,请重新输入')
                }else{
                    this.updatePageNo(this.jumpNo)
                }
            }
        },
        mounted() {
            this.pagesNum = Math.ceil(this.total / this.pageSize)
            for(let i = 0; i<this.pagerCount-2; i++) {
                let num = this.pageNo + i + 1
                if(num >= this.pagesNum) {
                    break
                }
                this.pageRange[i] = num
            }
        }
    }
</script>

<style scoped>
    .v-page{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .total-num{
        margin: 0 10px;
    }
    .page-list {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 0 10px;
    }
    .page-list li {
        width: 30px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid #dcdee2;
        margin: 0 4px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
    }
    .page-list .icon-disabled{
        cursor: not-allowed;
    }
    .page-list .icon-disabled a{
        color: #ddd;
    }
    .page-list .icon-disabled:hover{
        border-color: #dcdee2;
    }
    .page-list .icon-disabled:hover a{
        cursor: not-allowed;
        color: #ddd;
    }
    .page-list li:hover, .page-list .active{
        border-color: #2d8cf0;
    }
    .page-list li:hover a, .page-list .active a{
        color: #2d8cf0;
    }
    .pages-back .icon-hover, .pages-forward .icon-hover{
        display: none;
    }
    .pages-back:hover .icon-more, .pages-forward:hover .icon-more{
        display: none;
    }
    .pages-back:hover .icon-hover, .pages-forward:hover .icon-hover{
        display: inline-block;
    }
    .v-page .page-jump {
        height: 32px;
        display: flex;
        align-items: center;
        margin: 0 10px;
    }
    .v-page .page-jump input{
        width: 50px;
        height: 30px;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 0 10px;
        border-radius: 4px;
        color: #515a6e;
        border: 1px solid #dcdee2;
    }
</style>


