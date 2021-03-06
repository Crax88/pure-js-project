import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {tableResizeHandler} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(99);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event);
    }
  }
}
