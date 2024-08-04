// aplayer
const aplayer = document.querySelector("#aplayer");
if(aplayer){
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);
    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSinger.avatar
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
                const span = buttonLike.querySelector("span");
                span.innerHTML = `${data.like}`;

                buttonLike.classList.toggle("active");
            })
    } )
}
// end liked