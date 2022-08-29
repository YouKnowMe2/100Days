const imagePickerElement = document.querySelector('#image-upload-control input');
const imagePreview = document.querySelector('#image-upload-control img');

function updateImagePreview(){
    const files = imagePickerElement.files;
    if(!files || files.length ===  0){
        imagePreview.style.display= 'none';
        return;
    }
    const pickedFiles = files[0];
    imagePreview.src = URL.createObjectURL(pickedFiles);
    imagePreview.style.display = 'block';
}

imagePickerElement.addEventListener('change',updateImagePreview);