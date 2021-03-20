import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface Props {}

function LocaleChange({}: Props): ReactElement {
  const { locale: currentLocale, locales, push, asPath } = useRouter();

  return (
    <div>
      <Select
        value={currentLocale}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          push(asPath, asPath, { locale: event.target.value })
        }
      >
        {(locales || []).map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default LocaleChange;
