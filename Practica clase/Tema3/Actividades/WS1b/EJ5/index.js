const oneTwoThreeRotate = () => {
    Array.prototype.slice.call(document.querySelectorAll('div, p, span, img, a, body')).map(tag => {
      tag.style.transform = `rotate(${Math.floor(Math.random() * 3) - 1}deg)`;
    });
  };