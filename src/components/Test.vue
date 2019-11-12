<template>
    <div class="fluid container">
        <!-- <div class="form-group form-group-lg panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Sortable control</h3>
            </div>
            <div class="panel-body">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" v-model="editable" />Enable drag and drop
                    </label>
                </div>
                <button
                    type="button"
                    class="btn btn-default"
                    @click="orderList"
                >Sort by original order</button>
            </div>
        </div> -->

        <div class="col-md-3">
            <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions" 
                :move="onMove" @start="isDragging=true" @end="isDragging=false" >
                <transition-group type="transition" :name="'flip-list'">
                    <li class="list-group-item" v-for="element in list" :key="element.order">
                        <!-- <i
                            :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                            @click=" element.fixed=! element.fixed"
                            aria-hidden="true"
                        ></i> -->
                        {{element.name}}
                        <span class="badge" >{{element.order}}</span>
                    </li>
                </transition-group>
            </draggable>
        </div>

        <!-- <div class="col-md-3">
            <draggable element="span" v-model="list2" v-bind="dragOptions" :move="onMove">
                <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in list2" :key="element.order">
                        <i
                            :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                            @click=" element.fixed=! element.fixed"
                            aria-hidden="true"
                        ></i>
                        {{element.name}}
                        <span
                            class="badge"
                        >{{element.order}}</span>
                    </li>
                </transition-group>
            </draggable>
        </div> -->

        <!-- <div class="list-group col-md-3">
            <pre>{{listString}}</pre>
        </div>
        <div class="list-group col-md-3">
            <pre>{{list2String}}</pre>
        </div> -->
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: "hello",
    components: {
        draggable
    },
    data() {
        return {
          
            list:[
                {name:'一',order:1,fixed:false},    // ,名称, order, 是否固定(固定true则不可拖动)
                {name:'二',order:2,fixed:false},
                {name:'三',order:3,fixed:false},
                {name:'四',order:4,fixed:false},
                {name:'五',order:5,fixed:false},
                {name:'六',order:6,fixed:false},
                {name:'七',order:7,fixed:false},
            ],
            list2: [],
            editable: true,
            isDragging: false,
            delayedDragging: false
        };
    },
    methods: {
        // orderList() {
        //     this.list = this.list.sort((one, two) => {
        //         return one.order - two.order;
        //     });
        // },
        onMove({ relatedContext, draggedContext }) {
            
            const relatedElement = relatedContext.element;
            // console.log("要交换的元素(name,order,fixed)", relatedElement)
            const draggedElement = draggedContext.element;
            // console.log("拖动元素", draggedElement)
            return (
                (!relatedElement || !relatedElement.fixed) &&
                !draggedElement.fixed
            );
            // return false 不可拖动
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: "description",   
                disabled: !this.editable,   //是否可拖动
                ghostClass: "ghost" //拖动时 css样式的class
            };
        },
        // listString() {
        //     return JSON.stringify(this.list, null, 2);
        // },
        // list2String() {
        //     return JSON.stringify(this.list2, null, 2);
        // }
    },
    watch: {
        isDragging(newValue) {
            // if (newValue) {
            //     this.delayedDragging = true;
            //     return;
            // }
            // this.$nextTick(() => {
            //     this.delayedDragging = false;
            // });
        }
    }
};
</script>

<style scoped>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {    
    opacity: 0.5;
    background: #109bdb;
    color: #fff;
}

.list-group {
    min-height: 20px;
    /* border: 1px solid rgb(243, 14, 14); */
}

.list-group-item {
    width: 200px;
    padding: 6px 10px;
    margin-bottom: 3px;
    border: 1px solid #000;
    border-radius: 4px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.082);
    cursor: move;
}

/* .list-group-item i {
    cursor: pointer;
} */
</style>
