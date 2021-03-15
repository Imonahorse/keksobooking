const FILE_TYPES = ['jpeg', 'jpg', 'png', 'gif'];
const previewAlt = 'Фотография апартаментов';

const fileAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileApartment = document.querySelector('.ad-form__input');
const previewApartment = document.querySelector('.ad-form__photo');

const createPreviewImg = () => {
  const img = previewAvatar.cloneNode(true);
  img.alt = previewAlt;
  previewApartment.appendChild(img);
  return img;
}

const newPreview = createPreviewImg();

const onPreviewChange = (place, preview) => {
  const file = place.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it))

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    })

    reader.readAsDataURL(file);
  }
}

fileAvatar.addEventListener('change', () => {
  onPreviewChange(fileAvatar, previewAvatar);
});
fileApartment.addEventListener('change', () => {
  onPreviewChange(fileApartment, newPreview);
});
