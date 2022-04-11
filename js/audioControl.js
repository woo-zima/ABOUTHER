(function (doc) {
  let audioBtn = doc.getElementsByClassName('btn-audio')[0],
    playBtns = doc.querySelector('.play'),
    audiom = doc.getElementById('audio-m'),
    righttext = doc.getElementsByClassName('minText')[0];

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    audioBtn.addEventListener('click', handleClick, false);
  }

  function handleLoad(e) {
    let currentTime = timeFliter(audiom.currentTime),
      endTime = timeFliter(audiom.duration);
    righttext.innerText = `${currentTime}--${endTime}`;
    if (e.type == 'play') {
      renderTime = setTimeout(() => {
        handleLoad(e);
      }, 1000);
    } else {
      clearTimeout(renderTime);
      return;
    }
  }
  function timeFliter(time) {
    let restime = 0,
      floorTime = Math.floor(time);
    if (floorTime < 10) {
      restime = '00.0' + floorTime;
    } else if (floorTime <= 60) {
      restime = '00.' + floorTime;
    } else {
      let ft = floorTime % 60 < 10 ? '0' + (floorTime % 60) : floorTime % 60;
      // ft < 10 ? '0' + ft : ft;
      restime = '0' + Math.floor(floorTime / 60) + '.' + ft;
    }

    return restime;
  }

  function renderText() {
    righttext.innerText = `${audiom.duration}`;
  }

  function handleClick(e) {
    e.stopPropagation();
    if (audiom.paused) {
      playBtns.classList.toggle('active');
      audioBtn.classList.toggle('active');
      audiom.play();
      audiom.addEventListener('play', handleLoad, false);
      return;
    } else {
      playBtns.classList.toggle('active');
      audioBtn.classList.toggle('active');
      audiom.pause();
      audiom.addEventListener('pause', handleLoad, false);
    }
  }

  init();
})(document);
