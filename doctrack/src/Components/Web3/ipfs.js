import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const auth =
    'Basic ' + Buffer.from(process.env.REACT_APP_IPFS_PROJECT_ID + ':' + process.env.REACT_APP_IPFS_PROJECT_SECRET).toString('base64');

//const ipfsClient = require('ipfs-http-client');
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


//const client = create({ url: "https://doctrack.infura-ipfs.io:5001" });

export default client;
// export default ipfs;