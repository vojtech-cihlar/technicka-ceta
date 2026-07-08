import PhotoSwipeLightbox from "../libs/photoswipe/photoswipe-lightbox.esm.js";

const button = document.getElementById("galleryButton");

const folder = button.dataset.gallery;
const count = Number(button.dataset.count);

const dataSource = [];

for (let i = 1; i <= count; i++) {

    dataSource.push({
        src: `${folder}${i}.jpg`,
        width: 1600,
        height: 900
    });

}

const lightbox = new PhotoSwipeLightbox({

    dataSource,

    pswpModule: () =>
        import("../libs/photoswipe/photoswipe.esm.js")

});

button.addEventListener("click", () => {

    lightbox.loadAndOpen(0);

});