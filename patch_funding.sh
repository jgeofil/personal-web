#!/bin/bash
sed -i 's/---/---\nimport { sanitizeUrl } from "..\/lib\/security.js";/1' src/components/Funding.astro
sed -i 's/<a href={row.url}>/<a href={sanitizeUrl(row.url)} target="_blank" rel="noopener noreferrer">/g' src/components/Funding.astro
