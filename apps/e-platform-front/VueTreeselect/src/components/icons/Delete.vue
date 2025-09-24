import { render, staticRenderFns } from "./Delete.vue?vue&type=template&id=364b6320&"
import script from "./Delete.vue?vue&type=script&lang=js&"
export * from "./Delete.vue?vue&type=script&lang=js&"


/* normalize component */
import normalizer from "!../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js"
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
    if (!api.isRecorded('364b6320')) {
      api.createRecord('364b6320', component.options)
    } else {
      api.reload('364b6320', component.options)
    }
    module.hot.accept("./Delete.vue?vue&type=template&id=364b6320&", function () {
      api.rerender('364b6320', {
        render: render,
        staticRenderFns: staticRenderFns
      })
    })
  }
}
component.options.__file = "src/components/icons/Delete.vue"
export default component.exports