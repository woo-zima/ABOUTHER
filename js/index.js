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
      if (wlh == 'firstContent') {
        wlh = 'Memory';
      }
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
      } else if (target === Memory) {
        scrollMmyHandle();
      } else if (target === Future) {
        abeamTransfrom();
      }
    } else {
      return;
    }
  }

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
  //memory的函数
  function scrollMmyHandle() {
    const next = doc.querySelector('#next'),
      prev = doc.querySelector('#prev'),
      memoryUl = doc.querySelector('.ulcontainer'),
      memoryLi = Array.from(doc.querySelectorAll('.ulcontainer li')),
      fristInput = doc.querySelector('#fristInput'),
      fInput = doc.querySelector('.finput'),
      ycwz = doc.getElementById('ycwz'),
      button = Array.from(doc.getElementsByClassName('button'));
    next.addEventListener('click', debound(Transclick), false);
    prev.addEventListener('click', debound(Transclick), false);
    button.forEach(item => {
      item.addEventListener('click', buttonClickHandle, false);
    });
    // button.addEventListener('click', buttonClickHandle, false);
    let memoryUlWidth = memoryUl.offsetWidth;
    memoryLi.forEach((i, index) => {
      i.style.transform = `translateX(${memoryUlWidth * index - 80}px)`;
    });
    win.addEventListener(
      'resize',
      debound(function () {
        memoryLi.forEach((i, index) => {
          i.style.transform = `translateX(${memoryUlWidth * index}px)`;
        });
      })
    );
    //换页
    function Transclick(e) {
      let { target } = e;
      let tr = win.getComputedStyle(memoryUl, null).transform,
        filterTr = parseFloat(tr.substring(7).split(',')[4]);
      let memoryUlWidth = memoryUl.offsetWidth;
      let re = target.id === 'next' ? filterTr - memoryUlWidth : filterTr + memoryUlWidth;

      if (re <= 0 && re >= -memoryUlWidth * 4) {
        memoryUl.style.transform = `translate3d(${re}px,0,0)`;
        if (re == 0) {
          prev.style.stroke = '#EF3E16';
        } else {
          prev.style.stroke = 'var(--black)';
        }
        if (re == -memoryUlWidth * 4) {
          next.style.stroke = '#EF3E16';
        } else {
          next.style.stroke = 'var(--black)';
        }
      }
    }
    //按钮点击事件/!
    function buttonClickHandle(e) {
      let fristInputValue = fristInput.value;
      let str = `JUU4JUJGJTk5JUU0JUJBJTlCJUU4JUFGJTlEJUU0JUJBJThFMjAyMi41LjklRTUlQ
      kMlODAlRTUlQTclOEIlRTUlODYlOTklRTglQjUlQjclMjAlRTYlQjglODUlRTclODglQjElRTclOUElOD
      QlMjAlRTUlQTYlODIlRTYlOUUlOUMlRTUlOTIlOEMlRTQlQkQlQTAlRTUlOUMlQTglRTQlQjglODAlRTglQ
      jUlQjclRTUlQkYlODMlRTglQjclQjMlRTUlOEElQTAlRTklODAlOUYlRTclOUElODQlRTclOEElQjYlRTYlOD
      AlODElRTQlQjglOEQlRTQlQkMlOUElRTUlQUYlQkMlRTglODclQjQlRTYlODglOTElRTclOUElODQlRTYlOTclQjYlRTUlODUlODklRTYlQjUlODElRTklODAlOUQlRTglQkYlODclRTUlQkYlQUIlRTclOUElODQlRTglQUYlOUQlMjAlRTklODIlQTMlRTYlQUQlQTQlRTYlOTclQjYlRTglQjclOUQlRTclQTYlQkIlRTYlODglOTElRTQlQkIlQUMlRTUlOUMlQTglRTQlQjglODAlRTglQjUlQjclRTYlOTglQUY4NiVFNSVBNCVBOSVFNCVCQSU4NiUyMCVFNiU4OCU5MSVFNiU4MyVCMyVFNiVBRCVBNCVFNiU5NyVCNiVFNyU5QSU4NCVFNiU4OCU5MSVFNiU5OCVBRiVFNiU5QyU4OSVFNCVCOCU4MCVFNCVCQSU5QiVFNSVBMiVBOCVFNiVCMCVCNCVFNiU5RCVBNSVFNSU4NiU5OSVFNSU4NiU5OSVFNCVCOCU4MCVFNCVCQSU5QiVFNSU4NSVCMyVFNCVCQSU4RSVFNiU4OCU5MSVFNCVCQiVBQyVFNyU5QSU4NCVFNCVCQSU4QiVFNCVCQSU4NiUyMCVFNCVCQiU4RSVFNCVCOCU4MCVFNSVCQyU4MCVFNSVBNyU4QiVFNyVBMyU5NSVFNyVBMyU5NSVFNyVCQiU4QSVFNyVCQiU4QSVFNyU5QSU4NCVFNiU4QyU5NiVFNiU4RSU5OCVFNSU4NiU4NSVFNSVCRiU4MyVFNSVBNCU4NCVFNyU5MCU4NiVFNiU4MyU4NSVFNiU4NCU5RiVFNSU4OCVCMCVFNyU4RSVCMCVFNSU5QyVBOCUyMCVFOCVCRiU5OCVFOCVBRSVCMCVFNSVCRSU5NyVFNCVCRCVBMCVFOSU5NyVBRSVFOCVCRiU4NyVFNiU4OCU5MSVFOCVCNyU5RiVFNCVCRCVBMCVFNSU5QyVBOCVFNCVCOCU4MCVFOCVCNSVCNyVFNiU5OCVBRiVFNSU5QiVCRSVFNCVCQiU4MCVFNCVCOSU4OCVFNSU5MCU5NyUyMCVFNSVCRCU5MyVFNiU5NyVCNiVFNiU4OCU5MSVFNSU4NSVCNiVFNSVBRSU5RSVFNiU5QyU4OSVFNyU4MiVCOSVFNCVCOCU4RCVFOCVBNyVBMyUyMCVFOCVCMCU4OCVFNiU4MSU4QiVFNyU4OCVCMSVFOCVBNiU4MSVFNSU5QiVCRSVFNCVCQiU4MCVFNCVCOSU4OCVFNyU5QSU4NCVFOCVBRiU5RCVFNiU5OCVBRiVFNCVCOCU4RCVFNiU5OCVBRiVFNSVBNCVBQSVFNyU4OSVBOSVFOCVCNCVBOCVFNCVCQSU4NiUyMCVFNSU5MCU4RSVFNiU5RCVBNSVFNiU4OCU5MSVFNyU5RiVBNSVFOSU4MSU5
      MyVFNCVCQSU4NiUyMCVFNSU5QiVCRSVFNyU4MiVCOSVFNCVCQiU4MCVFNCVCOSU4OCVFNiU4OSU4RCVFNyU5RiVBNSVFOSU4MSU5MyVFOCU4NyVBQSVFNSVCNyVCMSVFNiU4MyVCMyVFOCVBNiU4MSVFNCVCQiU4MCVFNCVCOSU4OCUyMCVFNiU4OSU4RCVFNCVCQyU5QSVFNSVBRiVCOSVFNiU5QyVBQSVFNiU5RCVBNSVFNSU4NSU4NSVFNiVCQiVBMSVFNiU5QyU5RiVFNSVCRSU4NSUyMCVFNSVBRiVCOSVFNiU4NCU5RiVFNiU4MyU4NSVFNiU5QiVCNCVFNiU4NCVCRiVFNCVCQiU5OCVFNSU4NyVCQSUyMCVFNSVCRCU5MyVFNiU5NyVCNiVFNiU4OCU5MSVFNyVCQiU5RSVFNSVCMCVCRCVFOCU4NCU5MSVFNiVCMSU4MSVFNiU4MyVCMyVFNCVCOCU4MCVFNSU4OCU4NyVFNSU4NSVCMyVFNCVCQSU4RSVFNCVCRCVBMCVFNyU5QSU4NCVFNCVCQyU5OCVFNyU4MiVCOSUyMCVFNSU4RiVBRiVFNCVCRCVBMCVFNyU5QSU4NCVFNCVCQyU5OCVFNyU4MiVCOSVFNSVCQSU5NCVFOCVBRiVBNSVFNiU5OCVBRiVFNSVCRCU5MiVFNCVCQSU4RSVFNiU4OCU5MSVFNSU5NiU5QyVFNiVBQyVBMiVFNyU5QSU4NCUyMCVFOCU4MCU4QyVFNCVCOCU4RCVFNiU5OCVBRiVFNiU4OCU5MSVFNSU5QiVCRSVFNyU5QSU4NCUyMCVFNSU5MCU4RSVFOSU5RCVBMiVFNiU4OCU5MSVFNSU4RiU5MSVFNyU4RSVCMCVFNiU5OCVBRiVFNiU4OCU5MSVFNiU5MCU5RSVFOSU5NCU5OSVFNCVCQSU4NiUyMCVFNiU4OCU5MSVFNiU4OSU4MCVFNSU5QiVCRSVFNyU5QSU4NCVFNSU4NSVCNiVFNSVBRSU5RSVFNSVCMCVCMSVFNiU5OCVBRiVFNSU4OCU5QSVFNSVCQyU4MCVFNSVBNyU4QiVFNiU4MyVCMyVFNSU5MiU4QyVFNCVCRCVBMCVFNSU5QyVBOCVFNCVCOCU4MCVFOCVCNSVCNyVFNyU5QSU4NCVFNiU4MyVCMyVFNiVCMyU5NSUyMCVFNiU4OCU5MSVFNSU5QiVCRSVFNSU5MiU4QyVFNCVCRCVBMCVFNSU5QyVBOCVFNCVCOCU4MCVFOCVCNSVCNyVFNyU5QSU4NCVFNiU5NyVBNSVFNSVCOCVCOCVFNyVBOCVCMyVFNSVBRSU5QSVFNCVCOCU5NCVFNiU5QyU4OSVFOCVCNiVBMyUyMCVFNiU4OCU5MSVFNCVCOSU5RiVFNSU5NiU5QyVFNiVBQyVBMiVFNCVCRCVBMCVFOSU4MiVBMyVFNiU5QyU4OSVFOCVCNiVBMyVFNyU5QSU4NCVF
      NyU4MSVCNSVFOSVBRCU4MiVFOCVCRiU5OCVFNiU5QyU4OSVFNyU5QSVBRSVFNSU5QiU4QSUyMCVFNSVCQyU4MCVFNSVBNyU4QiVFNiU4OCU5MSVFNSU4RiVBQSVFNiU5OCVBRiVFOCU4NyU4NiVFNiU4MyVCMyVFNyU5QSU4NCUyMCVFNCVCRCU4NiVFNyU4RSVCMCVFNSU5QyVBOCVFNyU5QyU4QiVFNiU5RCVBNSVFNiU4OCU5MSVFNyU5QyU4QiVFNCVCQSVCQSVFNiVCMCVCNCVFNSVCOSVCMyVFOCVCRiU5OCVFNCVCOCU4RCVFOSU5NCU5OSVFNSU5MyVBNiUyMCVFNSU5QyVBOCVFNCVCOCU4MCVFOCVCNSVCNyVFNCVCOSU5RiVFOCU4MyVCRCVFNiU4RiU5MCVFNSU4RCU4NyVFNiU4OCU5MSVFOCU4NyVBQSVFNSVCNyVCMSUyMCVFNCVCOSU5RiVFNCVCQyU5QSVFNSVBRiVCOSVFNiU5QyVBQSVFNiU5RCVBNSVFNiU5QiVCNCVFNSU4QSVBMCVFNiU5QyU5RiVFNSVCRSU4NSUyMCVFNSU4OCVCMCVFNSU5MCU4RSVFOSU5RCVBMiVFNiU4OCU5MSVFOCVCNiU4QSVFNSU4RiU5MSVFNCVCRCVBMCVFNSVBNSVCRCVFNyU5QSU4NCVFOCU4MyVCRCVFNiU4NCU5RiVFNSU4RiU5NyVFNSU4OCVCMCVFNCVCRCVBMCVFNyU5QSU4NCVFNSVBNSVCRCUyMCVFNiU4OCU5MSVFNSU5NiU5QyVFNiVBQyVBMiVFNCVCRCVBMCUyMCVFNSU5NiU5QyVFNiVBQyVBMiVFNCVCRCVBMCVFNyU5QSU4NCVFNyU5QyVCQyVFNyU5RCU5QiUyMCVFNSU5OCVCNCVFNSVCNyVCNCUyMCVFNSU5MSVCMyVFOSU4MSU5MyUyMCVFNiU4OCU5MSVFNSU5NiU5QyVFNiVBQyVBMiVFNCVCRCVBMCUyMCVFNSU5NiU5QyVFNiVBQyVBMiVFNCVCRCVBMDElRTYlOUMlODgxOSVFNiU5NyVBNSVFNSU4RiU5MSVFNyU5QSU4NCVFNSU4MiVCQiVFNyU5MyU5QyVFOCVBRiVBRCVFOSU5RiVCMyUyMCVFNSU5NiU5QyVFNiVBQyVBMiVFNCVCRCVBMCVFNSU4RiU5MSVFNyU4NSVBNyVFNyU4OSU4NyVFNyVBRCU4OSVFNiU4OCU5MSVFNSVBNCVCOCVFNyU5QSU4NCVFNiVBMCVCNyVFNSVBRCU5MCUyMCVFNSU5NiU5QyVFNiVBQyVBMiVFNCVCRCVBMCVFNSU4MSU5QSVFNSU4NyVCQSVFNiU4NCU4RiVFNSU5MSVCMyVFNiVCNyVCMSVFOSU5NSVCRiVFNyU5QSU4NCVFNyU5QyVCQyVFNyVBNSU5RSVFOCVCNyU5RiVFNiU4OCU5MSVFNiU5MCU5RSVFNiU4MCVBQSVFNyU5QSU4NCVFNiVBMCVCNyVFNSVBRCU5MCUyMCVFNSU5NiU5QyVFNiVBQyVBMiVFNCVCRCVBMCVFNyVCMiU5OCVFNyU5RCU4MCVFNiU4OCU5MSVFNyU5QSU4NCVFNiVBMCVCNyVFNSVBRCU5MCUyMCVFNCVCQiVBNSVFNSU4RiU4QSUyMCVFNSVBNiU4MiVFNiU5RSU5QyVFNiU4OCU5MSVFNCVCQiVBQyVFNSU5QyVBOCVFNSVBNCU4RiVFNSVBNCU5QyVFOCVCNSU4RiVFNiU5QyU4OCVFNyU5QSU4NCVFOCVBRiU5RCUyMCVFNiU4OCU5MSVFNCVCQyU5QSVFOCVBRi
      VCNCVFNCVCQiU4QSVFNiU5OSU5QSVFNiU5QyU4OCVFOCU4OSVCMiVFNyU5QyU5RiVFNyVCRSU4RQ==`,
        ps = `cGlua2JsdWU=`;

      let str64 = str64Tostr(str);
      let btn = e.target;
      if (!fristInputValue) return;
      if (fristInputValue == str64Tostr(ps)) {
        console.log(ycwz);
        ycwz.innerHTML = `${str64}`;
        fristInput.style.display = 'none';
        btn.style.display = 'none';
        ycwz.style.display = 'block';
      } else {
        console.log(fInput);
        fristInput.value = '';
        fInput.classList.add('active');
        setTimeout(() => {
          fInput.classList.remove('active');
        }, 1000);
      }
      console.log('编码后：' + str64);
      console.log('解码后：' + str64Tostr(str64));
    }

    function strTostr64(str) {
      return window.btoa(encodeURIComponent(str));
    }

    function str64Tostr(str) {
      return decodeURIComponent(window.atob(str));
    }
  }

  function backHandle() {
    win.location.hash = '';
    let target = this.parentElement;
    main.style.display = 'flex';
    target.style.display = 'none';
  }

  //横向滚动函数
  function abeamTransfrom() {
    document.querySelectorAll('.abeamBox div').forEach(div => {
      div.addEventListener('mousemove', e => {
        let item = div;
        let itemRect = div.getBoundingClientRect();
        let offset = Math.abs(e.clientX - itemRect.left) / itemRect.width;

        let prev = item.previousElementSibling || null;
        let next = item.nextElementSibling || null;
        let scale = 0.6;

        resetScale();

        if (prev) {
          prev.style.setProperty('--scale', 1 + scale * Math.abs(offset - 1));
        }

        item.style.setProperty('--scale', 1 + scale);

        if (next) {
          next.style.setProperty('--scale', 1 + scale * offset);
        }
      });
    });
    document.querySelector('.abeamBox').addEventListener('mouseleave', e => {
      resetScale();
    });
    function resetScale() {
      document.querySelectorAll('.abeamBox div').forEach(div => {
        div.style.setProperty('--scale', 1);
      });
    }
  }

  //刷新页面
  function refreshWindow() {
    win.location.hash = '';
  }

  function debound(cb, timer = 500) {
    let t = null;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => {
        cb.apply(this, arguments);
      }, timer);
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
