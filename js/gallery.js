import PhotoSwipeLightbox from "../libs/photoswipe/photoswipe-lightbox.esm.js";

const galleryButton = document.getElementById("galleryButton");

if (!galleryButton) {
    throw new Error("Gallery button nebyl nalezen.");
}

const folder = galleryButton.dataset.gallery;
const count = Number(galleryButton.dataset.count);

async function createDataSource() {

    const dataSource = [];

    for (let i = 1; i <= count; i++) {

        const src = `${folder}${i}.jpg`;

        const image = new Image();

        image.src = src;

        await new Promise(resolve => {

            image.onload = resolve;
            image.onerror = resolve;

        });

        dataSource.push({

            src,

            width: image.naturalWidth || 1600,

            height: image.naturalHeight || 900

        });

    }

    return dataSource;

}

async function initGallery() {

    const dataSource = await createDataSource();

    const lightbox = new PhotoSwipeLightbox({

        dataSource,

        pswpModule: () =>
            import("../libs/photoswipe/photoswipe.esm.js"),

        showHideAnimationType: "fade",

        bgOpacity: 0.88

    });

    lightbox.init();

    galleryButton.addEventListener("click", () => {

        lightbox.loadAndOpen(0);

    });

}

initGallery();