const PLACEHOLDER_REGEX = /(reveal|copy)/i;

const decode = (b64rev: string | null) => {
  if (!b64rev) {
    return '';
  }
  try {
    const decoded = atob(b64rev);
    return decoded.split('').reverse().join('');
  } catch {
    return '';
  }
};

async function revealAndCopy(anchor: HTMLAnchorElement) {
  const already = anchor.dataset.emailReady === 'true';
  const user = decode(anchor.getAttribute('data-user-e'));
  const domain = decode(anchor.getAttribute('data-domain-e'));
  if (!user || !domain) {
    return;
  }
  const address = `${user}@${domain}`;

  if (!already) {
    const desc = anchor.querySelector<HTMLElement>('.link-description');
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
    anchor.parentElement?.querySelector<HTMLElement>('.email-feedback');
  try {
    await navigator.clipboard.writeText(address);
    if (feedback) {
      feedback.textContent = 'Email copied to clipboard';
    }
    anchor.dataset.copied = 'true';
    setTimeout(() => {
      if (feedback && feedback.textContent === 'Email copied to clipboard')
        feedback.textContent = '';
      anchor.dataset.copied = 'idle';
    }, 2000);
  } catch {
    if (feedback) {
      feedback.textContent = 'Press Ctrl+C to copy';
    }
    setTimeout(() => {
      if (feedback && /Ctrl\+C/.test(feedback.textContent || '')) {
        feedback.textContent = '';
      }
    }, 3000);
  }
}

function setup() {
  const w = window as any;
  if (w.__emailLinkInit) {
    return;
  }
  w.__emailLinkInit = true;

  const anchors = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(
      'a.email-link[data-user-e][data-domain-e]'
    )
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
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
