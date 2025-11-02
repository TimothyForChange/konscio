import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('Icon.astro', () => {
  const componentPath = join(process.cwd(), 'src/components/Icon.astro');
  const componentContent = readFileSync(componentPath, 'utf-8');

  it('has proper TypeScript interface', () => {
    expect(componentContent).toContain('export interface Props');
    expect(componentContent).toContain('name: string;');
    expect(componentContent).toContain('size?: number;');
    expect(componentContent).toContain('class?: string;');
  });

  it('destructures props with defaults', () => {
    expect(componentContent).toContain(
      "const { name, size = 20, class: className = '' } = Astro.props;"
    );
  });

  it('renders icon element with proper attributes', () => {
    expect(componentContent).toContain('<i');
    expect(componentContent).toContain('class={`ri-${name}');
    expect(componentContent).toContain('.trim()');
    expect(componentContent).toContain('icon--20');
    expect(componentContent).toContain("aria-hidden='true'");
    expect(componentContent).toContain('</i>');
  });

  it('handles empty className properly', () => {
    expect(componentContent).toContain('${className}');
  });

  it('uses default size of 20px', () => {
    expect(componentContent).toContain('size = 20');
  });

  it('uses default empty className', () => {
    expect(componentContent).toContain("class: className = ''");
  });

  it('requires name prop', () => {
    expect(componentContent).toContain('name: string;');
  });

  it('makes size and class optional', () => {
    expect(componentContent).toContain('size?: number;');
    expect(componentContent).toContain('class?: string;');
  });
});
