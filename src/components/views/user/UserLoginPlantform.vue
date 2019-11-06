<template>
    <div>
        会员登录??
        
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
     mounted(){
        let echarts = window.all.echarts
        console.log("TCL: mounted -> echarts", echarts)
        let myChart = echarts.init(document.getElementById('main'))
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'line',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#8ec6ad'
                        }, {
                            offset: 1,
                            color: '#ffe'
                        }])
                    }
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320],
            }]
        })
      
    }
}
</script>

<style scoped>

</style>