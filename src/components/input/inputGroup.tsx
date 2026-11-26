import * as React from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LockKeyIcon,
  Mail01Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { type FieldError } from "react-hook-form";
import Input from './input';
import { Label } from '../label';



export default function InputGroup({
  id,
  label,
  type,
  error,
  ...props
}: React.ComponentProps<'input'> & {label: string; error?: FieldError;}) {
  const [visible, setVisible] = React.useState(false);
  const isPassword = type === "password";
  const icon =
    type === "email" ? Mail01Icon : type === "text" ? UserIcon : LockKeyIcon;
  return (
    <div  className="block space-y-2">
     <Label htmlFor={id} className="text-sm font-normal text-slate-700 mb-1.5 inline-block">{label}</Label>
      <div className="relative">
        <HugeiconsIcon
          icon={icon}
          size={19}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          id={id}
          name={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={error ? "true" : "false"}
          variant="lg"
          {...props}
          className="pr-11"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "پنهان کردن گذرواژه" : "نمایش گذرواژه"}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700"
          >
            <HugeiconsIcon icon={visible ? ViewOffIcon : ViewIcon} size={19} />
          </button>
        )}
      </div>
      {error && <p className='text-xs text-red-400'>{error.message}</p>}
    </div>
  );
}

