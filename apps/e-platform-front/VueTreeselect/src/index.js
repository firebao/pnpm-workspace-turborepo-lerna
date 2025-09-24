import Treeselect from './components/Treeselect';
import treeselectMixin from './mixins/treeselectMixin';
import './style.less';
export default Treeselect;
export { Treeselect, treeselectMixin };
export { LOAD_ROOT_OPTIONS, LOAD_CHILDREN_OPTIONS, ASYNC_SEARCH } from './constants';
export var VERSION = PKG_VERSION;