import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useLocale } from "../../../hooks";
import RatingUnitForm from "./RatingUnitForm";

interface Props {}

function RatingForm({}: Props): ReactElement {
  const { Message } = useLocale();
  const { register, errors, handleSubmit } = useForm({ mode: "all" });

  return (
    <form>
      <RatingUnitForm
        label={Message.OVERALL}
        name="overall"
        errors={errors}
        register={register}
      />
    </form>
  );
}

export default RatingForm;
