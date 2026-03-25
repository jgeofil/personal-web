import subprocess
import json

with open("prs.json", "r") as f:
    prs = json.load(f)

# Branches to delete
branches_to_delete = set()
for pr in prs:
    title = pr["title"].lower()
    if "bolt:" in title or "palette:" in title or "sentinel:" in title or "[bolt]" in title or "[palette]" in title or "[sentinel]" in title:
        branch = pr.get("branch")
        if branch:
            branches_to_delete.add(branch)

# Also find all remote branches that look like agent branches
try:
    output = subprocess.check_output(["git", "branch", "-r"], text=True)
    for line in output.splitlines():
        line = line.strip()
        if "origin/bolt" in line or "origin/palette" in line or "origin/sentinel" in line:
            branch_name = line.replace("origin/", "")
            if not "HEAD" in branch_name:
                branches_to_delete.add(branch_name)
except Exception as e:
    print(f"Error getting remote branches: {e}")

print(f"Found {len(branches_to_delete)} branches to delete.")

# Create a shell script to delete them
with open("delete_branches.sh", "w") as f:
    f.write("#!/bin/bash\n")
    for branch in branches_to_delete:
        # Avoid deleting main or other core branches
        if branch not in ["main", "master"]:
            f.write(f"git push origin --delete {branch} || true\n")

print("Created delete_branches.sh")
