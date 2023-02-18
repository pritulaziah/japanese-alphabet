import Button from "components/common/Button";
import LoadingButton from "components/common/LoadingButton";
import Modal from "components/common/Modal";
import { useForm } from "react-hook-form";
import Input from "components/common/Input";
import InputLabel from "components/common/InputLabel";
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
    formState: { isSubmitting, errors, isDirty },
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
            <InputLabel error={!!errors.japanese}>World</InputLabel>
            <Input
              placeholder="ほん"
              error={!!errors.japanese}
              {...register("japanese", { required: true })}
            />
            {errors.japanese?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Japanese is required
              </p>
            )}
          </div>
          <div className="mb-6">
            <InputLabel error={!!errors.romaji}>Rōmaji</InputLabel>
            <Input
              placeholder="hon"
              error={!!errors.romaji}
              {...register("romaji", { required: true })}
            />
            {errors.romaji?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Romaji is required
              </p>
            )}
          </div>
          <div className="mb-6">
            <InputLabel error={!!errors.meaning}>Meaning</InputLabel>
            <Textarea
              placeholder="Книга"
              rows={4}
              error={!!errors.meaning}
              {...register("meaning", { required: true })}
            />
            {errors.meaning?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Meaning is required
              </p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="red" onClick={context.onHide}>
          Cancel
        </Button>
        <LoadingButton
          onClick={onSubmit}
          disabled={!isDirty}
          isLoading={isSubmitting}
        >
          Save
        </LoadingButton>
      </Modal.Footer>
    </>
  );
};

export default ModalWordContent;
