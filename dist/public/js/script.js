// aplayer
const aplayer = document.querySelector("#aplayer");
if(aplayer){
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    console.log(dataSong.lyrics);
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        lrcType: 1,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSinger.avatar,
            lrc: dataSong.lyrics
        }],
        autoplay:true,
        volume:0.5
    });
    const avatar = document.querySelector(".singer-detail .inner-play .inner-avatar");
    ap.on('play', function () {
        avatar.style.animationPlayState="running";
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState="paused";
    });
    ap.on('ended', function () {
        const link = `/songs/listen/${dataSong._id}`;
        const option = {
            method: "PATCH"
        }
        fetch(link,option)
            .then(res => res.json())
            .then(data => {
                const spanListen = document.querySelector(".singer-detail .inner-listen span");
                spanListen.innerHTML = `${data.listen} lượt nghe`
            })
    })
}
// end aplayer

// liked
const buttonLike = document.querySelector("[button-like]");
if(buttonLike){
    buttonLike.addEventListener("click", ()=>{
        const idSong = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active");
        
        const typeLike = isActive ? "dislike" : "like"

        const link = `/songs/like/${typeLike}/${idSong}`;
            
        const option = {
            method: "PATCH"
        }

        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                if(data.code==200){
                    const span = buttonLike.querySelector("span");
                    span.innerHTML = `${data.like}`;
    
                    buttonLike.classList.toggle("active");
                }          
            })
    } )
}
// end liked

// button-favorite
const ListbuttonFavorite = document.querySelectorAll("[button-favorite]");
if(ListbuttonFavorite.length>0){
    ListbuttonFavorite.forEach((buttonFavorite)=>{
        buttonFavorite.addEventListener("click",()=>{
            const idSong = buttonFavorite.getAttribute("button-favorite");
            const isActive = buttonFavorite.classList.contains("active");
    
            const typeFavorite = isActive ? "unfavorite" : "favorite"
    
            const link = `/songs/favorite/${typeFavorite}/${idSong}`;
            const option = {
                method: "PATCH"
            }
    
            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    if(data.code==200){
                        buttonFavorite.classList.toggle("active");
                    }
                })
        })
    })
}
// end button-favorite

//search suggest
const BoxSearch = document.querySelector(".header .box-search");
if(BoxSearch){
    const input = BoxSearch.querySelector("input[name='keyword']");
    const boxSuggest = BoxSearch.querySelector(".inner-suggest");

    input.addEventListener("keyup", ()=>{
        const keyword = input.value;
        // Call api 
        const link = `/search/suggest/?keyword=${keyword}`;

        fetch(link)
            .then(res => res.json())
            .then(data => {
                const songs = data.songs;
                if(songs.length > 0){
                    boxSuggest.classList.add("show");

                    const htmls = songs.map(song => {
                        return `
                            <a class="inner-item" href="/songs/detail/${song.slug}">
                                <div class="inner-image"> 
                                    <img src=${song.avatar}>
                                </div>
                                <div class="inner-info">
                                    <div class="inner-title">${song.title}</div>
                                    <div class="inner-singer"> 
                                        <i class="fa-solid fa-microphone-lines"></i> 
                                        ${song.infoSinger.fullName}
                                    </div>
                                </div>
                            </a>
                        `
                    })
                    const ListBox = boxSuggest.querySelector(".inner-list");

                    ListBox.innerHTML = htmls.join("");
                }else{
                    boxSuggest.classList.remove("show");
                }
            })
    });
}
//end search suggest

// xác nhận mật khẩu 
const formRegister = document.querySelector("[form-register]")
if (formRegister) {
    formRegister.addEventListener("submit", (event) => {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        if (password != confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không trùng khớp.");
            event.preventDefault();
        }
    })
}
// kết thúc phần xác nhận mật khẩu
// phần xem mật khẩu
const showPasswordCheckboxes = document.querySelectorAll("[show-password]");
showPasswordCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        const input = this.closest('.form-group').querySelector('input[type="password"], input[type="text"]');
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    });
});
// kết thúc phần xem mật khẩu
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

// up ảnh
// function previewImage(event) {
//     var reader = new FileReader();
//     reader.onload = function(){
//         var output = document.getElementById('imagePreview');
//         output.src = reader.result;
//     };
//     reader.readAsDataURL(event.target.files[0]);
// }
// upload image
const uploadImage = document.querySelector(".upload-image");
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
// end up ảnh