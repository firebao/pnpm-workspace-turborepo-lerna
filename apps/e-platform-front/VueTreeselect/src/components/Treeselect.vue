var render, staticRenderFns
import script from "./Treeselect.vue?vue&type=script&lang=js&"
export * from "./Treeselect.vue?vue&type=script&lang=js&"


/* normalize component */
import normalizer from "!../../node_modules/vue-loader/lib/runtime/componentNormalizer.js"
var component = normalizer(
  script,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (module.hot) {
  var api = require("/mnt/c/Projects/vue-treeselect/node_modules/vue-hot-reload-api/dist/index.js")
  api.install(require('vue'))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('aebf116c')) {
      api.createRecord('aebf116c', component.options)
    } else {
      api.reload('aebf116c', component.options)
    }
    
  }
}
component.options.__file = "src/components/Treeselect.vue"
export default component.exports