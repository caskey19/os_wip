# GitHub transfer and hosting

Destination: https://github.com/caskey19/os_wip

The current app is static HTML, CSS, and JavaScript. npm run build produces dist. The workflow publishes dist rather than the repository root. Existing relative asset URLs support /os_wip/ hosting.

## Enable Pages after approving public hosting

1. Open the repository on GitHub.
2. Open Settings, then Pages.
3. Under Build and deployment, set Source to GitHub Actions.
4. Open Actions, choose Deploy BRAIN to GitHub Pages, and select Run workflow on main.
5. Wait for the deployment to succeed. Open the URL shown by the deployment. The expected default address is https://caskey19.github.io/os_wip/.
6. Later pushes to main rebuild and deploy automatically.

No purchased domain is required. For a custom domain, first purchase or use a domain you own, enter it under Settings > Pages > Custom domain, and follow GitHub's DNS instructions for your domain type. For a subdomain such as os.example.com, the CNAME target is caskey19.github.io, without /os_wip/. Enable HTTPS when GitHub makes it available. Do not guess DNS settings for an unknown domain.

## Privacy and data

Ordinary Pages hosting is public and does not carry over Sites owner-only authentication. A private source repository does not automatically make its Pages site private. The app's embedded seed records are distributed with the JavaScript. Existing browser-saved data remains at the old site's origin and will not automatically move to the GitHub Pages origin.

Pages does not run a server for Gmail OAuth or /api/v1/ingest/syllabus. Those integrations need a separate authenticated backend. Publishing the prototype does not implement them.

## Push skill

The repository includes .agents/skills/push/SKILL.md. A compatible coding assistant can discover it in this checkout. Use /push if your host exposes it, or ask the assistant to use the push skill. It is not a globally installed ChatGPT command.

Official references:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
