
import Notification from 'rc-notification'
import Icon from '../Icon'
import 'rc-notification/assets/index.css'
import './index.less'

const xMessage = (function () {
  let message = null

  const iconType = {
    success: 'FaRegCheckCircle',
    warning: 'FaRegMeh',
    info: 'FaRegLightbulb',
    error: 'FaRegTimesCircle'
  }

  const pop = (config) => {
    const {
      type,
      className,
      duration = 4.5,
      getContainer = () => document.body,
      icon,
      key,
      content,
      onClose,
      onClick,
      top,
      closable = true,
      closeIcon
    } = config
    message.notice({
      content: <div className={classnames('xMessage', className)}>
        {
          (icon || ['info', 'success', 'error', 'warning'].indexOf(type) > -1) &&
          <div className={classnames('iconWrap', type)}>
            {
              icon ? icon : <Icon type={iconType[type]} />
            }
          </div>
        }
        <div className="xNoticeTit">
          {content}
        </div>
      </div>,
      key,
      closable,
      getContainer,
      onClose() {
        onClose && onClose()
      },
      onClick() {
        onClick && onClick()
      },
      closeIcon,
      duration,
      style: { top }
    })
  }

  /**
     * 
     * @param {duration} number 
     * @param {getContainer} HTMLNode 
     * @param {closeIcon} HTMLNode 
  */
  const config = (config) => {
    const { duration, getContainer, closeIcon } = config

    Notification.newInstance({
      getContainer: getContainer,
      duration: duration || 4.5,
      closeIcon
    }, (notice) => message = notice)
  }

  const remove = (key) => {
    message.removeNotice(key)
  }

  const destroy = () => {
    message.destroy()
  }

  if (message) {
    return {
      config,
      pop,
      remove,
      destroy
    }
  }
  // 如果为创建实例，则创建默认实例
  Notification.newInstance({}, (notice) => message = notice)

  return {
    config,
    pop,
    remove,
    destroy
  }
})()

export default xMessage