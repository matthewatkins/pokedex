import Link from "next/link";

export default function PokemonDetail({pokemonData, image}) {
  return (
    <>
      <Link href="/">
        <a>Back</a>
      </Link>
      <img src={image} alt={pokemonData.name} />
      <h1>{pokemonData.name}</h1>
      {pokemonData.types.map((type, index) => <p key={index}>{type.type.name} type</p>)}
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