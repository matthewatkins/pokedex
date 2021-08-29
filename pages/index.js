// import useSWR from 'swr';
// import useInView from "react-cool-inview";
import Link from 'next/link';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({pokemons}) {
  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  // const { data, error } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=1200', fetcher)

  return (
    <div className={styles.container}>
      <Head>
        <title>Junemon</title>
        <meta name="description" content="Pokedex app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Junemon
        </h1>

        <p className={styles.description}>
          <input type="text" name="search" id="search" />
        </p>

        <div className={styles.grid}>
          {pokemons.map((pokemon, index) => (
            <Link href="/[pokemon]" as={`/${pokemon.name}`} className="card" key={index}>
              <a>
                <img src={pokemon.image} alt={pokemon.name} />
                <p style={{textTransform: 'capitalize'}}>{pokemon.name}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; Junemon</p>
      </footer>
    </div>
  )

}

export async function getStaticProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
  const {results} = await res.json()
  const pokemons = results.map((pokemon, index) => {
    const paddedId = ('00' + (index + 1)).slice(-3);

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return { ...pokemon, image };
  });

  return {
    props: {
      pokemons,
    },
  }
}
