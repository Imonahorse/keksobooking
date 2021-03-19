const FILE_TYPES = ['jpeg', 'jpg', 'png', 'gif'];
const DEFAULT_SRC = 'img/muffin-grey.svg';
const PREVIEW_SIZE = 70;

const avatarUploader = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housingPhotoUploader = document.querySelector('.ad-form__input');
const housingPhotoContainer = document.querySelector('.ad-form__photo');

const createImg = () => {
  const img = document.createElement('img');
  img.src = DEFAULT_SRC;
  img.width = PREVIEW_SIZE;
  img.height = PREVIEW_SIZE;
  housingPhotoContainer.appendChild(img);
  return img;
}

const housingPhotoPreview = createImg();

const onPreviewChange = (input, preview) => {
  return () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      })

      reader.readAsDataURL(file);
    }
  }
}

const clearPreview = () => {
  avatarPreview.src = DEFAULT_SRC;
  housingPhotoPreview.src = DEFAULT_SRC;
}

avatarUploader.addEventListener('change', onPreviewChange(avatarUploader, avatarPreview));
housingPhotoUploader.addEventListener('change', onPreviewChange(housingPhotoUploader, housingPhotoPreview));

export {clearPreview};
