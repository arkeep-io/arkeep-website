// Sätteri hast plugin: external links in Markdown/MDX content open in a new tab.
export const externalLinks = {
  name: 'arkeep-external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = String(node.properties?.href ?? '');
      if (!/^https?:\/\//.test(href)) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', 'noopener noreferrer');
    },
  },
};
