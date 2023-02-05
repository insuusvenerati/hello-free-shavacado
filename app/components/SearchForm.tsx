import { Form, useSearchParams } from "@remix-run/react";
import type { InputHTMLAttributes } from "react";
import { useEffect, useRef } from "react";

type SearchFromProps = { label?: string } & InputHTMLAttributes<HTMLInputElement>;

export const SearchForm = ({ label, ...rest }: SearchFromProps) => {
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Form method="get" className="form-control w-full">
      <label className="input-group">
        {label}
        {search && (
          <>
            <button
              title="clear"
              type="button"
              className="btn btn-square"
              onClick={() => {
                setParams(new URLSearchParams());
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        )}
        <input ref={inputRef} defaultValue={search} name="search" type="text" {...rest} />
        <button title="submit" type="submit" className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </label>
    </Form>
  );
};
