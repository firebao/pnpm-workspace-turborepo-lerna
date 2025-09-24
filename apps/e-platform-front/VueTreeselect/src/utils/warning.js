import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { noop } from './noop';
export var warning = process.env.NODE_ENV === 'production' ? noop : function warning(checker, complainer) {
  if (!checker()) {
    var _console;

    var message = ['[Vue-Treeselect Warning]'].concat(complainer());

    (_console = console).error.apply(_console, _toConsumableArray(message));
  }
};