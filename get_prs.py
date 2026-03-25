import urllib.request
import json
import os

url = "https://api.github.com/repos/jgeofil/personal-web/pulls?state=open&per_page=100"
headers = {
    "Accept": "application/vnd.github.v3+json",
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        prs = []
        for pr in data:
            title = pr.get("title", "")
            user = pr.get("user", {}).get("login", "")
            pr_number = pr.get("number")
            body = pr.get("body", "")
            prs.append({
                "number": pr_number,
                "title": title,
                "user": user,
                "body": body,
                "branch": pr.get("head", {}).get("ref", "")
            })

        with open("prs.json", "w") as f:
            json.dump(prs, f, indent=2)
        print(f"Saved {len(prs)} PRs to prs.json")
except Exception as e:
    print(f"Error: {e}")
