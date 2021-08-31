import Head from 'next/head';
import Link from "next/link";
import { dmToFt, hgToLbs } from '../utils/conversions';
import styles from "../styles/PokemonDetail.module.css";

export default function PokemonDetail({ pokemonData, pokemonSpeciesData, image }) {
  const enName = pokemonSpeciesData.names.find(name => name.language.name === 'en').name;
  const jName = pokemonSpeciesData.names.find(name => name.language.name === 'ja').name;


  return (
    <>
      <Head>
        <title>{pokemonData.name.replace(/-/g, ' ')} - Junedex</title>
      </Head>

      <div className={styles.container}>
        <Link href="/">
          <a><img src="/left-arrow.svg" className="left-arrow" /></a>
        </Link>
        <main className={styles.main}>
          {/* <h1 className={styles.title}><span className={styles.hashtag}>#{('00' + pokemonData.id).slice(-3)}</span>{enName}</h1>

          <div className={styles.types}>
            {pokemonData.types.map((type, index) => <span className={styles.tag} key={index}>{type.type.name}</span>)}
          </div> */}

          <div className={styles.pokemonImage}>
            <img className={styles.pokemon} src={image} alt={pokemonData.name} />
            <div className={styles.titleBG}>{jName}</div>
          </div>

          <div className={styles.card}>
            <h1 className={styles.title}>
              <span className={styles.hashtag}>#{('00' + pokemonData.id).slice(-3)}</span>
              {enName}
            </h1>

            <div className={styles.types}>
              {pokemonData.types.map((type, index) => <div className={styles.tag} key={index}>{type.type.name}</div>)}
            </div>

            <p>{pokemonSpeciesData.flavor_text_entries[10].flavor_text}</p>
            <h3>Abilities</h3>
            {pokemonData.abilities.map((ability, index) => {
              return !ability.is_hidden && <p className={styles.ability} key={index}>{ability.ability.name}</p>
            })}

            <h3>Height / Weight</h3>
            <p>{dmToFt(pokemonData.height)} / {hgToLbs(pokemonData.weight)}</p>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>&copy; Junemon</p>
        </footer>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { pokemon } = context.query;

  const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const pokeSpeciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
  const pokemonData = await pokeRes.json();
  const pokemonSpeciesData = await pokeSpeciesRes.json();

  const image = `https://ik.imagekit.io/n7nxxqwkxic/pokemons/${pokemonData.name}.png`;

  return { props: { pokemonData, pokemonSpeciesData, image } };
}