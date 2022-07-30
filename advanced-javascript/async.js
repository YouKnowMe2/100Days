const fs = require('fs/promises');

function readFile(){
    let fileData;
    // fs.readFile('data.txt',function (error,fileData){
    //
    //     console.log('File Parsing done.');
    //     console.log(fileData.toString());
    //
    //     //start another async task that sends teh data
    //
    // });
    fs.readFile('data.txt').then(function (fileData){
            console.log('File Parsing done.');
            console.log(fileData.toString());
            //return anotherASyncOperation
    }).then( function () {

    }).catch(function (error){
        console.log(error);
    });
    //promised have then method
    console.log('Completed the works.');

}
//callback means asychornous system and it needs a function
readFile();