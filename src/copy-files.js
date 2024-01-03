"use strict";
const fs = require('fs');
const path = require('path');
const ren = (name) => name.replace('../', '');
//const dirs = ['public', 'views'];
const files = ['../package.json', '../vercel.json'];
const folders = ['frontend'];
let destDir = '../dist/';
pd = (ds) => {
    return path.join(__dirname, ds);
};
function clean(pack) {
    delete pack['scripts']['start:prod'];
    delete pack['scripts']['copy-files'];
    delete pack['scripts']['build'];
}
const updateV = (pack) => {
    let vers = pack['version'].split('.');
    //console.log(vers.join("."))
    if (vers[2] < 9) {
        vers[2] = parseInt(vers[2]) + 1;
        //console.log(vers.join("."));
        vers = vers.join('.');
        pack['version'] = vers;
    }
};
const copyFile = async () => {
    for (const f of files) {
        try {
            fs.copyFileSync(pd(f), pd(destDir + ren(f)));
            console.log(`Copy of ${ren(f)} completed!`);
        }
        catch (err) {
            console.log(err);
        }
        //console.log(ren(f));
    }
};
const copyFolder = async () => {
    for (const f of folders) {
        try {
            fs.cp(pd(f), pd(destDir + 'src/' + f), { recursive: true }, (err) => {
                if (err)
                    return console.log(err);
                console.log(`Copy of ${f} folder completed!`);
            });
        }
        catch (err) { }
        //console.log(ren(f));
    }
};
const cleanPkg = async () => {
    const pack = JSON.parse(fs.readFileSync(pd(destDir + 'package.json')));
    const opack = JSON.parse(fs.readFileSync(pd(files[0])));
    pack['main'] = 'src/server.js';
    pack['scripts']['start'] = 'node src/server.js';
    clean(pack);
    updateV(pack);
    updateV(opack);
    try {
        fs.writeFileSync(pd('../dist/package.json'), JSON.stringify(pack, null, 4));
        fs.writeFileSync(pd(files[0]), JSON.stringify(opack, null, 4));
        console.log('Updated package.json successfully!');
    }
    catch (err) {
        console.log(err);
    }
};
(async () => {
    await Promise.all([copyFolder(), copyFile()]).then(cleanPkg).catch(console.error);
})();
