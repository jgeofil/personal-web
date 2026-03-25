#!/bin/bash
cat << 'INNER_EOF' > src/components/LinkGrid.astro
---
import { sanitizeUrl } from "../lib/security.js";
const { items } = Astro.props;
---

<ul class="list-grid">
	{items.map((item, index) => (
		<li><!-- Optimize: lazy loading images improves LCP -->
			<img src={`https://cdn.simpleicons.org/${item.icon}/${item.color}`} alt="" aria-hidden="true" loading="lazy" /><a href={sanitizeUrl(item.url)} target="_blank" rel="noopener noreferrer">{item.title}</a></li>
	))}
</ul>
<style>
	ul {
		list-style: none;
	}
	li {
		font-size: 0.9em;
	}
	.list-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));

		padding: 0;
	}

	img {
		width: 16px;
		height: 16px;
		margin-right: 0.5em;
	}
</style>
INNER_EOF

cat << 'INNER_EOF' > src/components/SocialGrid.astro
---
import { sanitizeUrl } from "../lib/security.js";
const { items } = Astro.props;
---

<ul class="list-grid">
	{items.map((item, index) => (
		<li><a href={sanitizeUrl(item.url)} target="_blank" rel="noopener noreferrer" aria-label={item.title}><!-- Optimize: lazy loading images improves LCP -->
			<img src={item.icon_url ? item.icon_url : `https://cdn.simpleicons.org/${item.icon}/${item.color}`} alt="" aria-hidden="true" loading="lazy" /></a></li>
	))}
</ul>
<style>
	ul {
		list-style: none;

	}
	li {
		font-size: 0.9em;
	}
	.list-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		padding: 50px 0 0 0;
	}

	img {
		width: 48px;
		height: 48px;

	}
</style>
INNER_EOF
