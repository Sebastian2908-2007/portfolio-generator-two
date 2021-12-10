const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve,reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            // if all went good, resolve the promise and send the succesfull data to the then() method
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if(err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'style sheet copied!'
            })
        })
    })
};

module.exports = {writeFile, copyFile};