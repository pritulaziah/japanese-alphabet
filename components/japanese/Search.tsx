import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: IProps) => {
  return (
    <div className="relative inline-block mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      </span>
      <input
        className="w-64 bg-gray-700 placeholder:text-gray-400 border border-gray-600 outline-none block py-2 pl-9 pr-3 text-sm rounded-lg focus:border-blue-400 focus:w-80 transition-all"
        type="text"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Поиск"
        value={value}
      />
    </div>
  );
};

export default Search;
