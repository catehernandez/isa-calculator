/**
 * @author Cate
 *
 * Imported from previous React Project.
 *
 * customStyles for Select element. See react-select docs for more options
 */
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'none',
    border: 'none',
    borderBottom: '2px solid #00D47B',
    borderRadius: 0,
    boxShadow: 'none',
    minWidth: '200px',
    maxWidth: 'max-content',

    '&:hover': {
      cursor: 'pointer',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#00D47B',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided, state, theme) => ({
    ...provided,
    display: state.isSelected ? 'none' : 'block',
    backgroundColor: state.isFocused
      ? 'hsla(154.8,100%,41.6%, 15% )'
      : 'transparent',
    color: 'inherit',

    '&:hover': {
      cursor: 'pointer',
    },
  }),
  singleValue: () => ({
    width: 'auto',
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingRight: 0,
    paddingLeft: 0,
  }),
};

export default customSelectStyles;
