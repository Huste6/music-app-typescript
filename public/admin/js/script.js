// upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    // const closeButton = document.querySelector(".close");
    // const imageContainer = document.querySelector('.image-container');
    uploadImageInput.addEventListener("change",(e)=>{
        const file = e.target.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
            // imageContainer.style.display = 'inline-block';
        }
    })

    // closeButton.addEventListener("click",()=>{
    //     uploadImageInput.value='';
    //     uploadImagePreview.src='';
    //     imageContainer.style.display = 'none';
    // })
}
// end upload image
