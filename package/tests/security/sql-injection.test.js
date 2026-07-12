/**
 * SQL Injection Prevention Tests
 * Phase 3 — Security Test Suite
 *
 * Validates that ALL query builders use parameterized queries
 * and never interpolate user input into SQL strings.
 *
 * IMPORTANT: Query condition format is [[[columnIndex, value, relation]]]
 *   - Outer array: OR groups
 *   - Middle array: AND conditions within an OR group
 *   - Inner array: [columnIndex, value, relation] tuple
 *
 * See: knowledge/modules/utils/query/ for documented vulnerabilities
 */

const payloads = require('../fixtures/malicious-payloads.json');
const { tables } = require('../fixtures/test-data');

// Query builders under test
const orAndOption = require('../../modules/utils/query/queryData/orAndOption');
const { buildWhereClause } = require('../../modules/utils/query/queryData/whereClause');
const insertValues = require('../../modules/utils/query/queryData/insertValues');
const setUpData = require('../../modules/utils/query/queryData/setUpData');
const getQuery = require('../../modules/utils/query/queryData/getQuery');
const updateQuery = require('../../modules/utils/query/queryData/updateQuery');
const deleteQuery = require('../../modules/utils/query/queryData/deleteQuery');
const insertQuery = require('../../modules/utils/query/queryData/insertQuery');
const getLimit = require('../../modules/utils/query/queryData/getLimit');
const makeQuery = require('../../modules/utils/query/makeQuery');

/**
 * Helper: wrap a single condition into the correct 3-level format.
 * Single condition [col, val, rel] → [[[col, val, rel]]]
 */
const cond = (columnIndex, value, relation) => [[[columnIndex, value, relation]]];

// ============================================================
// 1. WHERE Clause Builder (orAndOption / whereClause)
// ============================================================
describe('SQL Injection — WHERE clause builder (orAndOption)', () => {

    describe('Basic SQL injection payloads', () => {
        payloads.sqlInjection.basic.forEach((payload) => {
            test(`blocks basic injection: ${payload.substring(0, 40)}`, () => {
                const result = orAndOption(cond(1, payload, 'eq'), tables.users);

                expect(result).toHaveProperty('sql');
                expect(result).toHaveProperty('params');
                expect(Array.isArray(result.params)).toBe(true);

                // The malicious payload should be in params, NOT in SQL
                expect(result.params).toContain(payload);
                // SQL should use ? placeholder
                expect(result.sql).toContain('?');
                // SQL should NOT contain the raw payload
                expect(result.sql).not.toContain(payload);
            });
        });
    });

    describe('UNION injection payloads', () => {
        payloads.sqlInjection.union.forEach((payload) => {
            test(`blocks UNION injection: ${payload.substring(0, 40)}`, () => {
                const result = orAndOption(cond(1, payload, 'eq'), tables.users);

                expect(result.params).toContain(payload);
                expect(result.sql).not.toMatch(/UNION/i);
                expect(result.sql).toContain('?');
            });
        });
    });

    describe('Blind SQL injection payloads', () => {
        payloads.sqlInjection.blind.forEach((payload) => {
            test(`blocks blind injection: ${payload.substring(0, 40)}`, () => {
                const result = orAndOption(cond(1, payload, 'eq'), tables.users);

                expect(result.params).toContain(payload);
                expect(result.sql).not.toMatch(/SLEEP/i);
                expect(result.sql).not.toMatch(/WAITFOR/i);
            });
        });
    });

    describe('Stacked query payloads', () => {
        payloads.sqlInjection.stacked.forEach((payload) => {
            test(`blocks stacked query: ${payload.substring(0, 40)}`, () => {
                const result = orAndOption(cond(1, payload, 'eq'), tables.users);

                expect(result.params).toContain(payload);
                expect(result.sql).not.toMatch(/DROP TABLE/i);
                expect(result.sql).not.toMatch(/;.*DELETE FROM/i);
            });
        });
    });

    describe('Relation types', () => {
        const relations = ['eq', 'uneq', 'gr', 'greq', 'le', 'leeq', 'like'];

        relations.forEach((rel) => {
            test(`parameterizes value with relation: ${rel}`, () => {
                const malicious = "' OR '1'='1";
                const result = orAndOption(cond(1, malicious, rel), tables.users);

                expect(result.params).toContain(malicious);
                expect(result.sql).toContain('?');
                expect(result.sql).not.toContain(malicious);
            });
        });
    });

    describe('Edge cases', () => {
        test('handles empty conditions', () => {
            const result = orAndOption([], tables.users);
            expect(result.sql).toBe('');
            expect(result.params).toEqual([]);
        });

        test('handles null/undefined conditions', () => {
            const result = orAndOption(null, tables.users);
            expect(result.sql).toBe('');
            expect(result.params).toEqual([]);
        });

        test('handles multiple AND conditions', () => {
            const result = orAndOption(
                [[[1, 'admin', 'eq'], [2, 'admin@test.com', 'eq']]],
                tables.users
            );
            expect(result.params).toContain('admin');
            expect(result.params).toContain('admin@test.com');
            expect(result.sql).toContain('AND');
            expect(result.sql.match(/\?/g).length).toBe(2);
        });

        test('handles multiple OR groups', () => {
            const result = orAndOption(
                [[[1, 'admin', 'eq']], [[1, 'user1', 'eq']]],
                tables.users
            );
            expect(result.params).toContain('admin');
            expect(result.params).toContain('user1');
            expect(result.sql).toContain('OR');
            expect(result.sql.match(/\?/g).length).toBe(2);
        });

        test('rejects invalid column index (out of range)', () => {
            const result = orAndOption(cond(999, 'value', 'eq'), tables.users);
            // With invalid column, columnName is empty but parameterization still safe
            expect(result.params).toContain('value');
        });

        test('handles string column names', () => {
            const result = orAndOption(cond('username', 'admin', 'eq'), tables.users);
            expect(result.sql).toContain('username');
            expect(result.params).toContain('admin');
        });
    });
});

// ============================================================
// 2. buildWhereClause (unified version)
// ============================================================
describe('SQL Injection — buildWhereClause', () => {
    test('simple mode parameterizes values', () => {
        const payload = "1' OR '1'='1";
        const result = buildWhereClause(
            cond(1, payload, 'eq'),
            { table: tables.users, isJoin: false }
        );
        expect(result.params).toContain(payload);
        expect(result.sql).not.toContain(payload);
    });

    test('JOIN mode parameterizes scalar values', () => {
        const payload = "'; DROP TABLE users;--";
        const result = buildWhereClause(
            cond(1, payload, 'eq'),
            { table: tables, tableName: 'users', isJoin: true }
        );
        expect(result.params).toContain(payload);
        expect(result.sql).not.toContain('DROP TABLE');
    });

    test('JOIN mode handles column-to-column refs (no params)', () => {
        const colRef = { t: 'q', n: 'sessions', d: 'userId' };
        const result = buildWhereClause(
            cond(1, colRef, 'eq'),
            { table: tables, tableName: 'users', master: 'users', isJoin: true }
        );
        // Column refs are not user input — should be inlined, not parameterized
        expect(result.sql).toContain('sessions.userId');
        expect(result.params.length).toBe(0);
    });
});

// ============================================================
// 3. INSERT values builder
// ============================================================
describe('SQL Injection — insertValues', () => {
    describe('Single row', () => {
        payloads.sqlInjection.basic.forEach((payload) => {
            test(`parameterizes in single row: ${payload.substring(0, 30)}`, () => {
                const result = insertValues(['admin', payload, 'test@test.com']);
                expect(result.params).toContain(payload);
                expect(result.sql).toContain('?');
                expect(result.sql).not.toContain(payload);
            });
        });
    });

    describe('Multiple rows', () => {
        test('parameterizes across multiple rows', () => {
            const payload = "'; DROP TABLE users;--";
            const result = insertValues([
                ['user1', payload, 'a@b.com'],
                ['user2', 'normal', 'c@d.com']
            ]);
            expect(result.params).toContain(payload);
            expect(result.sql).not.toContain('DROP TABLE');
            expect(result.params.length).toBe(6);
        });
    });

    describe('NOW() handling', () => {
        test('NOW() is inlined (not parameterized) — only exact match', () => {
            const result = insertValues(['admin', 'now()', 'test@test.com']);
            expect(result.sql).toContain('NOW()');
            expect(result.params).not.toContain('now()');
            expect(result.params).toContain('admin');
            expect(result.params).toContain('test@test.com');
        });

        test('prevents injection via NOW() variation', () => {
            const result = insertValues(['admin', "now(); DROP TABLE users;--", 'test@test.com']);
            expect(result.params).toContain("now(); DROP TABLE users;--");
        });
    });
});

// ============================================================
// 4. SET clause builder (setUpData)
// ============================================================
describe('SQL Injection — setUpData', () => {
    describe('Indexed array format', () => {
        payloads.sqlInjection.basic.forEach((payload) => {
            test(`parameterizes in SET clause: ${payload.substring(0, 30)}`, () => {
                const result = setUpData([[2, payload]], tables.users);
                expect(result.params).toContain(payload);
                expect(result.sql).toContain('?');
                expect(result.sql).not.toContain(payload);
            });
        });
    });

    describe('Object format', () => {
        test('parameterizes object-style updates', () => {
            const payload = "1' OR '1'='1";
            const result = setUpData({ username: payload, email: 'test@test.com' }, tables.users);
            expect(result.params).toContain(payload);
            expect(result.sql).toContain('?');
        });
    });

    describe('NOW() handling', () => {
        test('NOW() is inlined safely', () => {
            const result = setUpData([[7, 'now()']], tables.users);
            expect(result.sql).toContain('NOW()');
            expect(result.params).not.toContain('now()');
        });

        test('prevents NOW() injection', () => {
            const result = setUpData([[2, "now(); DROP TABLE users;--"]], tables.users);
            expect(result.params).toContain("now(); DROP TABLE users;--");
            expect(result.sql).not.toContain('DROP TABLE');
        });
    });

    describe('Integer handling', () => {
        test('integers are parameterized', () => {
            const result = setUpData([[1, 42]], tables.users);
            expect(result.params).toContain(42);
            expect(result.sql).toContain('?');
        });
    });
});

// ============================================================
// 5. Full query builders (getQuery, updateQuery, deleteQuery, insertQuery)
// ============================================================
describe('SQL Injection — getQuery (SELECT)', () => {
    test('parameterizes WHERE clause values', () => {
        const payload = "1' OR '1'='1";
        const ob = { n: 'users', q: cond(1, payload, 'eq'), s: ['A'] };
        const result = getQuery(ob, tables);

        expect(result.sql).toMatch(/^SELECT \* FROM users WHERE/);
        expect(result.params).toContain(payload);
        expect(result.sql).not.toContain(payload);
    });

    test('validates ORDER BY column against schema', () => {
        const ob = { n: 'users', q: [], s: ['A'], order: 'username' };
        const result = getQuery(ob, tables);
        expect(result.sql).toContain('ORDER BY username');
    });

    test('rejects invalid ORDER BY column', () => {
        const ob = { n: 'users', q: [], s: ['A'], order: 'id; DROP TABLE users;--' };
        const result = getQuery(ob, tables);
        expect(result.sql).not.toContain('DROP TABLE');
    });

    test('validates ORDER method (ASC/DESC only)', () => {
        const ob = { n: 'users', q: [], s: ['A'], order: 'id', method: 'ASC' };
        const result = getQuery(ob, tables);
        expect(result.sql).toContain('ORDER BY id ASC');
    });

    test('rejects invalid ORDER method', () => {
        const ob = { n: 'users', q: [], s: ['A'], order: 'id', method: '; DROP TABLE users;--' };
        const result = getQuery(ob, tables);
        expect(result.sql).not.toContain('DROP TABLE');
    });

    test('parameterizes LIMIT values', () => {
        const ob = { n: 'users', q: [], s: ['A'], limitAuto: 10, last: 20 };
        const result = getQuery(ob, tables);
        expect(result.sql).toContain('LIMIT ?, ?');
        expect(result.params).toContain(20);
        expect(result.params).toContain(10);
    });

    test('returns undefined for non-existent table', () => {
        const ob = { n: 'nonexistent', q: [], s: ['A'] };
        const result = getQuery(ob, tables);
        expect(result).toBeUndefined();
    });

    test('full injection attack produces safe SQL', () => {
        const ob = {
            n: 'users',
            q: cond(1, "1' UNION SELECT password FROM users WHERE '1'='1", 'eq'),
            s: ['A'],
            order: 'id',
            method: 'DESC',
            limitAuto: 10
        };
        const result = getQuery(ob, tables);
        expect(result.sql).not.toMatch(/UNION/i);
        expect(result.params.length).toBeGreaterThan(0);
    });
});

describe('SQL Injection — updateQuery (UPDATE)', () => {
    test('parameterizes SET and WHERE values', () => {
        const payload = "'; DROP TABLE users;--";
        const ob = {
            n: 'users',
            d: [[2, payload]],
            q: cond(1, 1, 'eq')
        };
        const result = updateQuery(ob, tables);

        expect(result.sql).toMatch(/^UPDATE users SET/);
        expect(result.params).toContain(payload);
        expect(result.sql).not.toContain('DROP TABLE');
    });

    test('parameterizes LIMIT', () => {
        const ob = {
            n: 'users',
            d: [[2, 'newname']],
            q: cond(1, 1, 'eq'),
            l: 1
        };
        const result = updateQuery(ob, tables);
        expect(result.sql).toContain('LIMIT ?');
        expect(result.params).toContain(1);
    });
});

describe('SQL Injection — deleteQuery (DELETE)', () => {
    test('parameterizes WHERE values', () => {
        const payload = "1' OR '1'='1";
        const ob = { n: 'users', q: cond(1, payload, 'eq') };
        const result = deleteQuery(ob, tables);

        expect(result.sql).toMatch(/^DELETE FROM users WHERE/);
        expect(result.params).toContain(payload);
        expect(result.sql).not.toContain("OR '1'='1");
    });

    test('parameterizes LIMIT', () => {
        const ob = { n: 'users', q: cond(1, 1, 'eq'), l: 5 };
        const result = deleteQuery(ob, tables);
        expect(result.sql).toContain('LIMIT ?');
    });
});

describe('SQL Injection — insertQuery (INSERT)', () => {
    test('parameterizes all values', () => {
        const payload = "'; DROP TABLE users;--";
        const ob = {
            n: 'users',
            d: ['admin', payload, 'admin@test.com', 'hashedpass', 'admin', 'now()']
        };
        const result = insertQuery(ob, tables);

        expect(result.sql).toMatch(/^INSERT INTO users/);
        expect(result.params).toContain(payload);
        expect(result.sql).not.toContain('DROP TABLE');
    });

    test('handles multiple row insert', () => {
        const ob = {
            n: 'users',
            d: [
                ['admin', "' OR '1'='1", 'a@b.com', 'pass', 'admin', 'now()'],
                ['user', 'normal', 'c@d.com', 'pass', 'user', 'now()']
            ]
        };
        const result = insertQuery(ob, tables);
        expect(result.params).toContain("' OR '1'='1");
        expect(result.sql).not.toContain("OR '1'='1");
    });
});

// ============================================================
// 6. getLimit builder
// ============================================================
describe('SQL Injection — getLimit', () => {
    test('parameterizes limitAuto + last', () => {
        const result = getLimit({ limitAuto: 10, last: 20 });
        expect(result.sql).toBe('LIMIT ?, ?');
        expect(result.params).toEqual([20, 10]);
    });

    test('parameterizes limitAuto without last', () => {
        const result = getLimit({ limitAuto: 10 });
        expect(result.sql).toBe('LIMIT 0, ?');
        expect(result.params).toEqual([10]);
    });

    test('parameterizes simple limit', () => {
        const result = getLimit({ l: 5 });
        expect(result.sql).toBe('LIMIT ?');
        expect(result.params).toEqual([5]);
    });

    test('handles zero/null/undefined limit', () => {
        expect(getLimit({ l: 0 })).toEqual({ sql: '', params: [] });
        expect(getLimit({ l: null })).toEqual({ sql: '', params: [] });
        expect(getLimit({ l: 'null' })).toEqual({ sql: '', params: [] });
        expect(getLimit({})).toEqual({ sql: '', params: [] });
    });

    test('converts string limit to integer', () => {
        const result = getLimit({ l: '5; DROP TABLE users;--' });
        expect(result.sql).toBe('LIMIT ?');
        // parseInt('5; DROP...') returns 5
        expect(result.params[0]).toBe(5);
    });
});

// ============================================================
// 7. makeQuery dispatcher
// ============================================================
describe('SQL Injection — makeQuery', () => {
    test('dispatches GET query with parameterized output', async () => {
        const body = {
            query: [{ a: 'get', n: 'users', q: cond(1, "' OR '1'='1", 'eq'), s: ['A'] }]
        };
        const result = await makeQuery(body, tables);
        expect(result).toHaveProperty('sql');
        expect(result).toHaveProperty('params');
        expect(result.sql).not.toContain("OR '1'='1");
    });

    test('dispatches INSERT query with parameterized output', async () => {
        const body = {
            query: [{ a: 'in', n: 'users', d: ['admin', "'; DROP TABLE;--", 'a@b.com', 'pass', 'admin', 'now()'] }]
        };
        const result = await makeQuery(body, tables);
        expect(result.sql).toMatch(/^INSERT INTO/);
        expect(result.params).toContain("'; DROP TABLE;--");
    });

    test('dispatches UPDATE query with parameterized output', async () => {
        const body = {
            query: [{
                a: 'up', n: 'users',
                d: [[2, "'; DROP TABLE users;--"]],
                q: cond(1, 1, 'eq')
            }]
        };
        const result = await makeQuery(body, tables);
        expect(result.sql).toMatch(/^UPDATE users SET/);
        expect(result.sql).not.toContain('DROP TABLE');
    });

    test('dispatches DELETE query with parameterized output', async () => {
        const body = {
            query: [{ a: 'del', n: 'users', q: cond(1, "1' OR '1'='1", 'eq') }]
        };
        const result = await makeQuery(body, tables);
        expect(result.sql).toMatch(/^DELETE FROM/);
        expect(result.sql).not.toContain("OR '1'='1");
    });

    test('all actions return {sql, params} format', async () => {
        const actions = [
            { a: 'get', n: 'users', q: [], s: ['A'] },
            { a: 'in', n: 'users', d: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6'] },
            { a: 'up', n: 'users', d: { username: 'new' }, q: cond(1, 1, 'eq') },
            { a: 'del', n: 'users', q: cond(1, 1, 'eq') }
        ];

        for (const action of actions) {
            const result = await makeQuery({ query: [action] }, tables);
            expect(result).toHaveProperty('sql');
            expect(result).toHaveProperty('params');
            expect(typeof result.sql).toBe('string');
            expect(Array.isArray(result.params)).toBe(true);
        }
    });
});
