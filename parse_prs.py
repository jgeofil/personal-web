import json

with open("prs.json", "r") as f:
    prs = json.load(f)

print(f"Total PRs: {len(prs)}")

# Let's count PRs by type
bolt_prs = []
palette_prs = []
sentinel_prs = []

for pr in prs:
    if "bolt" in title:
        bolt_prs.append(pr)
    elif "palette" in title:
        palette_prs.append(pr)
    elif "sentinel" in title:
        sentinel_prs.append(pr)

print(f"Bolt PRs: {len(bolt_prs)}")
print(f"Palette PRs: {len(palette_prs)}")
print(f"Sentinel PRs: {len(sentinel_prs)}")

def print_pr_info(prs, name):
    print(f"\n--- {name} PRs ---")
    for pr in prs:
        print(f"#{pr['number']}: {pr['title']}")

print_pr_info(bolt_prs, "Bolt")
print_pr_info(palette_prs, "Palette")
print_pr_info(sentinel_prs, "Sentinel")
