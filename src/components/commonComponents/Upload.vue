<template>
    <div class="v-upload">
        <div>
            <input
                class="v-upload-input"
                type="file"
                accept="image/png, image/jpg, image/gif"
                ref="upload-input"
                @change="change"
            />
            <button :style="`width:${width}px`" class="btn" type="button" @click="chooseFile">
                <i class="iconfont iconshangchuan"></i>
                <span>{{title}}</span>
            </button>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        title:String,
        width:String
    },
    data() {
        return {}
    },
    methods: {
        change(e){
            // let file = e.targe.files[0]
            this.$emit('change', e)
        },
        chooseFile() {
            this.$refs['upload-input'].click()
        },
    },
    mounted() {}
}
</script>

<style scoped>
/* .v-upload {
    width: 160px;
}
.v-upload > div {
    width: 100%;
} */
.iconshangchuan{
    margin-right: 20px;
}
.v-upload-input {
    width: 100%;
    display: none;
}

</style>
