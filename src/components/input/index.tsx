import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import type { FieldError } from "react-hook-form";
import { useState, useRef } from "react";
import clsx from "clsx";
import "./style.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  readOnly?: boolean;
  error?: FieldError;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({error, type, readOnly, ...props }: InputProps) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const showHidePassword = () => setShowPassword((prev) => !prev);

  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };

  return type === "hidden" ? (
    <input
      className="form-control text-xs relative py-2.5 w-full"
      name={props.id}
      type={type}
      readOnly={readOnly}
      ref={inputRef}
      {...props}
    />
  ) : (
    <>
      <div
        className={clsx(
          "relative flex items-center pe-2 ps-3 gap-x-1 shadow-sm rounded-md grow border border-border focus-within:border-zinc-400",
          error ? "border-red-400" : "border-border",
        )}
      >
        <input
          className="form-control text-xs relative w-full border-0 outline-0"
          name={props.id}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          autoComplete="off"
          readOnly={readOnly}
          ref={inputRef}
          {...props}
        />
        {type === "password" ? (
          <button
            className="cursor-pointer rounded-md"
            type="button"
            onClick={showHidePassword}
          >
            {showPassword ? (
              <HugeiconsIcon
                icon={ViewOffSlashIcon}
                className="p-1"
                id="icon"
                size={"24px"}
                strokeWidth={2}
              />
            ) : (
              <HugeiconsIcon
                icon={ViewIcon}
                className="p-1"
                id="icon"
                size={"24px"}
                strokeWidth={2}
              />
            )}
          </button>
        ) : null}
        {readOnly ? (
          <button className="cursor-pointer rounded-md" type="button" onClick={copyToClipboard}></button>
        ) : null}
      </div>
      {error && <p className="mt-1 text-red-400 text-xs">{error.message}</p>}
    </>
  );
};

export {Input};