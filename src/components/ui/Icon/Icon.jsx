import PropTypes from 'prop-types';

{
  /* <Icon id="example" />; */
}
const Icon = ({ id }) => {
  switch (id) {
    case 'example':
      return (
        <svg>
          <path></path>
        </svg>
      );

    default:
      return <svg></svg>;
  }
};

Icon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Icon;
