import { useLocation } from "@remix-run/react";
import type { FC } from "react";

type PreserveSearchParamsProps = {
  /**
   * Optionally specifies which search param names should *not* be preserved
   */
  omit?: string | Array<string>;
};

/**
 * A component that renders a hidden input for each search param that is
 * present in the current URL. This is useful for `GET`-`<Form />`s that must
 * not lose current search params on submit.
 *
 * @see https://remix.run/docs/en/v1/guides/data-writes#html-form-get
 */
export const PreserveSearchParams: FC<PreserveSearchParamsProps> = ({ omit }) => {
  const omitArray = Array.isArray(omit) ? omit : typeof omit === "string" ? [omit] : [];

  const location = useLocation();

  const searchParams = [...new URLSearchParams(location.search).entries()].filter(
    ([name]) => !omitArray.includes(name),
  );

  return (
    <>
      {searchParams.map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
    </>
  );
};
