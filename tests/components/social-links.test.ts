import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("SocialLinks.astro", () => {
  const componentPath = join(process.cwd(), "src/components/SocialLinks.astro");
  const componentContent = readFileSync(componentPath, "utf-8");

  it("has proper TypeScript interface", () => {
    expect(componentContent).toContain("interface Props");
    expect(componentContent).toContain("size?: number;");
  });

  it("imports required dependencies", () => {
    expect(componentContent).toContain("import { config } from '../config'");
    expect(componentContent).toContain("import Icon from './Icon.astro'");
  });

  it("destructures props with defaults", () => {
    expect(componentContent).toContain("const { size = 20 } = Astro.props;");
  });

  it("does not use inline styles for icon sizing", () => {
    expect(componentContent).not.toContain("style={`--icon-size:");
    expect(componentContent).not.toContain("data-icon-size=");
  });

  it("conditionally renders GitHub link", () => {
    expect(componentContent).toContain("config.social.github && (");
    expect(componentContent).toContain("href={config.social.github}");
    expect(componentContent).toContain("aria-label='GitHub'");
    expect(componentContent).toContain("name='github-fill'");
  });

  it("conditionally renders Instagram link", () => {
    expect(componentContent).toContain("config.social.instagram && (");
    expect(componentContent).toContain("href={config.social.instagram}");
    expect(componentContent).toContain("aria-label='Instagram'");
    expect(componentContent).toContain("name='instagram-fill'");
  });

  it("conditionally renders Threads link", () => {
    expect(componentContent).toContain("config.social.threads && (");
    expect(componentContent).toContain("href={config.social.threads}");
    expect(componentContent).toContain("aria-label='Threads'");
    expect(componentContent).toContain("name='threads-fill'");
  });

  it("conditionally renders email link", () => {
    expect(componentContent).toContain("config.social.email && (");
    expect(componentContent).toContain(
      "href={`mailto:${config.social.email}`}"
    );
    expect(componentContent).toContain("aria-label='Email'");
    expect(componentContent).toContain("name='mail-fill'");
  });

  it("includes proper link attributes", () => {
    expect(componentContent).toContain("target='_blank'");
    expect(componentContent).toContain("rel='noopener noreferrer'");
    expect(componentContent).toContain("class='social-link'");
    expect(componentContent).toContain("<Icon name=");
    expect(componentContent).toContain("size={size}");
    expect(componentContent).toContain("class='social-icon'");
  });

  it("includes proper CSS classes and styles", () => {
    expect(componentContent).toContain(".social-links");
    expect(componentContent).toContain("display: flex;");
    expect(componentContent).toContain("gap: calc(var(--grid-unit) * 1.5);");
    expect(componentContent).toContain("align-items: center;");
    expect(componentContent).toContain(".social-link");
    expect(componentContent).toContain("width: 40px;");
    expect(componentContent).toContain("height: 40px;");
    expect(componentContent).toContain(
      "background-color: var(--color-text-primary);"
    );
    expect(componentContent).toContain("color: var(--color-background);");
    expect(componentContent).toContain("border-radius: 4px;");
    expect(componentContent).toContain("transition: all 0.2s ease;");
  });

  it("includes hover and focus styles", () => {
    expect(componentContent).toContain(".social-link:hover");
    expect(componentContent).toContain(".social-link:focus");
    expect(componentContent).toContain(
      "background-color: var(--color-accent);"
    );
    expect(componentContent).toContain("transform: translateY(-2px);");
    expect(componentContent).toContain("text-decoration: none;");
  });

  it("includes icon size styling", () => {
    expect(componentContent).toContain(".social-link svg");
    expect(componentContent).toContain("width: 1em;");
    expect(componentContent).toContain("height: 1em;");
  });
});
