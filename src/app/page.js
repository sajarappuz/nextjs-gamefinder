import Image from "next/image"

async function getData() {
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  const  data = await res.json()
  return data.results

}
 
export default async function Page() {
  const games = await getData();
  console.log(games)
  return (
    <main >
      <div className="bg-white w-[90%] h-[60px] mx-auto mt-10 flex items-center justify-between border-none rounded-[10px]">
        <div className="ml-20" >
          <h1 className="">WIZZMOVIES.IO</h1>
        </div>
        <div className="hidden md:block" >
          <ul className="flex gap-20 mr-10">
            <li>Home</li>
            <li>Purchases</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="m-20 grid grid-cols-4  gap-12  ">
        {games.map((game)=>(
          <div className="col-span-4  md:col-span-2" key={game.id}>
               <h1 className="text-white text-[30px] uppercase mb-5">{game.name}</h1>
               <div className="aspect-video relative mb-">
               <Image src={game.background_image} fill={true}
               className="object-cover rounded-md " alt={game.name} />
                
               </div>
               <div className="flex justify-evenly items-center mt-10">
               <p className="text-white">📅{game.released}</p>
               <p className="text-white ">⭐{game.rating}</p>
               </div>
          </div>

        ))}</div>
        </main>
  );
}