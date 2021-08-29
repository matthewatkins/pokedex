import { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Link from 'next/link';
import Head from 'next/head'
import { PokeSpinner } from '../components/pokeSpinner';
import styles from '../styles/Home.module.css'

export default function Home({pokemons}) {
  const [allPokemon, setAllPokemon] = useState(pokemons);
  const [morePokemon, setMorePokemon] = useState(true);

  const getMorePokemon = async () => {
    if(allPokemon.length >= 898) {
      setMorePokemon(false);
      setAllPokemon(allPokemon.slice(0, 898));
      return;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${allPokemon.length}`);
    const newPokemon = await res.json();

    setAllPokemon((pokemon) => [...pokemon, ...newPokemon.results]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Junemon</title>
        <meta name="description" content="Pokedex app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Junémon
        </h1>

        {/* <p className={styles.description}>
          <input type="text" name="search" id="search" />
        </p> */}

        <div>
        <InfiniteScroll
          dataLength={allPokemon.length}
          next={getMorePokemon}
          hasMore={morePokemon}
          loader={<PokeSpinner />}
          endMessage={<span className={styles.endMessage}>No more Pokemon!</span>}
          className={styles.grid}
        >
          {allPokemon.map((pokemon, index) => (
            <Link href="/[pokemon]" as={`/${pokemon.name}`} key={index}>
              <a className={styles.card}>
                {index <= 897 && <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${('00' + (index + 1)).slice(-3)}.png`} alt={pokemon.name} />}
                <p className={styles.title} style={{textTransform: 'capitalize'}}>{pokemon.name.replace(/-/g, ' ')}</p>
              </a>
            </Link>
          ))}
          </InfiniteScroll>
          </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; Junemon</p>
      </footer>
    </div>
  )

}

export async function getStaticProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20'); // limit to 898 max
  const { results } = await res.json();

  const pokemons = results.map((pokemon, index) => {
    // const paddedId = ('00' + (index + 1)).slice(-3);

    // const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return { ...pokemon };
  });

  return {
    props: {
      pokemons,
    },
  }
}
