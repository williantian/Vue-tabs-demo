Vue.component('tabs',{
    props:['selectedTab'],
     template:
      `
        <div class="tabs">
          <slot>
        </div>
      `,
    mounted(){
      this.$children.forEach((vm)=>{
        if(vm.$options.name==='tabs-navs'){
          vm.setSelectedTab(this.selectedTab)
          vm.$on('update:selectedTab',(e)=>{
          this.$emit('update:selectedTab',e)
          })
        }else if(vm.$options.name==='tabs-panes'){
          vm.setSelectedTab(this.selectedTab)
        }
      })
    },
    updated(){
      this.$children.forEach((vm)=>{
        if(vm.$options.name==='tabs-navs'){
          vm.setSelectedTab(this.selectedTab)
          }else if(vm.$options.name==='tabs-panes'){
          vm.setSelectedTab(this.selectedTab)
        }
      })
    }
  })
  Vue.component('tabs-navs',{
    name:'tabs-navs',
    data(){
      return {
        selectedTab:undefined
      }
    },
    template:
    `
     <div class="tabs-navs">
       <slot>
     </div>
    `,
    methods:{
      setSelectedTab(tab){
        this.selectedTab = tab
        this.$children.forEach((e)=>{
          e.setSelectedTab(tab)
        })
      }
    },
    mounted(){
      this.$children.forEach((e)=>{
        
        e.$on('update:selectedTab',(e)=>{
          this.$emit('update:selectedTab',e)
        })
      })
    },
    created(){
     this.$on('update:selectedTab',()=>{
      
      }
     )
  }
  })
  Vue.component('tabs-navs-item',{
    props:["name"],
    data(){
      return{
        selectedTab: undefined
      }
    },
    template:`
     <div class="tabs-navs-item" :class={active} @click = "onClick">
       <slot>
     </div>
    `,
    methods:{
      setSelectedTab(tab){
        this.selectedTab = tab
      },
      onClick(){
        this.$emit('update:selectedTab',this.name) //触发事件
      }
    },
    computed:{
     active(){
      return this.selectedTab === this.name
     }
    }
  })
  Vue.component('tabs-panes',{
    name:'tabs-panes',
    data(){
      return {
        selectedTab:undefined
      }
    },
    template:
    `
      <div class="tabs-panes">
        <slot>
      </div>
    `,
    methods:{
      setSelectedTab(tab){
        this.selectedTab = tab
        this.$children.forEach((e)=>{
          e.setSelectedTab(tab)
        })
      }
    }
  })
  Vue.component('tabs-panes-item',{
    props:["name"],
    data(){
      return{
        selectedTab: undefined
      }
    },
    template:
    `
      <div class="tabs-panes-item" :class = {active}>
        <slot>
      </div>
    `,
    methods:{
      setSelectedTab(tab){
        this.selectedTab = tab
      }
    },
    computed:{
     active(){
      return this.selectedTab === this.name
     }
    }
  })
  ///// 上面是轮子 /////
  var vm = new Vue({
    el:"#app",
    data:{
      value: 'tab1'
    },
    template:
    `
     <tabs :selectedTab="value" @update:selectedTab = "value=$event">
       <tabs-navs name="tabs-navs">
         <tabs-navs-item name="tab1">tab1</tabs-navs-item>
         <tabs-navs-item name="tab2">tab2</tabs-navs-item>
       </tabs-navs>
       <tabs-panes name="tabs-panes">
         <tabs-panes-item name="tab1">内容1</tabs-panes-item>
         <tabs-panes-item name="tab2">内容2</tabs-navs-item>
       </tabs-panes>
     </tabs>
    `
  })
