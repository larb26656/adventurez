export type TeaTemperature = 'cold' | 'hot'

export type TeaFilter = 'all' | TeaTemperature

export interface Product {
  id: string
  name: string
  price: number
  image: string
  temperature: TeaTemperature
}

export interface CartItem extends Product {
  quantity: number
}

export const products: Product[] = [
  {
    id: 'milk-tea',
    name: 'ชานมไต้หวัน',
    price: 50,
    image: '🧋',
    temperature: 'cold',
  },
  {
    id: 'matcha',
    name: 'ชาเขียวมัทฉะ',
    price: 55,
    image: '🍵',
    temperature: 'hot',
  },
  {
    id: 'thai-tea',
    name: 'ชาไทย',
    price: 45,
    image: '🧡',
    temperature: 'cold',
  },
  {
    id: 'green-hot',
    name: 'ชาเขียวร้อน',
    price: 35,
    image: '🍃',
    temperature: 'hot',
  },
]
