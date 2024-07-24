const {MongoClient} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

(async () => {
    try{
        await client.connect();
        console.log('koneksi ke mongoDB berhasil');
    }catch(e){
        console.log(e);
    }
})();

const db = client.db('eduwork-native');
module.exports = db;