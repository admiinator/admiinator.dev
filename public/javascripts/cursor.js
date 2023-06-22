$('html').on('mousemove', (e) => {
  moveCursor(e);
});

moveCursor = (e) => {
  console.log(e.pageX);
  console.log(e.pageY);
  TweenLite.to($('.cursor'), 0.3, {
    css: {
      left: e.pageX-($('.cursor').width()/2),
      top: e.pageY-($('.cursor').height()/2)
    }
  })
}