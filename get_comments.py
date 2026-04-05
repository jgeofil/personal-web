import urllib.request
import json
import os

url = "https://api.github.com/repos/jgeofil/personal-web/pulls/120/comments"
headers = {
    "Accept": "application/vnd.github.v3+json",
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        for c in data:
            print(f"ID: {c.get('id')}")
            print(f"Path: {c.get('path')}")
            print(f"Line: {c.get('line')}")
            print(f"Diff: {c.get('diff_hunk')}")
            print(f"Body: {c.get('body')}")
            print("-" * 40)
except Exception as e:
    print(f"Error: {e}")
