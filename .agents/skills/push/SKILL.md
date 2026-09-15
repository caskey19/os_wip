---
name: push
description: Sync the latest reviewed BRAIN OS work to caskey19/os_wip when the user requests /push or asks to push the OS.
---

# Push BRAIN OS

Target repository: https://github.com/caskey19/os_wip.git
Target branch: main.

1. Locate the current BRAIN checkout. Read its instructions, git status, remotes, and diff. Do not use an old checkout merely because its path is remembered.
2. Fetch the target branch and compare histories. If work also exists in the Sites repository identified by .openai/hosting.json, compare its latest source and integrate relevant updates. Preserve unrelated work. Never force push or reset user changes.
3. Review changes for credentials, private mail, calendar exports, and personal records. Do not commit secrets or browser storage. Confirm visibility if it conflicts with the user's existing privacy instructions.
4. Run the project's build and relevant checks. Review all files to be staged, then stage only the intended source, docs, configuration, and required build outputs. Commit with a concise description of the actual changes.
5. Push to caskey19/os_wip main using configured GitHub authentication. If shell authentication is unavailable, use the GitHub connector's Git object APIs, preserving the current remote parent and unrelated tree entries. Respect branch protections and use a PR if required. Never bypass an approval or authentication failure.
6. Verify the remote commit and report its URL. If Pages is enabled, check the deployment before claiming the website updated. If there are no changes, report that the repository is current.

The command authorizes a sync of current work, not recurring unattended activity. Do not change repository visibility or enable public hosting without authorization. Host-specific skill discovery determines whether /push is offered in the command menu; this file does not install a global ChatGPT slash command.
