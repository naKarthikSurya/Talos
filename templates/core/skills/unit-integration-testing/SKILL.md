---
name: unit-integration-testing
description: >
  Writes unit and integration tests using Jest (Node.js/TypeScript) or Pytest (Python).
  Covers service logic, utility functions, API endpoints, database interactions, and mocking.
---

# Unit & Integration Testing Skill

## Goal

Produce a test suite that gives the team confidence that the feature works correctly,
that regressions are caught automatically, and that the system behaves correctly at
integration boundaries.

## When to Use

- A new feature has been implemented and needs test coverage.
- A bug is being fixed and a regression test must be added.
- Test coverage is below the required threshold.

## Unit Tests (Jest — NestJS/Node.js)

```typescript
describe('PaymentsService', () => {
  let service: PaymentsService;
  let repo: jest.Mocked<Repository<Payment>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: getRepositoryToken(Payment),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get(PaymentsService);
    repo = module.get(getRepositoryToken(Payment));
  });

  it('should throw NotFoundException when payment not found', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findById('nonexistent')).rejects.toThrow(NotFoundException);
  });
});
```

## Integration Tests (Supertest — NestJS API)

```typescript
describe('POST /api/v1/payments', () => {
  it('should return 201 and create payment', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/payments')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 100, currency: 'INR' });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
  });

  it('should return 422 for invalid input', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/payments')
      .send({ amount: -1 });
    expect(res.status).toBe(422);
  });
});
```

## Coverage Rules

- Services: 90%+ coverage (unit tests).
- Controllers: 80%+ coverage (integration tests).
- Utility functions: 100% coverage.
- Run with: `npm run test -- --coverage`.

## Operating Procedure

1. For each acceptance criterion in `feature.md`, write at least one test.
2. Write the happy path test first.
3. Write failure/edge case tests (invalid input, missing auth, not found).
4. Run coverage report and fill gaps above the threshold.

## Review Checklist

- [ ] Happy path covered for every acceptance criterion
- [ ] At least one failure/error case per endpoint
- [ ] Mocks used for external dependencies (DB, HTTP, queues)
- [ ] Tests are independent (no shared state between test cases)
- [ ] Coverage meets threshold before PR merge
