#!/bin/bash
cat << 'INNER_EOF' > src/components/Project.astro
---
import { sanitizeUrl } from "../lib/security.js";
const { row } = Astro.props;
---

<tr>
	<td class="date-col">{row.date}</td>
	<td><a href={sanitizeUrl(row.url)} target="_blank" rel="noopener noreferrer"><b>{row.title}</b></a> {row.description}</td>
</tr>
<style>
	table {
		width: 100%;
		table-layout: fixed;
	}

	td {
		padding-right: 0.5em;
		vertical-align: top;
	}

	.date-col {
		width: 15%;
	}
</style>
INNER_EOF

cat << 'INNER_EOF' > src/components/Funding.astro
---
import { sanitizeUrl } from "../lib/security.js";
const { row } = Astro.props;
---

<tr>
	<td class="date-col">{row.date}</td>
	<td><b>{row.title}</b> <a href={sanitizeUrl(row.url)} target="_blank" rel="noopener noreferrer">{row.description}</a></td>
</tr>
<style>
	table {
		width: 100%;
		table-layout: fixed;
	}

	td {
		padding-right: 0.5em;
		vertical-align: top;
	}

	.date-col {
		width: 15%;
	}
</style>
INNER_EOF
