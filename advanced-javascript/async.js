const fs = require('fs');

function readFile(){
    let fileData;
    fs.readFile('data.txt',function (error,fileData){

        console.log('File Parsing done.');
        console.log(fileData.toString());
    });

    console.log('Completed the works.');

}
//callback means asychornous system and it needs a function
readFile();