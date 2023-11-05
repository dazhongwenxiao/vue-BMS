import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

// 即可在map中打印所有svg文件的路径
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
