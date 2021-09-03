import { useState, useCallback, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from 'lodash.debounce';
import { IKContext, IKImage } from 'imagekitio-react'
import { motion } from 'framer-motion';

import Link from 'next/link';
import Head from 'next/head'
import { PokeSpinner } from '../components/pokeSpinner';
import styles from '../styles/Home.module.css'

export default function Home({pokemons}) {
  const [allPokemon, setAllPokemon] = useState(pokemons);
  const [morePokemon, setMorePokemon] = useState(true);
  const [search, setSearch] = useState('');

  // lazy load
  // const getMorePokemon = async () => {
  //   if(allPokemon.length >= 898) {
  //     setMorePokemon(false);
  //     setAllPokemon(allPokemon.slice(0, 898));
  //     return;
  //   }

  //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${allPokemon.length}`);
  //   const newPokemon = await res.json();

  //   setAllPokemon((pokemon) => [...pokemon, ...newPokemon.results]);
  // };

  // search
  // const [searchAPI, setSearchAPI] = useState(false);
  // const [searchedPokemon, setSearchedPokemon] = useState([]);
  // console.log(searchedPokemon);

  // const searchForPokemon = debounce(async (search) => {
  //   if(search.length) {
  //     const res = await fetch(`http://localhost:3000/api/search?name=${search}`);
  //     try {
  //       const pokemon = await res.json();
  //       setSearchedPokemon(pokemon);
  //     } catch (error) {
  //       console.log('error searching pokemon');
  //     }
  //   } else {
  //     setSearchedPokemon([]);
  //   }
  // }, 1000);

  // adding a function to check if searched pokemon is already loaded
  // if it is, then don't fetch it again
  // const pokemonCurrentlyExists = (query) => {
  //   return allPokemon.some(function (pokemon) {
  //     let pokemonExists = pokemon.name === query;

  //     return pokemonExists;
  //   });
  // }

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
    // if(!pokemonCurrentlyExists(event.target.value)) {
    //   searchForPokemon(event.target.value);
    // }
  }, []);

  // useEffect(() => {
  //   if(searchedPokemon) {
  //     setAllPokemon(prev => [...prev, searchedPokemon]);
  //   } else {
  //     setAllPokemon(pokemons);
  //   }
  // }, [searchedPokemon]);

  return (
    <div className={`${styles.container} ${styles.hasBG}`}>
      <Head>
        <title>Junedex</title>
        <meta name="description" content="Pokedex app" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          <input type="search" name="search" id="search" className={styles.search} onChange={handleSearch} value={search} placeholder="Search for a pokemon" autoComplete="off" />
        </p>

        <div className={styles.grid}>
        {/* <InfiniteScroll
          dataLength={allPokemon.length}
          next={getMorePokemon}
          hasMore={morePokemon}
          loader={<PokeSpinner />}
          endMessage={<span className={styles.endMessage}>No more Pokemon!</span>}
          className={styles.grid}
        > */}
          <IKContext urlEndpoint="https://ik.imagekit.io/n7nxxqwkxic">
            {allPokemon
              .filter(pokemon => pokemon.name?.toLowerCase().includes(search.toLowerCase()))
              .map((pokemon, index) => (
                <Link href="/[pokemon]" as={`/${pokemon.name}`} key={index}>
                  <motion.a
                    className={styles.card}
                    initial={{
                      opacity: 0,
                      translateY: 100,
                    }}
                    animate={{
                      opacity: 1,
                      translateY: 0,
                    }}
                    transition={{
                      duration: 0.06,
                      delay: index * 0.06,
                    }}
                  >
                    {/* {index <= 897 && <img src={`https://ik.imagekit.io/n7nxxqwkxic/pokemons/tr:w-200/${pokemon.name}.png`} alt={pokemon.name} />} */}
                    {index <= 897 && (
                      <IKImage
                        path={`/pokemons/${pokemon.name}.png`}
                        transformation={[{height:200,width:200}]}
                        lqip={{active:true}}
                        loading="lazy"
                        height="200"
                        width="200"
                        alt={pokemon.name}
                      />
                    )}
                    <p className={styles.title} style={{ textTransform: 'capitalize' }}>{pokemon.name?.replace(/-/g, ' ')}</p>
                  </motion.a>
                </Link>
              )
            )}
          </IKContext>
          {/* </InfiniteScroll> */}
          </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; Junemon</p>
      </footer>
    </div>
  )

}

export async function getStaticProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898'); // limit to 898 max
  const { results } = await res.json();

  const pokemons = results.map((pokemon, index) => {
    return { ...pokemon };
  });

  return {
    props: {
      pokemons,
    },
  }
}
