var render, staticRenderFns
import script from "./MultiValueItem.vue?vue&type=script&lang=js&"
export * from "./MultiValueItem.vue?vue&type=script&lang=js&"


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
    if (!api.isRecorded('6dd6c8ca')) {
      api.createRecord('6dd6c8ca', component.options)
    } else {
      api.reload('6dd6c8ca', component.options)
    }
    
  }
}
component.options.__file = "src/components/MultiValueItem.vue"
export default component.exports