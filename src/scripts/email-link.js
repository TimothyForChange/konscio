const PLACEHOLDER_REGEX = /(reveal|copy)/i;

const decode = (b64rev) => {
  if (!b64rev) {
    return '';
  }

  const decoded = atob(b64rev);
  return decoded.split('').reverse().join('');
};

const clearFeedback = (feedback, expectedText, delay = 2000) => {
  setTimeout(() => {
    if (feedback && feedback.textContent === expectedText) {
      feedback.textContent = '';
    }
  }, delay);
};

const revealAndCopy = async (anchor) => {
  const already = anchor.dataset.emailReady === 'true';
  const user = decode(anchor.getAttribute('data-user-e'));
  const domain = decode(anchor.getAttribute('data-domain-e'));
  if (!user || !domain) {
    return;
  }
  const address = `${user}@${domain}`;

  if (!already) {
    const desc = anchor.querySelector('.link-description');
    if (desc && PLACEHOLDER_REGEX.test(desc.textContent || '')) {
      desc.textContent = address;
    } else if (desc && !desc.textContent) {
      desc.textContent = address;
    }
    anchor.setAttribute('aria-label', `Copied email ${address}`);
    anchor.dataset.emailReady = 'true';
    anchor.dataset.state = 'revealed';
  }

  const feedback =
    anchor.parentElement &&
    anchor.parentElement.querySelector('.email-feedback');
  try {
    await navigator.clipboard.writeText(address);
    if (feedback) {
      feedback.textContent = 'Email copied to clipboard';
      clearFeedback(feedback, 'Email copied to clipboard', 2000);
    }
    anchor.dataset.copied = 'true';
    setTimeout(() => {
      anchor.dataset.copied = 'idle';
    }, 2000);
  } catch {
    if (feedback) {
      feedback.textContent = 'Press Ctrl+C to copy';
      setTimeout(() => {
        if (feedback && /Ctrl\+C/.test(feedback.textContent || '')) {
          feedback.textContent = '';
        }
      }, 3000);
    }
  }
};

const setup = () => {
  const w = window;
  if (w.__emailLinkInit) {
    return;
  }
  w.__emailLinkInit = true;

  const anchors = Array.from(
    document.querySelectorAll('a.email-link[data-user-e][data-domain-e]')
  );
  if (!anchors.length) {
    return;
  }

  anchors.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      revealAndCopy(a);
    });
    a.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        revealAndCopy(a);
      }
    });
    a.addEventListener(
      'focus',
      () => {
        if (a.dataset.emailReady !== 'true') {
          revealAndCopy(a);
        }
      },
      { once: true }
    );
  });
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
