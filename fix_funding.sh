#!/bin/bash
sed -i '4d' src/components/Funding.astro
sed -i 's/const { row } = Astro.props;/const { row } = Astro.props;\n---/' src/components/Funding.astro
