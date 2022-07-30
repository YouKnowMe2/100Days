const fs = require('fs/promises');

async function readFile(){
    let fileData;
    // fs.readFile('data.txt',function (error,fileData){
    //
    //     console.log('File Parsing done.');
    //     console.log(fileData.toString());
    //
    //     //start another async task that sends teh data
    //
    // });
    try{
        fileData = await fs.readFile('data.txt');

    }catch(error){
        console.log(error);
    }
    console.log('File Parsing done.');
    console.log(fileData.toString());
    console.log('Completed the works.');
    //return anotherASyncOperation
    //promised have then method

}
//callback means asychornous system and it needs a function
readFile();