
function myPlugin({ swiper, extendParams, on }) {
  extendParams({
    debugger: false,
  });

  on('init', () => {
    if (!swiper.params.debugger) return;
    console.log('init');
  });
  on('click', (swiper, e) => {
    if (!swiper.params.debugger) return;
    console.log('click');
  });
  on('tap', (swiper, e) => {
    if (!swiper.params.debugger) return;
    console.log('tap');
  });
  on('doubleTap', (swiper, e) => {
    if (!swiper.params.debugger) return;
    console.log('doubleTap');
  });
  on('sliderMove', (swiper, e) => {
    if (!swiper.params.debugger) return;
    console.log('sliderMove');
  });
  on('slideChange', () => {
    if (!swiper.params.debugger) return;
    console.log(
      'slideChange',
      swiper.previousIndex,
      '->',
      swiper.activeIndex
    );
  });
  on('slideChangeTransitionStart', () => {
    if (!swiper.params.debugger) return;
    console.log('slideChangeTransitionStart');
  });
  on('slideChangeTransitionEnd', () => {
    if (!swiper.params.debugger) return;
    console.log('slideChangeTransitionEnd');
  });
  on('transitionStart', () => {
    if (!swiper.params.debugger) return;
    console.log('transitionStart');
  });
  on('transitionEnd', () => {
    if (!swiper.params.debugger) return;
    console.log('transitionEnd');
  });
  on('fromEdge', () => {
    if (!swiper.params.debugger) return;
    console.log('fromEdge');
  });
  on('reachBeginning', () => {
    if (!swiper.params.debugger) return;
    console.log('reachBeginning');
  });
  on('reachEnd', () => {
    if (!swiper.params.debugger) return;
    console.log('reachEnd');
  });
};

var swiper = new Swiper('.swiper', {
  // Install Plugin To Swiper
  modules: [myPlugin],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // Enable debugger
  debugger: true,
});



////////////////////////////////////////////////////////////////////////////////////////

const navigatorActive = (counter, navigators) => {
  for (let i = 0; i < navigators.length; i++) {
    if (counter > navigators.length) counter = 1;
    if (counter < 1) counter = navigators.length;

    if (navigators[i].id === "slider_img_" + counter) {
      navigators[i].classList.add("navigatorChildActive");
    } else {
      navigators[i].classList.remove("navigatorChildActive");
    }
  }
};

window.onload = () => {
  const slider = document.querySelector(".sliderSlider");
  let sliderImages = document.querySelectorAll(".sliderImg");

  const prevBtn = document.querySelector(".prevBtn");
  const nextBtn = document.querySelector(".nextBtn");

  const navigator = document.querySelector(".navigator");
  //navigator
  for (let i = 0; i < sliderImages.length; i++) {
    const navigatorChild = document.createElement("div");
    navigatorChild.classList.add("navigatorChild");
    navigatorChild.id = "slider_img_" + (i + 1);
    navigator.appendChild(navigatorChild);
  }
  const navigators = document.querySelectorAll(".navigatorChild");
  navigators[0].classList.add("navigatorChildActive");

  //first node clone
  const firstNodeClone = sliderImages[0].cloneNode(true);
  firstNodeClone.id = "firstClone";
  slider.appendChild(firstNodeClone);

  //last node clone
  const lastNodeClone = sliderImages[sliderImages.length - 1].cloneNode(true);
  lastNodeClone.id = "lastClone";
  slider.prepend(lastNodeClone);

  sliderImages = document.querySelectorAll(".sliderImg");

  let counter = 1;

  let ImageWidth = sliderImages[0].clientWidth;
  slider.style.transform = `translateX(${-counter * ImageWidth}px)`;

  nextBtn.addEventListener("click", () => {
    if (counter >= sliderImages.length - 1) return null;
    slider.style.transition = "all 0.3s ease-in-out";
    counter++;
    slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    navigatorActive(counter, navigators);
  });

  prevBtn.addEventListener("click", () => {
    if (counter <= 0) return null;
    slider.style.transition = "all 0.3s ease-in-out";
    counter--;
    slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    navigatorActive(counter, navigators);
  });

  slider.addEventListener("transitionend", () => {
    if (sliderImages[counter].id === "lastClone") {
      slider.style.transition = "none";
      counter = sliderImages.length - 2;
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    }

    if (sliderImages[counter].id === "firstClone") {
      slider.style.transition = "none";
      counter = sliderImages.length - counter;
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    }
  });

  navigators.forEach((el, i) => {
    el.addEventListener("click", () => {
      counter = i + 1;
      slider.style.transition = "all 0.3s ease-in-out";
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
      navigatorActive(counter, navigators);
    });
  });

  //resize handler
  window.onresize = () => {
    ImageWidth = sliderImages[0].offsetWidth;
    slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
  };
};