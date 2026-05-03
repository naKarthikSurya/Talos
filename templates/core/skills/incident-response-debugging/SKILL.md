---
name: incident-response-debugging
description: >
  Defines the incident response process for production outages including triage, root cause
  analysis, resolution, rollback procedures, and post-mortem documentation.
---

# Incident Response & Debugging Skill

## Goal

Resolve production incidents quickly and systematically, minimize user impact, and
prevent recurrence through disciplined root cause analysis and post-mortem practices.

## When to Use

- A production service is down or degraded.
- Users are reporting errors or data inconsistencies.
- A deployment introduced a regression.
- CPU, memory, or disk is critically elevated in production.

## Incident Severity Levels

| Severity | Definition | Response Time |
|---|---|---|
| P0 — Critical | Service down, data loss risk, security breach | Immediate (< 5 min) |
| P1 — High | Major feature broken for all users | < 30 min |
| P2 — Medium | Feature broken for subset of users | < 4 hours |
| P3 — Low | Minor UX issue or cosmetic bug | Next sprint |

## Triage Procedure

1. **Observe**: Check logs (CloudWatch, Sentry), metrics (Grafana), and uptime monitor.
2. **Scope**: How many users affected? What specific action fails?
3. **Hypothesize**: When did it start? What changed recently (deployment, config, traffic spike)?
4. **Isolate**: Narrow to service, endpoint, or database query causing the issue.
5. **Mitigate first**: Rollback if a deployment caused it — fix root cause after service is restored.
6. **Fix**: Apply the minimal change that resolves the issue.
7. **Verify**: Confirm resolution via monitoring and user testing.

## Common Debug Commands

```bash
# Docker container logs
docker logs <container_id> --tail 100 -f

# NestJS process — check for memory leaks
ps aux | grep node
cat /proc/<pid>/status | grep VmRSS

# PostgreSQL — find slow queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active' AND duration > interval '5 seconds';

# Redis — check memory
redis-cli INFO memory
redis-cli MONITOR  # Real-time command tracing
```

## Rollback Procedure

```bash
# Docker / ECS
docker-compose up -d --no-deps api  # Restart with previous image tag

# GitHub Actions — Re-run previous successful workflow on old SHA
git revert HEAD && git push
```

## Post-Mortem Template

```markdown
## Incident: [Title] — [Date]

### Timeline
- HH:MM: [Event]
- HH:MM: [Mitigation applied]
- HH:MM: [Service restored]

### Root Cause
[What caused the incident]

### Impact
- Duration: X minutes
- Users affected: ~N

### Resolution
[What fixed it]

### Action Items
| Action | Owner | Due Date |
|---|---|---|
| Add alert for [condition] | @engineer | [date] |
| Add test for [edge case] | @qa | [date] |
```

## Review Checklist

- [ ] Incident severity assigned within 5 minutes of detection
- [ ] Rollback executed if deployment-related (before investigating root cause)
- [ ] Root cause identified (not just symptom)
- [ ] Post-mortem written within 48 hours of resolution
- [ ] Preventive action items assigned with owners and due dates
