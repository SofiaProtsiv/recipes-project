import PropTypes from 'prop-types';
import sprite from '../../../../assets/icons/sprite.svg';
import cl from './fileInput.module.scss';
import ErrorFormMessage from '../../../ui/ErrorFormMessage';

const FileInput = ({ id, register, onChange, imagePreview, error }) => (
  <div className={cl.wrapper}>
    <input
      type="file"
      {...register}
      accept="image/*"
      onChange={onChange}
      className={cl['file-input']}
      id={id}
    />
    {!imagePreview ? (
      <label htmlFor={id} className={cl['file-input-label']}>
        <svg className={cl['photo-camera-icon']} width={64} height={64}>
          <use href={`${sprite}#photo_camera`}></use>
        </svg>

        <p>Upload a photo</p>
      </label>
    ) : null}

    {imagePreview ? (
      <label htmlFor={id} className={cl['file-input-label-preview']}>
        <img src={imagePreview} className={cl.preview} />
        <p>{imagePreview ? 'Upload another photo' : 'Upload a photo'}</p>
      </label>
    ) : null}
    {error && (
      <ErrorFormMessage addClass={cl['custome-error']} message={error} />
    )}
  </div>
);

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  register: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  imagePreview: PropTypes.string,
  error: PropTypes.string,
};

export default FileInput;
