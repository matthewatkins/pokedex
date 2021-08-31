export default async (req, res) => {
  const filterQueryName = await req.query.name ? new RegExp(req.query.name) : '';

  const response = await fetch(`https://www.pokeapi.co/api/v2/pokemon/${filterQueryName}`);
  const filteredPokemons = await response.json();

  res.setHeader("Content-Type", "application/json");

  return res
    .status(200)
    .json(filteredPokemons);
};