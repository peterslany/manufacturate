import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Select } from "..";
import { Locale } from "../../constants";

interface Props {}

function LocaleChange({}: Props): ReactElement {
  const { locale: currentLocale, locales, push, asPath } = useRouter();

  const localesOptions =
    locales?.map((locale) => ({
      value: locale as Locale,
      label: locale,
    })) || [];
  return (
    <Select<Locale>
      value={currentLocale as Locale}
      name="language"
      options={localesOptions}
      onChange={(locale) => push(asPath, asPath, { locale })}
    />
  );
}

export default LocaleChange;
