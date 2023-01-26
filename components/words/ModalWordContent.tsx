import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { useForm } from "react-hook-form";
import Input from "components/common/Input";
import Label from "components/common/Label";
import { IWord } from "types/word";
import { useEffect, useContext } from "react";
import axios from "axios";
import Textarea from "components/common/Textarea";

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
  refetch: () => void;
}

const ModalWordContent = ({ word, refetch }: IProps) => {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/words", {
        japanese: data.japanese,
        romaji: data.romaji,
        meaning: data.meaning,
      });
      refetch();
      context.onHide();
    } catch (error) {}
  });

  return (
    <>
      <Modal.Header>{`${isUpdate ? "Edit" : "Create new"} word`}</Modal.Header>
      <Modal.Body>
        <div className="p-1">
          <div className="mb-6">
            <Label>World</Label>
            <Input
              placeholder="ほん"
              {...register("japanese", { required: true })}
            />
          </div>
          <div className="mb-6">
            <Label>Rōmaji</Label>
            <Input
              placeholder="hon"
              {...register("romaji", { required: true })}
            />
          </div>
          <div className="mb-6">
            <Label>Meaning</Label>
            <Textarea
              placeholder="Книга"
              {...register("meaning", { required: true })}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="red" onClick={context.onHide}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Save</Button>
      </Modal.Footer>
    </>
  );
};

export default ModalWordContent;
