/* eslint-disable no-console */
import { useEffect, useRef } from "react";
// TODO: DELETE
/**
 * Based on https://usehooks.com/useWhyDidYouUpdate/
 *
 * @param name a key to identify console group
 * @param props object to persist and compare
 */
export default function useWhyDidYouUpdate(
  name: string,
  props: Record<string, unknown>
) {
  const previousProps = useRef<Record<string, unknown>>();

  useEffect(() => {
    const { current } = previousProps;
    if (current) {
      const allKeys = Object.keys({ ...current, ...props });
      const changesObj: Record<string, unknown> = {};
      allKeys.forEach((key) => {
        if (current[key] !== props[key]) {
          changesObj[key] = {
            from: current[key],
            to: props[key],
          };
        }
      });

      console.group(
        `%c[why-did-you-update] %c${name}`,
        "font-weight: bold;",
        "color: dodgerblue; font-weight: bold;"
      );
      if (Object.keys(changesObj).length) {
        console.table(changesObj);
      } else {
        console.log("Something else changed.");
      }
      console.groupEnd();
    }

    previousProps.current = props;
  });
}
