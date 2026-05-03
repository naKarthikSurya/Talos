---
name: auth-security-hardening
description: >
  Implements and audits authentication flows (JWT, OAuth2, refresh tokens) and authorization
  (RBAC, resource ownership). Applies OWASP Top 10 mitigations including input validation,
  output encoding, rate limiting, and secure session management.
---

# Auth & Security Hardening Skill

## Goal

Ensure authentication is cryptographically correct, authorization is enforced at every
layer, and the application is protected against the OWASP Top 10 attack categories.

## When to Use

- A new auth flow (registration, login, token refresh, OAuth) is being implemented.
- A protected route or resource needs authorization checks added.
- A security audit has identified vulnerabilities to remediate.
- A new feature handles sensitive data (PII, financial, medical).

## JWT Implementation Rules

```typescript
// Access token: short-lived (15 minutes)
const accessToken = jwt.sign(
  { sub: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '15m', algorithm: 'HS256' }
);

// Refresh token: long-lived, stored in httpOnly cookie (NOT localStorage)
const refreshToken = jwt.sign(
  { sub: user.id, tokenVersion: user.tokenVersion },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: '7d' }
);

// Cookie settings (server-side)
res.cookie('refresh_token', refreshToken, {
  httpOnly: true,
  secure: true,          // HTTPS only
  sameSite: 'strict',   // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

## Password Hashing

```typescript
// Use bcrypt with cost factor 12 or Argon2id
const hash = await bcrypt.hash(password, 12);
const valid = await bcrypt.compare(password, hash);
```

## RBAC Pattern

```typescript
// Role guard
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

## OWASP Top 10 Mitigations

| Threat | Mitigation |
|---|---|
| Injection | Parameterized queries, TypeORM/SQLAlchemy, input validation |
| Broken Auth | JWT with short expiry, refresh token rotation, account lockout |
| XSS | Output encoding, CSP headers, `httpOnly` cookies |
| IDOR | Resource ownership checks on every data-modifying operation |
| Security Misconfiguration | Environment-specific configs, no default credentials |
| Sensitive Data Exposure | Encrypt PII at rest, HTTPS everywhere, no sensitive data in logs |
| Rate Limiting | `@nestjs/throttler`, nginx `limit_req`, API Gateway throttling |

## Review Checklist

- [ ] Passwords hashed with bcrypt cost 12+ or Argon2id
- [ ] JWT stored in httpOnly cookie, NOT localStorage
- [ ] Refresh tokens rotated on use
- [ ] All protected routes have auth guard applied
- [ ] All resource mutations have ownership check
- [ ] Rate limiting applied to auth endpoints
- [ ] No sensitive data (passwords, tokens) in logs or error responses
