import { useState } from 'react'
import { Tooltip } from '../components/Tooltip'
import { Icon } from '../components/Icon'
import PropTypes from 'prop-types';
// import { classnames } from '../components/utils';
import styles from './style/style.module.less'

export default function CopyIcon(props) {
  const { text, value, className } = props;
  const [icon, setIcon] = useState('copy');
  function handleCopy() {
    const tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px;"
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setIcon('copy-ok')
    setTimeout(() => {
      setIcon('copy')
    }, 1500);
  }

  return (
    <Tooltip text={text} className={styles.copy}><Icon onClick={handleCopy} className={className} type={icon} /></Tooltip>
  )
}

CopyIcon.defaultProps = {
  text: 'copy'
}

CopyIcon.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string.isRequired,
  className: PropTypes.string
};