import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('Sidebar.astro', () => {
  it('contains RecentPosts and Categories components', () => {
    const componentPath = join(process.cwd(), 'src/components/Sidebar.astro');
    const componentContent = readFileSync(componentPath, 'utf-8');

    expect(componentContent).toContain('<RecentPosts />');
    expect(componentContent).toContain('<Categories />');
    expect(componentContent).toContain("class='sidebar-content'");
  });

  it('has proper styling', () => {
    const componentPath = join(process.cwd(), 'src/components/Sidebar.astro');
    const componentContent = readFileSync(componentPath, 'utf-8');

    expect(componentContent).toContain('.sidebar-content');
    expect(componentContent).toContain('display: flex');
    expect(componentContent).toContain('flex-direction: column');
    expect(componentContent).toContain('gap: calc(var(--grid-unit) * 4)');
  });
});
