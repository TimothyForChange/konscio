const decode = (b64rev) =>
  b64rev ? atob(b64rev).split('').reverse().join('') : '';

const revealAndCopy = async (el) => {
  let address = el.dataset.address;
  if (!address) {
    const user = decode(el.getAttribute('data-user-e'));
    const domain = decode(el.getAttribute('data-domain-e'));
    if (!user || !domain) {
      return;
    }
    address = `${user}@${domain}`;
  }

  if (el.dataset.emailReady !== 'true') {
    const desc = el.querySelector('.link-description');
    if (desc && (desc.hasAttribute('data-placeholder') || !desc.textContent)) {
      desc.textContent = address;
      desc.removeAttribute('data-placeholder');
    }
    el.setAttribute('aria-label', `Copy email address ${address}`);
    el.dataset.emailReady = 'true';
    el.dataset.state = 'revealed';
    el.dataset.address = address;
  }

  const feedback = el.parentElement?.querySelector('.email-feedback');
  const clearFeedback = (text) =>
    setTimeout(() => {
      if (feedback?.textContent === text) {
        feedback.textContent = '';
      }
    }, 1000);

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(address);
    if (feedback) {
      feedback.textContent = 'Email copied to clipboard';
      clearFeedback('Email copied to clipboard');
    }
    el.dataset.copied = 'true';
    setTimeout(() => (el.dataset.copied = 'idle'), 1000);
    return;
  }

  if (feedback) {
    feedback.textContent = 'Press Ctrl+C to copy';
    clearFeedback('Press Ctrl+C to copy');
  }
};

const setup = () => {
  if (window.__emailButtonInit) {
    return;
  }
  window.__emailButtonInit = true;

  document
    .querySelectorAll('.email-link[data-user-e][data-domain-e]')
    .forEach((el) =>
      el.addEventListener('click', (e) => {
        e.preventDefault();
        revealAndCopy(el);
      })
    );
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
