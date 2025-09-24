var render, staticRenderFns
import script from "./SingleValue.vue?vue&type=script&lang=js&"
export * from "./SingleValue.vue?vue&type=script&lang=js&"


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
    if (!api.isRecorded('03d19b89')) {
      api.createRecord('03d19b89', component.options)
    } else {
      api.reload('03d19b89', component.options)
    }
    
  }
}
component.options.__file = "src/components/SingleValue.vue"
export default component.exports