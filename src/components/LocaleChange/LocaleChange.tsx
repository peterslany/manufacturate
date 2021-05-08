import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Locale } from "../../constants";
import { useLocale } from "../../hooks";
import Select from "../Select";

interface Props {
  isHiddenLabel?: boolean;
}

function LocaleChange({ isHiddenLabel }: Props): ReactElement {
  const { Message } = useLocale();
  const { locale: currentLocale, locales, push, asPath } = useRouter();

  const localesOptions =
    locales?.map((locale) => ({
      value: locale as Locale,
      label: locale,
    })) || [];

  return (
    <Select<Locale>
      isHiddenLabel={isHiddenLabel}
      label={Message.LANGUAGE}
      value={currentLocale as Locale}
      name="language"
      options={localesOptions}
      onChange={(locale) => push(asPath, asPath, { locale })}
    />
  );
}

export default LocaleChange;
