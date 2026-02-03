import Searchbar from "./searchBar";
import { TSetSearch } from "./schemas/setSearch";

export default function Header({ setSearch }: TSetSearch) {
  return (
    <>
      <div className="min-w-screen flex gap-3">
        <h1 className="pt-1 md:text-2xl font-bold">Movie Maker</h1>
        <div className="flex w-1/2 justify-center ">
          <Searchbar setSearch={setSearch} />
        </div>
        {/* <div className="flex w-1/2 justify-center border-2 border-s-amber-300 h-10">
          <Searchbar />
        </div> */}
      </div>
    </>
  );
}
