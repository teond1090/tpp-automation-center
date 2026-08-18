#!/usr/bin/env node
/* Encrypt a directory JSON for publishing next to the app.
   Usage: node tools/encrypt-directory.js <directory.json> <passphrase> [out]
   Produces AES-256-GCM ciphertext with a PBKDF2-SHA256 derived key.
   The plaintext client list is never written to the repo.            */
const fs=require('fs'), crypto=require('crypto');
const [,,inPath,pass,outPath='directory.enc.json']=process.argv;
if(!inPath||!pass){console.error('usage: encrypt-directory.js <directory.json> <passphrase> [out]');process.exit(1)}
const ITER=310000;
const data=JSON.parse(fs.readFileSync(inPath,'utf8'));
const facilities=data.facilities||data;
const plain=Buffer.from(JSON.stringify({facilities}),'utf8');
const salt=crypto.randomBytes(32), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(pass,salt,ITER,32,'sha256');
const c=crypto.createCipheriv('aes-256-gcm',key,iv);
const ct=Buffer.concat([c.update(plain),c.final()]),tag=c.getAuthTag();
const out={v:1,kdf:'PBKDF2-SHA256',iter:ITER,
 ver:crypto.createHash('sha256').update(plain).digest('hex').slice(0,16),
 count:facilities.length,updated:new Date().toISOString().slice(0,10),
 salt:salt.toString('base64'),iv:iv.toString('base64'),
 ct:Buffer.concat([ct,tag]).toString('base64')};
fs.writeFileSync(outPath,JSON.stringify(out));
console.log(`encrypted ${facilities.length} records -> ${outPath} (${(fs.statSync(outPath).size/1024).toFixed(0)} KB, version ${out.ver})`);
