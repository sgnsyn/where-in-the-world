async function getData() {
  const data = await fetch("./data.json").catch((err) => console.log(err));
  const results = await data.json();
  return results;
}
