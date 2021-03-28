import { ReactElement, useEffect, useState } from "react";
import { ProductCategories } from "../../components";
import Modal from "../../components/Modal";
import { useLocale } from "../../hooks";
import { URLParamValue } from "../../types";

interface Props {
  categories: URLParamValue;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newValues: URLParamValue) => void;
}

function RatingsCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  categories,
}: Props): ReactElement {
  const { Message } = useLocale();

  const [selectedCategories, setSelectedCategories] = useState<URLParamValue>(
    categories
  );

  useEffect(() => {
    setSelectedCategories(categories);
  }, [categories, isOpen]);

  return (
    <Modal
      {...{
        size: "sm",
        isOpen,
        onClose,
        onConfirm: () => onConfirm(selectedCategories),
        headerContent: Message.CHOOSE_SUBCATEGORIES,
      }}
    >
      <ProductCategories
        {...{
          categories: selectedCategories,
          setCategories: setSelectedCategories,
        }}
      />
    </Modal>
  );
}

export default RatingsCategoryModal;
