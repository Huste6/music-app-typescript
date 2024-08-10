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
                button.textContent = 'Dừng hoạt động';
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

// button-delete
const ButtonDelete = document.querySelectorAll("[button-delete]");
if (ButtonDelete.length > 0) {
    const tbody = document.querySelector("tbody");
    ButtonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const path = window.location.pathname;
            const segments = path.split('/');
            const lastSegment = segments[segments.length - 1];
            const dataId = button.getAttribute("data-id");
            if (confirm("Bạn có chắc muốn xóa mục này không!")) {
                const link = `/admin/${lastSegment}/delete/${dataId}`;
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                fetch(link, options)
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            const tr = button.closest("tr");
                            tbody.removeChild(tr);
                        } else {
                            alert(data.message || "Có lỗi xảy ra!");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("Có lỗi xảy ra!");
                    });
            }
        });
    });
}
// end button-delete

// show alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}
// end show alert

//permission
const tablePermission = document.querySelector("[table-permission]");
if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let Rolepermission = []
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach(row=>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if(name=="id"){
                inputs.forEach(input => {
                    const id = input.value;
                    Rolepermission.push({
                        id:id,
                        permission: []
                    })
                })
            }else{
                let index = 0;
                const permissionInput = row.querySelectorAll("input[type='checkbox']")
                permissionInput.forEach(input=>{
                    if(input.checked){
                        Rolepermission[index].permission.push(name);
                    }
                    index++;
                })
            }
        })
        if(Rolepermission.length > 0){
            const formchangepermission = document.querySelector("#form-change-permission")
            const input = formchangepermission.querySelector("input[name='permissions']")
            input.value = JSON.stringify(Rolepermission);
            formchangepermission.submit();
        }
    })
}
//end permission

// permission data default
const dataRecord = document.querySelector("[data-record]");
if(dataRecord){
    const record = JSON.parse(dataRecord.getAttribute("data-record"))
    const tablePermission = document.querySelector("[table-permission]")
    if(tablePermission){
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            if(name!="id"){
                let index = 0;
                const permissionInput = row.querySelectorAll("input[type='checkbox']")
                permissionInput.forEach(input => {
                    if(record[index].permissions.includes(name)){
                        input.checked = true;
                    }
                    index ++;
                })
            }
        })
    }
}
// end permission data default