const filePicker =  document.getElementById('image');
const imagePreivew = document.getElementById('image-preview');
function showPreview(){
   const files= filePicker.files;
    if(!files || files.length===0){
        imagePreivew.style.display = 'none';
        return;
    }
    const pickedFile = files[0];
    imagePreivew.src = URL.createObjectURL(pickedFile);
    imagePreivew.style.display = 'block';


}

filePicker.addEventListener('change',showPreview);