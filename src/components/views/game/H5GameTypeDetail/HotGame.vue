<template>
    <div class="cont">
        <!-- 热门游戏内容 -->

        <div class="filter p10 mt10">
            <ul class="left">
                <li>
                    <span>游戏平台</span>
                    <Select v-model="filter.vendor_id" :options="plant_opt"></Select>
                </li>
                <li>
                    <span>游戏名称</span>
                    <Input v-model="filter.name" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                </li>
            </ul>
            <ul class="right">
                <li>
                    <button class="btn-blue" @click="sortCfm">保存</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>
                        <PicShow>
                            <img
                                style="max-width:50px;max-height:50px"
                                class="td-icon"
                                :src="row.icon"
                                alt="图片加载中"
                            />
                            <template v-slot:content>
                                <div>
                                    <img
                                        style="max-width:300px;max-height:300px;"
                                        class="tooltip-img"
                                        :src="row.icon"
                                        alt="图片加载中"
                                    />
                                </div>
                            </template>
                        </PicShow>
                    </td>
                    <td>{{row.vendor}}</td>
                    <td>{{row.name}}</td>
                    <td>
                        <button class="btns-blue" @click="move(row,idx,'moveUp')">上移</button>
                        <button class="btns-blue" @click="move(row,idx,'moveDown')">下移</button>
                    </td>
                    <td>
                        <div class="gametypes">
                            <div>
                                <Switchbox
                                    class="switch-select"
                                    :value="row.hot_new==0 ? 1:0"
                                    @update="switchNormal(row)"
                                />
                                <span>普通游戏</span>
                            </div>
                            <div>
                                <Switchbox
                                    class="switch-select"
                                    :value="row.hot_new==1 ? 1:0"
                                    @update="switchHot(row)"
                                />
                                <span>热门游戏</span>
                            </div>
                            <div>
                                <Switchbox
                                    class="switch-select"
                                    :value="row.hot_new==2 ? 1:0"
                                    @update="switchNew(row)"
                                />
                                <span>新游戏</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex" style="justify-content:center">
                            <Upload
                                style="width:100px;"
                                title="上传图片"
                                @change="upPicChange($event, row)"
                                type="file"
                            />
                            <button style="margin-left:6px" class="btns-blue">使用默认图片</button>
                            <button class="btns-blue" @click="downLoad(row)">下载图片</button>
                        </div>
                    </td>
                </template>
            </Table>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
    </div>
</template> <script>
export default {
    props: {
        // isHot: Boolean,
        // type_id: [String, Number]
    },
    data() {
        return {
            plant_opt: [{ label: "全部", value: "" }],
            filter: {
                vendor_id: "",
                name: ""
            },
            headers: [
                "编号",
                "ICON",
                "游戏平台",
                "游戏名称",
                "排序",
                "游戏类型",
                "ICON管理"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            head_path: "",
            protocol: window.location.protocol,
            pic_path: ""
        };
    },

    methods: {
        downLoad(row) {
            console.log("row", row);
            var image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;

                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                var url = canvas.toDataURL("image/png");

                // 生成一个a元素
                var a = document.createElement("a");
                // 创建一个单击事件
                var event = new MouseEvent("click");

                // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
                a.download = name || row.vendor + "-" + row.name;
                // 将生成的URL设置为a.href属性
                a.href = url;
                // 触发a的单击事件
                a.dispatchEvent(event);
            };

            image.src = row.icon;
        },
        getSelectOpt() {
            let { url, method } = this.$api.game_search_condition_list;
            this.$http({ url, method }).then(res => {
                console.log("下拉数据", res);
                if (res && res.code == "200") {
                    this.select = res.data;
                    this.plant_opt = this.backToSelOpt(
                        res.data && res.data.gameVendors
                    );
                }
            });
        },
        backToSelOpt(list = []) {
            let all = [
                {
                    label: "全部",
                    value: ""
                }
            ];
            let back_list = list.map(item => {
                return { label: item.name, value: item.id };
            });
            return all.concat(back_list);
        },
        selectBtn(item) {
            this.curr_btn = item.value;
        },
        switchNormal(row) {
            let data = {
                id: row.id,
                hot_new: "0"
            };
            let { url, method } = this.$api.game_hot_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        switchHot(row) {
            let data = {
                id: row.id,
                hot_new: "1"
            };

            let { url, method } = this.$api.game_hot_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        switchNew(row) {
            let data = {
                id: row.id,
                hot_new: "2"
            };
            // console.log("请求数据", data);
            let { url, method } = this.$api.game_hot_set;
            this.$http({ method, url, data }).then(res => {
                // console.log("新游戏", res);
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        /**
         * @param {string} row 后端的排序
         * @param {string} index 前端的排序
         * @param {stirng} moveUp ,moveDown 上移或者下移
         * @param {stirng} moveUp ,moveDown 上移或者下移
         */

        move(row, index, moving) {
            if (index === 0 && moving === "moveUp") return;
            if (index === this.list.length - 1 && moving === "moveDown") return;
            let mov = moving == "moveUp" ? -1 : 1;
            if (moving === "moveUp") {
                this.list.splice(index, 1);
                this.list.splice(index + mov, 0, row);
            } else {
                this.list.splice(index, 1);
                this.list.splice(index + mov, 0, row);
            }
            this.list = this.list.slice();
        },
        sortCfm() {
            let length = this.list && this.list.length;
            if (!length) return;
            let param = this.list.map((item, index) => {
                return {
                    id: item.id,
                    sort: length - index
                };
            });
            param = JSON.stringify(param);
            let data = {
                sorts: param
            };
            this.$http({
                method: this.$api.game_order.method,
                url: this.$api.game_order.url,
                data: data
            }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        //TO DO
        sortButtonShow(list) {
            let listLength = list.length;
            // console.log("上下移动按钮显示bug", listLength);
        },
        upPicChange(e, row) {
            let pic = e.target.files[0];
            let basket = "GameManagement/H5GamePicture";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let data = formList;
            let { url, method } = this.$api.update_picture_database;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log('上传图片返回数据',res)
                if (res && res.code == "200") {
                    let data = {
                        id: row.id,
                        icon_id: res.data.id
                    };
                    console.log("data", data);
                    let { method, url } = this.$api.picture_update;
                    this.$http({ method, url, data }).then(res => {
                        // console.log('上传返回',res)
                        if (res && res.code == "200") {
                            this.$toast.success(res && res.message);
                            this.getList();
                        }
                    });
                }
            });
        },
        getList() {
            let datas = {
                hot_new: 1,
                vendor_id: this.filter.vendor_id,
                name: this.filter.name,
                device: 2,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log('请求数据',para)
            let data = window.all.tool.rmEmpty(datas);
            let { url, method } = this.$api.game_h5_list;
            this.$http({ method, url, data }).then(res => {
                // console.log("列表返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data || [];
                    this.total = this.list.length;
                    this.sortButtonShow(res.data && res.data.data);
                }
            });
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        }
    },
    // watch: {
    //     'type_id'(to, from){
    //         console.log('from: ', from);
    //         console.log('to: ', to);
    //         if(to){
    //             this.getList()
    //         }
    //     }
    // },
    mounted() {
        this.getList();
        this.getSelectOpt();
        this.head_path = this.protocol + "//pic.397017.com/";
    }
};
</script>

<style scoped>
/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
.gametypes {
    width: 70%;
    display: flex;
    margin: 0 auto;
    text-align: center;
    justify-content: space-between;
}
.gametypes div {
    height: 100%;
    display: flex;
}
.gametypes div span {
    height: 100%;
    margin: auto;
    margin-left: 5px;
    font-size: 12px;
}
.table {
    margin-top: 15px;
}
.table {
    border-collapse: collapse;
    width: 100%;
}
.table {
    margin-top: 10px;
    width: 100%;
    overflow-x: auto;
}
.table .v-table {
    min-width: 1500px;
}
</style>
