import { TSetSearch } from "./schemas/setSearch";
export default function Searchbar({ setSearch }: TSetSearch) {
  return (
    <div className="flex w-full sm:w-[400px] sm:justify-center  h-2">
      <input
        className="rounded-xl p-4 w-full border-amber-200 bg-gray-200  placeholder:p-5"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
