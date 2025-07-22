(() => {
  const mainContent = document.getElementById('container');
  const pageWrapper = document.querySelector('.page-wrapper');
  const shadow = document.getElementById('shadow');
  const shadowButton = document.getElementById('shadow-button');

  if (shadowButton) {
    shadowButton.addEventListener('click', () => {
      if (shadow.style.position === 'absolute') {
        shadow.style.position = 'relative';
        pageWrapper.style.overflow = 'auto';
        mainContent.style.overflow = 'visible';
        shadowButton.children[0].textContent = 'Show Less';
      } else {
        shadow.style.position = 'absolute';
        mainContent.style.overflow = 'hidden';
        pageWrapper.scroll(0, 0);
        shadowButton.children[0].textContent = 'Explore More';
      }
    });
  }

  const list = document.getElementById('list');
  if (list && shadow && pageWrapper) {
    const observerList = list.getBoundingClientRect();
    if (observerList.bottom < window.innerHeight) {
      shadow.style.display = 'none';
      pageWrapper.style.overflow = 'auto';
    }
  }
})();
