const PLACEHOLDER_ATTR = 'placeholder';

const decode = (b64rev) => {
  if (!b64rev) {
    return '';
  }

  const decoded = atob(b64rev);
  return decoded.split('').reverse().join('');
};

const clearFeedback = (feedback, expectedText, delay = 1000) => {
  setTimeout(() => {
    if (feedback && feedback.textContent === expectedText) {
      feedback.textContent = '';
    }
  }, delay);
};

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

  const already = el.dataset.emailReady === 'true';
  if (!already) {
    const desc = el.querySelector('.link-description');
    if (desc) {
      const isPlaceholder = desc.hasAttribute(`data-${PLACEHOLDER_ATTR}`);
      if (isPlaceholder || !desc.textContent) {
        desc.textContent = address;
        desc.removeAttribute(`data-${PLACEHOLDER_ATTR}`);
      }
    }
    el.setAttribute('aria-label', `Copy email address ${address}`);
    el.dataset.emailReady = 'true';
    el.dataset.state = 'revealed';
    el.dataset.address = address;
  }

  const feedback =
    el.parentElement && el.parentElement.querySelector('.email-feedback');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(address);
    if (feedback) {
      feedback.textContent = 'Email copied to clipboard';
      clearFeedback(feedback, 'Email copied to clipboard', 1000);
    }
    el.dataset.copied = 'true';
    setTimeout(() => {
      el.dataset.copied = 'idle';
    }, 1000);
    return;
  }

  if (feedback) {
    feedback.textContent = 'Press Ctrl+C to copy';
    setTimeout(() => {
      if (feedback && /Ctrl\+C/.test(feedback.textContent || '')) {
        feedback.textContent = '';
      }
    }, 1000);
  }
};

const setup = () => {
  const w = window;
  if (w.__emailButtonInit) {
    return;
  }
  w.__emailButtonInit = true;

  const controls = Array.from(
    document.querySelectorAll('.email-link[data-user-e][data-domain-e]')
  );
  if (!controls.length) {
    return;
  }

  controls.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      revealAndCopy(el);
    });
  });
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
