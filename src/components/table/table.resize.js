import {$} from '@core/dom';
export const tableResizeHandler = ($root, event) => {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
  let value = 0;
  $resizer.css({opacity: 1, zIndex: 1000, [sideProp]: '-5000px'});

  // maybe add throttle
  if (type === 'col') {
    document.onmousemove = (e) => {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px', opacity: 1});
    };
  } else {
    document.onmousemove = (e) => {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'});
    };
  }

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    $resizer.css({opacity: 0, right: 0, bottom: 0});
    if (type === 'col') {
      $parent.css({width: value + 'px'});
      cells.forEach((el) => (el.style.width = value + 'px'));
    } else {
      $parent.css({height: value + 'px', bottom: 0});
    }
  };
};
