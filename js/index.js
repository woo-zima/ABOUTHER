(function (doc, win) {
  let changeBtns = doc.querySelector('.night'),
    home = doc.querySelector('.home'),
    body = doc.querySelector('body'),
    nav = doc.querySelector('.nav'),
    retime = doc.querySelector('.retime'),
    main = doc.querySelector('.main'),
    scroll_text = doc.querySelector('.scroll-text');
  (back = doc.querySelectorAll('.back')),
    (cursor1 = document.querySelector('.cursor-1')),
    (cursor2 = document.querySelector('.cursor-2'));

  var navName = 'nav';
  // playBtns = doc.querySelector('.play'),
  // btnAudio = playBtns.parentElement;

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    changeBtns.addEventListener('click', colorChange, false);
    home.addEventListener('click', homeMove, false);
    nav.addEventListener('click', navHandle, false);
    win.addEventListener('load', refreshWindow, false);
    // win.addEventListener('mousemove', cursorMover, false);
    back.forEach(item => {
      item.addEventListener('click', backHandle, false);
    });
    // back.addEventListener('click', backHandle, false);
  }
  // 全局颜色切换
  function colorChange() {
    body.classList.toggle('dark');
    changeBtns.classList.toggle('active');
  }
  // showNav
  function homeMove() {
    var wlh = win.location.hash.substring(1);
    if (wlh) {
      var target = doc.querySelector(`#${wlh}`);
      if (wlh == navName) {
        target.style.display = 'block';
        navName = 'nav';
      } else {
        target.style.display = 'none';
        navName = wlh;
      }
    }
    home.classList.toggle('active');
    nav.classList.toggle('active');
  }
  //导航栏切换
  function navHandle(e) {
    if (e.target.className == 'crs') {
      let target = doc.querySelector(`#${e.target.innerHTML}`);
      console.log(target);
      navName = 'nav';
      home.classList.toggle('active');
      nav.classList.toggle('active');
      target.style.display = 'block';
      main.style.display = 'none';
      //gsap
      if (target === Picture) {
        scrollPicHandle();
      }
    } else {
      return;
    }
  }
  // function getElement(tar) {
  //   return doc.querySelector(`#${tar}`);
  // }
  //scrollPicHandle
  function scrollPicHandle() {
    gsap.registerPlugin(ScrollTrigger);
    const picText = document.querySelectorAll('.picText'),
      images = document.querySelectorAll('.images');
    picText.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        id: i + 1,
        toggleClass: { targets: text, className: 'active' },
        toggleActions: 'play reverse none reverse',
        start: 'top bottom-=70px',
        end: () => `center +=70px`,
        scrub: true,
        // markers: true,
      });
    });
    images.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        id: i + 1,
        toggleClass: { targets: item, className: 'active' },
        toggleActions: 'play reverse none reverse',
        start: 'top bottom-=70px',
        end: () => `center +=70px`,
        scrub: true,
        // markers: true,
      });
    });
  }

  function backHandle() {
    win.location.hash = '';
    let target = this.parentElement;
    main.style.display = 'flex';
    target.style.display = 'none';
  }
  // 计算元素距离顶部位置
  function elementPosition(obj) {
    let curleft = 0,
      curtop = 0;
    if (obj.offsetParent) {
      curleft = obj.offsetLeft;
      curtop = obj.offsetTop;
      while ((obj = obj.offsetParent)) {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      }
    }
    return { x: curleft, y: curtop };
  }

  var repeatCount = 0;
  var cTimeout;
  var timeoutIntervals = new Array();
  var timeoutIntervalSpeed;
  function ScrollSmoothly(scrollPos, repeatTimes) {
    if (repeatCount < repeatTimes) {
      win.scrollBy(0, 50);
    } else {
      repeatCount = 0;
      clearTimeout(cTimeout);
      return;
    }
    repeatCount++;
    cTimeout = setTimeout("ScrollSmoothly('" + scrollPos + "','" + repeatTimes + "')", 10);
  }

  // 处理滚动条
  function ScrollToControl(classname) {
    let elem = document.getElementsByClassName(classname)[0];
    let scrollPos = elementPosition(elem).y - 60; //部分页面存在固定的Head部分
    scrollPos = scrollPos - document.documentElement.scrollTop;
    var remainder = scrollPos % 50;
    var repeatTimes = (scrollPos - remainder) / 50;
    ScrollSmoothly(scrollPos, repeatTimes);
    win.scrollBy(0, remainder);
  }

  //刷新页面
  function refreshWindow() {
    win.location.hash = '';
  }
  //节流函数  减少代码执行频率
  function throttle(fn, interval = 500) {
    let run = true;
    return function () {
      if (!run) return;
      run = false;
      setTimeout(() => {
        fn.apply(this, arguments);
        run = false;
      }, interval);
    };
  }
  //防抖函数 判断某个动作结束，如滚动结束，input输入结束等
  function debounce(fn, interval = 500) {
    let timout = null;
    return function () {
      clearTimeout(timout);
      timout = setTimeout(() => {
        fn.apply(this, arguments);
      }, interval);
    };
  }

  //cursor
  function cursorMover(e) {
    cursor1.style.top = e.pageY + 'px';
    cursor1.style.left = e.pageX + 'px';
    cursor2.style.top = e.pageY + 'px';
    cursor2.style.left = e.pageX + 'px';
    cursor1.style.backgroundColor = ' var(--red-color)';
    cursor2.style.border = '1px solid var(--black)';
    let links = document.querySelectorAll('a').forEach(links => {
      links.onmouseenter = () => {
        cursor1.classList.add('active');
        cursor2.classList.add('active');
      };
      links.onmouseleave = () => {
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
      };
    });
    // main.addEventListener('mouseenter', () => {
    //   cursor1.classList.remove('hidden');
    //   cursor2.classList.remove('hidden');
    // });
    // main.addEventListener('mouseleave', () => {
    //   cursor1.classList.add('hidden');
    //   cursor2.classList.add('hidden');
    // });
  }

  function Timeer() {
    let beginday = new Date('2/12/2022 10:40:22');
    let today = new Date();
    let alltime = today.getTime() - beginday.getTime();

    allday = alltime / (24 * 60 * 60 * 1000);
    allday_z = Math.floor(allday);
    allhour = (allday - allday_z) * 24; //天数
    allhour_z = Math.floor(allhour);
    allmin = (allhour - allhour_z) * 60; //小时数
    allmin_z = Math.floor(allmin);
    allsec = Math.floor((allmin - allmin_z) * 60); //秒数

    function getDataTime(i) {
      let timeFilter = [allday_z + '天', allhour_z + '小时', allmin_z + '分钟', allsec + '秒'];
      return timeFilter[i];
    }
    for (let i = 0; i < retime.children.length; i++) {
      retime.children[i].innerHTML = `${getDataTime(i)}`;
    }
    setTimeout(() => {
      Timeer();
    }, 1000);
  }
  Timeer();
  init();
})(document, window);
