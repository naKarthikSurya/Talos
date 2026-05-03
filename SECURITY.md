# Security Policy

## Supported Versions

Security fixes are applied to the latest version on the `main` branch.

## Reporting a Vulnerability

Please do not open a public issue for security vulnerabilities.

Report suspected vulnerabilities privately to the maintainer.

Include:

- Affected file or feature
- Steps to reproduce
- Impact
- Suggested fix, if available

## Secret Handling

Never commit:

- `.env` files
- API keys
- access tokens
- private keys
- cloud credentials
- service account JSON files
- production configuration files

If a secret is committed accidentally:

1. Revoke or rotate the secret immediately.
2. Remove it from the repository.
3. Check whether the secret exists in Git history.
4. Create a security fix PR.
