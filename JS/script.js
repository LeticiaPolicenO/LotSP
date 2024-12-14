function menuAparecer(){
    let menuMobile = document.querySelector(".mobileMenu");
    if(menuMobile.classList.contains("open")){
        menuMobile.classList.remove("open")
    }else{
        menuMobile.classList.add("open")
    }
}