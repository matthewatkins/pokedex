import Link from "next/link";
import styles from "../styles/PokemonDetail.module.css";

export default function PokemonDetail({pokemonData, image}) {
  return (
    <>
      <div className={styles.container}>
        <Link href="/">
          <a><img src="/left-arrow.svg" className="left-arrow" /></a>
        </Link>
        <main className={styles.main}>
          <h1 className={styles.title}>{pokemonData.name.replace(/-/g, ' ')}</h1>
          <div className={styles.types}>
            {pokemonData.types.map((type, index) => <span className={styles.tag} key={index}>{type.type.name}</span>)}
          </div>
          <div className={styles.pokemonImage}>
            <img className={styles.pokemon} src={image} alt={pokemonData.name} />
            <div className={styles.titleBG}>{pokemonData.name.replace(/-/g, ' ')}</div>
          </div>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { pokemon } = context.query;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const pokemonData = await res.json();

  const paddedId = ('00' + pokemonData.id).slice(-3);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;

  return { props: { pokemonData, image } };
}