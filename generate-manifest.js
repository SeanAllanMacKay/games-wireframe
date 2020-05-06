const fs = require('fs');
const config = require('./src/config/manifest')

try{
    if(fs.existsSync('./public/manifest.json')){
        fs.unlink('./public/manifest.json', (err) => {
            if (err) throw err;
            console.log('old ./public/manifest.json was deleted');
          });
    }

    fs.writeFile('./public/manifest.json', JSON.stringify(config), (err) => {
        if (err) throw err;
        console.log('new ./public/manifest.json was created')
    });
} catch(err) {
    console.log(err)
}