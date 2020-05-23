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
                    <button class="btn-blue" @click="sortCfm">保存排序</button>
                    <button class="btn-blue" @click="downLoadAllPic">下载本页所有图片</button>
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
                        <button v-if="idx!=0" class="btns-blue" @click="move(row,idx,'moveUp')">上移</button>
                        <button
                            v-if="idx != list.length - 1"
                            class="btns-blue"
                            @click="move(row,idx,'moveDown')"
                        >下移</button>
                    </td>
                    <td>
                        <div class="gametypes">
                            <div>
                                <Switchbox
                                    :disabled="row.hot_new==0"
                                    class="switch-select"
                                    :value="row.hot_new==0 ? 1:0"
                                    @update="switchNormal(row)"
                                />
                                <span>普通游戏</span>
                                <!-- <Radio
                                    label="普通游戏"
                                    :value="row.status"
                                    val="1"
                                    v-model="row.status"
                                    @update="switchNormal()"
                                />-->
                            </div>
                            <div>
                                <Switchbox
                                    :disabled="row.hot_new==1"
                                    class="switch-select"
                                    :value="row.hot_new==1 ? 1:0"
                                    @update="switchHot(row)"
                                />
                                <span>热门游戏</span>
                            </div>
                            <div>
                                <Switchbox
                                    :disabled="row.hot_new==2"
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
                            <button
                                style="margin-left:6px"
                                class="btns-blue"
                                @click="changeDefaultIcon(row)"
                            >使用默认图片</button>
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
</template> 
<script>
import JSZIP from "jszip";
import FileSaver from "file-saver";
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
        downLoadAllPic() {
            console.log("列表", this.list);
            let all_data = this.list;
            let all_pic_path = [];
            for (var i = 0; i < all_data.length; i++) {
                all_pic_path.push(all_data[i].icon);
            }
            //    console.log('图片地址',all_pic_path)
            let all_pic_name = [];
            for (var j = 0; j < all_data.length; j++) {
                all_pic_name.push(all_data[j].vendor + "-" + all_data[j].name);
            }
            // console.log('图片名称',all_pic_name)
            let blogTitle = "H5游戏图片";
            let zip = new JSZIP();
            let imgs = zip.folder(blogTitle);
            let baseList = [];
            let arr = all_pic_path;
            let imgNameList = all_pic_name;
            for (var i = 0; i < arr.length; i++) {
                let image = new Image();
                //解决跨域Canvas污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function() {
                    let canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;

                    let context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);

                    let url = canvas.toDataURL(); //得到图片的base64编码数据
                    canvas.toDataURL("image/png");
                    
                    baseList.push(url.substring(22)); // 去掉base64编码前的 data:image/png;base64,
                    if (baseList.length === arr.length && baseList.length > 0) {
                        for (let k = 0; k < baseList.length; k++) {
                            imgs.file(imgNameList[k] + ".png", baseList[k], {
                                base64: true
                            });
                        }
                        zip.generateAsync({ type: "blob" }).then(function(
                            content
                        ) {
                            //save FileSaver.js
                            FileSaver.saveAs(content, blogTitle + ".zip");
                        });
                    }
                };
                image.src = arr[i];
            }
        },
        changeDefaultIcon(row) {
            console.log("row", row);
            let data = {
                id: row.id,
                icon_id: row.default_icon_id
            };
            console.log("data", data);
            let { method, url } = this.$api.picture_update;
            this.$http({ method, url, data }).then(res => {
                console.log("上传返回", res);
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
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
            console.log("请求数据", data);
            let { url, method } = this.$api.game_hot_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.list = [];
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
                    this.list = [];
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
                    this.list = [];
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
                console.log("列表返回数据", res);
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
        this.sortCfm();
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
