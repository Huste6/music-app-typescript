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

// upload-audio-play
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio){
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]")
    const source = uploadAudio.querySelector("source");

    uploadAudioInput.addEventListener("change", (e)=>{
        if(e.target.files.length){
            const audio = URL.createObjectURL(e.target.files[0]);
            source.src = audio;
            uploadAudioPlay.load();
        }
    })
} 
// end upload-audio-play

// button change status 
const ButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(ButtonChangeStatus.length > 0){
    ButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const path = window.location.pathname;
            const segments = path.split('/');
            const lastSegment = segments[segments.length - 1];
            const DataStatus = button.getAttribute("data-status") === "active" ? "inactive" : "active";
            const DataID = button.getAttribute("data-id");

            if (DataStatus === 'active') {
                button.setAttribute('data-status', 'active');
                button.classList.remove('badge-danger');
                button.classList.add('badge-success');
                button.textContent = 'Hoạt động';
            } else {
                button.setAttribute('data-status', 'inactive');
                button.classList.remove('badge-success');
                button.classList.add('badge-danger');
                button.textContent = 'Không hoạt động';
            }
            const link = `/admin/${lastSegment}/change-status/${DataStatus}/${DataID}`;
            const option = {
                method: "PATCH"
            }
            fetch(link,option)
                .then(res=>res.json())
                .then(data => {}) 
        })
    })
}
// end button change status