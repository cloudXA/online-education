import FooterArea from '@/components/footer/index.vue';
import NotFound from '@/components/friendTips/404.vue';
import NoData from '@/components/friendTips/noData.vue'


function plugins (Vue) {
    Vue.component("footer-area", FooterArea)
    Vue.component("not-found", NotFound)
    Vue.component('no-data', NoData)
}


export default plugins;