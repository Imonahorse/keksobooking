const FILE_TYPES = ['jpeg', 'jpg', 'png', 'gif'];
const DEFAULT_SRC = 'img/muffin-grey.svg';
const REVIEW_SIZE = 70;

const avatarUploader = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housingPhotoUploader = document.querySelector('.ad-form__input');
const housingPhotoContainer = document.querySelector('.ad-form__photo');
const housingPhotoPreview = document.createElement('img');
housingPhotoPreview.width = REVIEW_SIZE;
housingPhotoPreview.height = REVIEW_SIZE;

const clearPreview = () => {
  avatarPreview.src = DEFAULT_SRC;
  housingPhotoPreview.remove();
}

const onPreviewChange = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      housingPhotoContainer.appendChild(housingPhotoPreview);
      preview.src = reader.result;
    })

    reader.readAsDataURL(file);
  }
}

avatarUploader.addEventListener('change', () => {
  onPreviewChange(avatarUploader, avatarPreview);
});
housingPhotoUploader.addEventListener('change', () => {
  onPreviewChange(housingPhotoUploader, housingPhotoPreview);
});

export {clearPreview};
