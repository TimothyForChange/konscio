export {};

const decode = (b64rev: string | null | undefined): string =>
  b64rev ? atob(b64rev).split('').reverse().join('') : '';

const revealAndCopy = async (el: HTMLElement) => {
  let address = (el as HTMLElement & { dataset: DOMStringMap }).dataset.address;
  if (!address) {
    const user = decode(el.getAttribute('data-user-e'));
    const domain = decode(el.getAttribute('data-domain-e'));
    if (!user || !domain) {
      return;
    }
    address = `${user}@${domain}`;
  }

  if (
    (el as HTMLElement & { dataset: DOMStringMap }).dataset.emailReady !==
    'true'
  ) {
    const desc = el.querySelector('.link-description');
    if (desc && (desc.hasAttribute('data-placeholder') || !desc.textContent)) {
      desc.textContent = address;
      desc.removeAttribute('data-placeholder');
    }
    el.setAttribute('aria-label', `Copy email address ${address}`);
    (el as HTMLElement & { dataset: DOMStringMap }).dataset.emailReady = 'true';
    (el as HTMLElement & { dataset: DOMStringMap }).dataset.state = 'revealed';
    (el as HTMLElement & { dataset: DOMStringMap }).dataset.address = address;
  }

  const feedback = el.parentElement?.querySelector('.email-feedback');
  const clearFeedback = (text: string) =>
    setTimeout(() => {
      if (feedback?.textContent === text) {
        if (feedback instanceof HTMLElement) feedback.textContent = '';
      }
    }, 1000);

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(address);
    if (feedback) {
      feedback.textContent = 'Email copied to clipboard';
      clearFeedback('Email copied to clipboard');
    }
    (el as HTMLElement & { dataset: DOMStringMap }).dataset.copied = 'true';
    setTimeout(
      () =>
        ((el as HTMLElement & { dataset: DOMStringMap }).dataset.copied =
          'idle'),
      1000
    );
    return;
  }

  if (feedback) {
    feedback.textContent = 'Press Ctrl+C to copy';
    clearFeedback('Press Ctrl+C to copy');
  }
};

const setup = () => {
  if ((window as any).__emailButtonInit) {
    return;
  }
  (window as any).__emailButtonInit = true;

  document
    .querySelectorAll('.email-link[data-user-e][data-domain-e]')
    .forEach((node) => {
      const el = node as HTMLElement;
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
