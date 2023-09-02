import generateLetters from '@/utils/generateLetters';
import Row from '@/components/Row';
import Image from 'next/image'


export default function Home() {
  const letters = generateLetters()
  const rows = letters.map((arr, i) => (
		<Row id={`row-${i + 1}`} row={i + 1} key={i + 1} letters={arr} />
	));
	


  return (
    <main>
      {rows}
    </main>
  )
}
