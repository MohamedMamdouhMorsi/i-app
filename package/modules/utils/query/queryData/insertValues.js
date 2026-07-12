const insertValues = (op) => {
    const params = [];

    if (typeof op[0] === 'object') {
        let opTextAll = '';
        for (let z = 0; z < op.length; z++) {
            const opT = op[z];
            let opText = '';
            for (let i = 0; i < opT.length; i++) {
                if (opT[i] === 'now()' || opT[i] === 'NOW()') {
                    opText += ' NOW()';
                } else {
                    opText += ' ?';
                    params.push(opT[i]);
                }

                const nextOp = opT[i + 1] || opT[i + 1] === '0' ? true : false;
                if (nextOp) {
                    opText += ', ';
                }
            }
            opTextAll += `(${opText})`;
            if (op[z + 1]) {
                opTextAll += ', ';
            }
        }
        return { sql: opTextAll, params };
    } else {
        let opTextA = '';
        for (let i = 0; i < op.length; i++) {
            if (op[i] === 'now()' || op[i] === 'NOW()') {
                opTextA += ' NOW()';
            } else {
                opTextA += ' ?';
                params.push(op[i]);
            }
            const nextOp = op[i + 1] || op[i + 1] === '0' ? true : false;
            if (nextOp) {
                opTextA += ', ';
            }
        }
        opTextA = `(${opTextA})`;
        return { sql: opTextA, params };
    }
};

module.exports = insertValues;
