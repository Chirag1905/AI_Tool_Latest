import { useGlobal } from './context'
import styles from './style/chat.module.less'

export default function ConfigInfo() {
  const { options } = useGlobal()
  const { max_tokens, apiKey, temperature, baseUrl, organizationId, top_p, model } = options?.openai || {}
  return (
    <div className={styles.info}>
      <div>model:{model}</div>
      <div>maxTokens:{max_tokens}</div>
      <div>temperature:{temperature}</div>
      <div>top_p:{top_p}</div>
    </div>
  )
}
