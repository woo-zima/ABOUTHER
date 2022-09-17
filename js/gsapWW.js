(function (doc, window) {
  let downIcon = doc.getElementsByClassName('down-icon')[0],
    scroll_text = doc.querySelector('.scroll-text'),
    about = doc.getElementById('About');
  // const timeline = gsap.timeline(),
  // picText = gsap.utils.toArray('.picText');
  // picText.forEach(text => {
  //   console.log(text);
  //   ScrollTrigger.create({
  //     trigger: text,
  //     toggleClass: 'active',
  //     start: 'top top+=70px',
  //     end: 'top bottom-=10px',
  //     scrub: true,
  //     markers: true,
  //   });
  // });

  let init = () => {
    bindEvent();
  };
  //绑定事件
  function bindEvent() {
    downIcon.addEventListener('click', downIconHandle, false);
    window.addEventListener('load', scrollTextHandle, false);
    // window.addEventListener('scroll', scrollButton, false);
  }
  // 计算元素距离顶部位置
  function elementPosition(obj) {
    let curleft = obj.offsetLeft,
      curtop = obj.offsetTop;
    if (obj.offsetParent) {
      curleft += elementPosition(obj.offsetParent).x;
      curtop += elementPosition(obj.offsetParent).y;
    }
    return { x: curleft, y: curtop };
  }

  var leftCount = 0,
    rightCount = -2635;
  function scrollTextHandle() {
    if (scroll_text.hasChildNodes()) {
      var children = scroll_text.children;
      {
        for (var i = 0; i < children.length; i++) {
          i != 1
            ? (children[i].style.transform = `translate3d(${leftCount}px, 0px, 0px)`)
            : (children[i].style.transform = `translate3d(${rightCount}px, 0px, 0px)`);
        }
      }
      if (leftCount < -2635 || rightCount > 0) {
        leftCount = 0;
        rightCount = -2635;
      } else {
        --leftCount;
        ++rightCount;
      }
    }
  }
  setInterval(() => {
    scrollTextHandle();
  }, 10);

  //滚动条高度 = 容器高度/内容高度*容器高度
  //document.documentElement.clientHeight / document.getElementById('About').offsetHeight * document.documentElement.clientHeight

  //箭头点击事件
  function downIconHandle() {
    var eTop = Math.floor(elementPosition(scroll_text).y);
    // var scrollBarHeight = Math.floor((rqgd / eTop) * rqgd * 100) / 100;
    document.documentElement.scrollTop = eTop;
  }
  // function

  init();
})(document, window);
