const videoObserver = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){
        document.getElementById("jump-to-top-button").style.display="none";
    }
    else{
        document.getElementById("jump-to-top-button").style.display="inline-block";
    }
});
videoObserver.observe(document.querySelector(".post-container>video"));