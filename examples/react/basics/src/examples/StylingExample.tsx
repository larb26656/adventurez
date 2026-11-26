import styles from './TeaCard.module.css'

export function TeaCard() {
  return <article className={styles.card}>ชานมไต้หวัน</article>
}

export function StylingExample() {
  return (
    <section>
      <h2>จัดหน้า</h2>
      <TeaCard />
    </section>
  )
}
