/**
 * Tooltip that always shows value in USD without decimal places
 */
import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const USDTooltip = (props) => {
  const { children, open, value } = props;

  //build in currency method always forces 2 decimal places in USD
  const valueInUSD =
    '$' +
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={valueInUSD}>
      {children}
    </Tooltip>
  );
};

USDTooltip.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

export default USDTooltip;
