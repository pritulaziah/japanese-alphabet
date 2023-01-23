import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { useForm } from "react-hook-form";
import Input from "components/common/Input";
import Label from "components/common/Label";
import { IWord } from "types/word";
import { useEffect, useContext } from "react";

const getDefaultValues = (word: IWord | null | undefined) => ({
  japanese: word?.japanese || "",
  romaji: word?.romaji || "",
  meaning: word?.meaning || "",
});

type FormValues = {
  japanese: string;
  romaji: string;
  meaning: string;
};

interface IProps {
  word: IWord | null | undefined;
}

const ModalWordContent = ({ word }: IProps) => {
  const isUpdate = word != null;
  const context = useContext(Modal.Context);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({ defaultValues: getDefaultValues(word) });

  useEffect(() => {
    reset(getDefaultValues(word));
  }, [word]);

  return (
    <>
      <Modal.Header>{`${isUpdate ? "Edit" : "Create new"} word`}</Modal.Header>
      <Modal.Body>
        <div className="mb-6">
          <Label>World</Label>
          <Input placeholder="ほん" {...register("japanese")} />
        </div>
        <div className="mb-6">
          <Label>Rōmaji</Label>
          <Input placeholder="hon" {...register("romaji")} />
        </div>
        <div className="mb-6">
          <Label>Meaning</Label>
          <Input placeholder="Книга" {...register("meaning")} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="red" onClick={context.onHide}>
          Cancel
        </Button>
        <Button>Save</Button>
      </Modal.Footer>
    </>
  );
};

export default ModalWordContent;
