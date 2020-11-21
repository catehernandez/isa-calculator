import { default as MaterialSlider } from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

//styling from MaterialUI docs
const Slider = withStyles({
  root: {
    height: 2,
    padding: '15px 0',
    width: 300,
  },
  thumb: {},
  active: {},
  valueLabel: {
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#00003F',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(MaterialSlider);

export default Slider;
