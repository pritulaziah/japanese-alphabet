import { useCallback, useState } from "react";
import clsx from "clsx";
import { AlphabetCharacter } from "types/alphabet";
import kana from "kana.json";
import useStore from "hooks/useStore";
import Search from "components/common/Search";
import Modal from "components/common/Modal";
import Character from "../Character";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "components/common/Spinner";
import { Cell } from "./Table.interface";
import { getCharacterClsxFromCells, isFoundChar } from "./utils";
import { rows, columns } from "./constants";

const DynamicCharacterContent = dynamic(
  () => import("components/alphabet/Table/CharacterContent"),
  {
    suspense: true,
    ssr: false,
  }
);

const Table = () => {
  const { state } = useStore();
  const { form, visibleTypes } = state;
  const [searchValue, setSearchValue] = useState("");
  const [activeChar, setActiveChar] = useState<AlphabetCharacter | null>(null);
  const getCharacterClsx = getCharacterClsxFromCells(rows, columns);

  const onChangeSearchValue = (newValue: string) => setSearchValue(newValue);

  const renderHeaderCells = (cells: Cell[], className: string) => {
    return cells
      .filter((cell) => !cell.hidden)
      .map((cell) => (
        <div
          key={cell.name || cell.value}
          className={clsx(
            "items-center justify-center p-3 hidden md:flex",
            cell.className,
            className
          )}
        >
          <span>{cell.name != null ? cell.name : cell.value}</span>
        </div>
      ));
  };

  const closeModal = useCallback(() => setActiveChar(null), []);

  return (
    <div className="flex flex-1 flex-col px-6 py-4">
      <Search value={searchValue} onChange={onChangeSearchValue} />
      <div className="grid gap-2 grid-cols-5 md:grid-cols-table">
        {renderHeaderCells(rows, "col-start-1 col-end-2")}
        {(kana as unknown as AlphabetCharacter[]).map((alphabetCharacter) => {
          const currentForm = alphabetCharacter[form];
          const className = getCharacterClsx(alphabetCharacter);
          const active =
            isFoundChar(alphabetCharacter, searchValue) &&
            visibleTypes.includes(alphabetCharacter.type);

          return className ? (
            <Character
              key={alphabetCharacter.romaji}
              char={currentForm}
              romaji={alphabetCharacter.romaji}
              ru={alphabetCharacter.ru}
              className={className}
              active={active}
              onClick={() => setActiveChar(alphabetCharacter)}
            />
          ) : null;
        })}
        {renderHeaderCells(columns, "row-start-1 row-end-1")}
      </div>
      <Modal show={!!activeChar} onHide={closeModal}>
        {activeChar && (
          <Suspense fallback={<Spinner size="lg" />}>
            <DynamicCharacterContent character={activeChar} form={form} />
          </Suspense>
        )}
      </Modal>
    </div>
  );
};

export default Table;
