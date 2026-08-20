# Security Policy

## Project Status

OpenAPI Studio is currently in early development.

Security is treated as a core engineering concern, but the project is not yet considered production-ready.

Security-related behavior may change as the architecture and feature set evolve.

## Supported Versions

At this stage of development, only the latest version of the `main` branch is considered supported for security fixes.

Once OpenAPI Studio begins publishing releases, this section will be updated to describe the supported release versions.

## Reporting a Vulnerability

Please do not publicly disclose a suspected security vulnerability in a GitHub issue.

Instead, report security issues privately to the project maintainers through the security reporting mechanism configured for the repository.

The preferred mechanism will be GitHub's private security advisory/reporting functionality once the repository is published.

If private reporting is not yet available, open-source contributors should contact the project maintainers privately before publicly disclosing sensitive details.

## What to Include

A useful security report should contain, when possible:

- A clear description of the vulnerability.
- The affected component or feature.
- Steps to reproduce the issue.
- The expected behavior.
- The actual behavior.
- Potential security impact.
- A minimal proof of concept when it is safe to provide one.
- Relevant environment or version information.

Please avoid including real credentials, API keys, access tokens, personal information, or other sensitive data in a report.

Use sanitized examples instead.

## Sensitive Information

Never commit or publicly disclose:

- API keys.
- Access tokens.
- Passwords.
- Private credentials.
- Production secrets.
- Private environment configuration.
- Personally identifiable information that is not necessary for reproducing an issue.

If sensitive information has accidentally been committed, report the incident privately so that the appropriate remediation can be considered.

## Security Considerations for Contributions

Contributors should consider security implications when modifying the project.

Particular care is required for features involving:

- API credentials.
- Environment variables.
- Imported collections.
- External URLs.
- Request execution.
- Response rendering.
- HTML or other potentially executable content.
- Local browser storage.
- Expression or script execution.
- Proxy functionality.

Features that can cause the application to make requests to arbitrary destinations require additional security review.

If a backend proxy is introduced in the future, SSRF protections must be considered before implementation.

## Dependency Security

New dependencies should be evaluated for:

- Maintenance status.
- Known vulnerabilities.
- Dependency size.
- Security implications.
- Whether the dependency is actually necessary.

Contributors should not introduce a dependency solely for convenience when an appropriate existing capability is sufficient.

## Disclosure

Security reports will be reviewed by the project maintainers.

After a vulnerability has been investigated and an appropriate fix is available, the maintainers may publish a security advisory or other disclosure appropriate to the circumstances.

The timing and contents of public disclosure may depend on the severity of the issue, the availability of a fix, and the potential impact on users.

## Scope

Security reports should concern vulnerabilities in OpenAPI Studio itself, its official code, or project infrastructure under the maintainers' control.

Third-party services, dependencies, or infrastructure should generally be reported to their respective maintainers when the issue does not originate in OpenAPI Studio.

## Responsible Disclosure

Please allow the maintainers reasonable time to investigate and address a privately reported vulnerability before publicly disclosing it.

We appreciate responsible security research and good-faith reports that help improve OpenAPI Studio.
