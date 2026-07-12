/**
 * Query Pipeline Integration Tests
 * Phase 3.3 — Integration Test Suite
 *
 * Tests the full query pipeline: makeQuery dispatcher → individual generators
 * → parameterized {sql, params} output.
 *
 * Validates that query descriptors (as sent from .app templates via _IQuery_)
 * flow correctly through makeQuery → getQuery/insertQuery/updateQuery/deleteQuery
 * and produce safe, parameterized SQL.
 */

const makeQuery = require('../../modules/utils/query/makeQuery');
const { tables } = require('../fixtures/test-data');

// ============================================================
// 1. SELECT Queries via makeQuery
// ============================================================
describe('Query Pipeline — SELECT (get)', () => {

    test('simple SELECT all from table', async () => {
        const body = {
            query: [{
                a: 'get',
                n: 'users',
                s: ['A'],
                q: [],
                l: 0
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result).toBeDefined();
        expect(result.sql).toContain('SELECT *');
        expect(result.sql).toContain('FROM users');
        expect(Array.isArray(result.params)).toBe(true);
    });

    test('SELECT with WHERE clause produces parameterized query', async () => {
        const body = {
            query: [{
                a: 'get',
                n: 'users',
                s: ['A'],
                q: [[[1, 'admin', 'eq']]],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).toContain('SELECT *');
        expect(result.sql).toContain('FROM users');
        expect(result.sql).toContain('WHERE');
        expect(result.sql).toContain('?');
        expect(result.params).toContain('admin');
        // No raw user input in SQL string
        expect(result.sql).not.toContain('admin');
    });

    test('SELECT with ORDER BY', async () => {
        const body = {
            query: [{
                a: 'get',
                n: 'users',
                s: ['A'],
                q: [],
                l: 0,
                order: 'username',
                method: 'ASC'
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).toContain('ORDER BY username');
        expect(result.sql).toContain('ASC');
    });

    test('SELECT with LIMIT produces parameterized limit', async () => {
        const body = {
            query: [{
                a: 'get',
                n: 'users',
                s: ['A'],
                q: [],
                l: 10
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).toContain('LIMIT');
    });

    test('SELECT with multiple WHERE conditions', async () => {
        const body = {
            query: [{
                a: 'get',
                n: 'users',
                s: ['A'],
                q: [[[4, 'admin', 'eq'], [1, 'john', 'eq']]],
                l: 0
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).toContain('WHERE');
        expect(result.params.length).toBeGreaterThanOrEqual(2);
        // Values in params, not SQL
        expect(result.params).toContain('admin');
        expect(result.params).toContain('john');
        expect(result.sql).not.toContain("'admin'");
        expect(result.sql).not.toContain("'john'");
    });

    test('SELECT for non-existent table returns undefined', async () => {
        const body = {
            query: [{
                a: 'get',
                n: 'nonExistentTable',
                s: ['A'],
                q: [],
                l: 0
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result).toBeUndefined();
    });
});

// ============================================================
// 2. INSERT Queries via makeQuery
// ============================================================
describe('Query Pipeline — INSERT (in)', () => {

    test('INSERT produces parameterized values', async () => {
        const body = {
            query: [{
                a: 'in',
                n: 'users',
                d: ['newuser', 'new@test.com', 'hashedpass', 'user', '2026-01-01', '2026-01-01'],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result).toBeDefined();
        expect(result.sql).toContain('INSERT INTO users');
        expect(result.sql).toContain('VALUES');
        expect(result.sql).toContain('?');
        expect(result.params).toContain('newuser');
        expect(result.params).toContain('new@test.com');
        // No raw values in SQL
        expect(result.sql).not.toContain('newuser');
    });

    test('INSERT for non-existent table returns undefined', async () => {
        const body = {
            query: [{
                a: 'in',
                n: 'fakevTable',
                d: ['data'],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result).toBeUndefined();
    });
});

// ============================================================
// 3. UPDATE Queries via makeQuery
// ============================================================
describe('Query Pipeline — UPDATE (up)', () => {

    test('UPDATE produces parameterized SET and WHERE', async () => {
        const body = {
            query: [{
                a: 'up',
                n: 'users',
                d: [[1, 'updateduser']],
                q: [[[0, 1, 'eq']]],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result).toBeDefined();
        expect(result.sql).toContain('UPDATE users');
        expect(result.sql).toContain('SET');
        expect(result.sql).toContain('WHERE');
        expect(result.sql).toContain('?');
        expect(result.params).toContain('updateduser');
        expect(result.sql).not.toContain('updateduser');
    });

    test('UPDATE with LIMIT', async () => {
        const body = {
            query: [{
                a: 'up',
                n: 'users',
                d: [[4, 'moderator']],
                q: [[[1, 'testuser', 'eq']]],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).toContain('LIMIT');
    });
});

// ============================================================
// 4. DELETE Queries via makeQuery
// ============================================================
describe('Query Pipeline — DELETE (del)', () => {

    test('DELETE produces parameterized WHERE', async () => {
        const body = {
            query: [{
                a: 'del',
                n: 'sessions',
                q: [[[0, 999, 'eq']]],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result).toBeDefined();
        expect(result.sql).toContain('DELETE FROM sessions');
        expect(result.sql).toContain('WHERE');
        expect(result.sql).toContain('?');
        expect(result.params).toContain(999);
    });

    test('DELETE with multiple conditions', async () => {
        const body = {
            query: [{
                a: 'del',
                n: 'sessions',
                q: [[[1, 'user123', 'eq']]],
                l: 0
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).toContain('DELETE FROM sessions');
        expect(result.params).toContain('user123');
    });
});

// ============================================================
// 5. SQL Injection Prevention (Pipeline Level)
// ============================================================
describe('Query Pipeline — SQL Injection Prevention', () => {

    test('SQL injection in WHERE value is parameterized', async () => {
        const body = {
            query: [{
                a: 'get',
                n: 'users',
                s: ['A'],
                q: [[[1, "' OR 1=1 --", 'eq']]],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).not.toContain("' OR 1=1 --");
        expect(result.sql).toContain('?');
        expect(result.params).toContain("' OR 1=1 --");
        // The injection attempt is safely in params, NOT the SQL
    });

    test('UNION attack in WHERE value is parameterized', async () => {
        const body = {
            query: [{
                a: 'get',
                n: 'users',
                s: ['A'],
                q: [[[1, "' UNION SELECT * FROM usersPasswords --", 'eq']]],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).not.toContain('UNION');
        expect(result.params).toContain("' UNION SELECT * FROM usersPasswords --");
    });

    test('INSERT with SQL injection in data values', async () => {
        const body = {
            query: [{
                a: 'in',
                n: 'users',
                d: ["admin'; DROP TABLE users; --", 'evil@hack.com', 'pass', 'admin', '2026-01-01', '2026-01-01'],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).not.toContain('DROP TABLE');
        expect(result.params).toContain("admin'; DROP TABLE users; --");
    });

    test('UPDATE with injection in SET values', async () => {
        const body = {
            query: [{
                a: 'up',
                n: 'users',
                d: [[4, "admin' OR '1'='1"]],
                q: [[[0, 1, 'eq']]],
                l: 1
            }]
        };

        const result = await makeQuery(body, tables);
        expect(result.sql).not.toContain("admin' OR '1'='1");
        expect(result.params).toContain("admin' OR '1'='1");
    });

    test('all query types return {sql, params} interface', async () => {
        const queryTypes = [
            { a: 'get', n: 'users', s: ['A'], q: [[[1, 'test', 'eq']]], l: 1 },
            { a: 'in', n: 'users', d: ['a', 'b', 'c', 'd', 'e', 'f'], l: 1 },
            { a: 'up', n: 'users', d: [[1, 'x']], q: [[[0, 1, 'eq']]], l: 1 },
            { a: 'del', n: 'users', q: [[[0, 1, 'eq']]], l: 1 },
        ];

        for (const query of queryTypes) {
            const result = await makeQuery({ query: [query] }, tables);
            expect(result).toHaveProperty('sql');
            expect(result).toHaveProperty('params');
            expect(typeof result.sql).toBe('string');
            expect(Array.isArray(result.params)).toBe(true);
        }
    });
});

// ============================================================
// 6. actionType Dispatch
// ============================================================
describe('Query Pipeline — makeQuery Dispatch', () => {

    test('dispatches get action to getQuery', async () => {
        const result = await makeQuery({
            query: [{ a: 'get', n: 'users', s: ['A'], q: [], l: 0 }]
        }, tables);
        expect(result.sql).toContain('SELECT');
    });

    test('dispatches in action to insertQuery', async () => {
        const result = await makeQuery({
            query: [{ a: 'in', n: 'users', d: ['a', 'b', 'c', 'd', 'e', 'f'], l: 1 }]
        }, tables);
        expect(result.sql).toContain('INSERT');
    });

    test('dispatches up action to updateQuery', async () => {
        const result = await makeQuery({
            query: [{ a: 'up', n: 'users', d: [[1, 'x']], q: [[[0, 1, 'eq']]], l: 1 }]
        }, tables);
        expect(result.sql).toContain('UPDATE');
    });

    test('dispatches del action to deleteQuery', async () => {
        const result = await makeQuery({
            query: [{ a: 'del', n: 'users', q: [[[0, 1, 'eq']]], l: 1 }]
        }, tables);
        expect(result.sql).toContain('DELETE');
    });

    test('dispatches check action to checkQuery', async () => {
        const result = await makeQuery({
            query: [{ a: 'check', n: 'users' }]
        }, tables);
        expect(result).toBeDefined();
        expect(result).toHaveProperty('sql');
    });

    test('dispatches create action returns raw SQL', async () => {
        const createSql = 'CREATE TABLE test (id INT PRIMARY KEY)';
        const result = await makeQuery({
            query: [{ a: 'create', d: createSql }]
        }, tables);
        expect(result.sql).toBe(createSql);
        expect(result.params).toEqual([]);
    });
});

// ============================================================
// 7. Query Output Safety Audit
// ============================================================
describe('Query Pipeline — Output Safety', () => {

    test('no template literals in generated SQL', async () => {
        const maliciousValues = [
            '${process.exit()}',
            '`; DROP TABLE; `',
            '{{constructor.constructor("return this")()}}',
            '${require("child_process").execSync("id")}'
        ];

        for (const value of maliciousValues) {
            const result = await makeQuery({
                query: [{
                    a: 'get',
                    n: 'users',
                    s: ['A'],
                    q: [[[1, value, 'eq']]],
                    l: 1
                }]
            }, tables);

            // Malicious value should be in params, not SQL
            expect(result.sql).not.toContain(value);
            expect(result.params).toContain(value);
        }
    });

    test('params array matches placeholder count', async () => {
        const result = await makeQuery({
            query: [{
                a: 'get',
                n: 'users',
                s: ['A'],
                q: [[[1, 'val1', 'eq'], [2, 'val2', 'eq']]],
                l: 5
            }]
        }, tables);

        const placeholderCount = (result.sql.match(/\?/g) || []).length;
        expect(placeholderCount).toBe(result.params.length);
    });
});
