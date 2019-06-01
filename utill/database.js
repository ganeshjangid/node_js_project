const db=require('mysql2');
const pool=db.createPool({
        host: '172.29.67.213',
        user: 'application',
        password: 's@myD#@mnl@sy',
        database: 'node_js_learn'
});

module.exports=pool.promise();
