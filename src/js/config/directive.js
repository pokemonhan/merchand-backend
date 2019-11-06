export default{
    // 点击外部时 触发事件
    clickoutside:{
        bind(el,binding){
            function documentHandler(e){
                if(el.contains(e.target)){
                    return false
                }
                if(binding.expression){
                    binding.value(e)
                }
            }
            el.__vueClickOutside__ = documentHandler
            document.addEventListener('click', documentHandler)
        },
        unbindO(el){
            document.removeEventListener('click', el.__vueClickOutside__);

        }
    }
}