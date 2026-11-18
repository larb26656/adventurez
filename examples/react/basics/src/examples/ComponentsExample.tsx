export function ProductCard() {
  return (
    <article>
      <h2>ชานมไต้หวัน</h2>
      <p>฿50</p>
    </article>
  )
}

export function TeaHeading() {
  return (
    <>
      <h1>เมนูชา</h1>
      <p>ราคาเป็นบาท</p>
    </>
  )
}

export function ComponentsExample() {
  return (
    <section>
      <TeaHeading />
      <ProductCard />
      <ProductCard />
    </section>
  )
}
