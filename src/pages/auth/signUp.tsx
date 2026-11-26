import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useActionState, startTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/button";
import { InputGroup } from "@/components/input";
import { registerAccount, type AuthUser } from "@/services/auth";
import useAuthStore from "@/store/useAuthStore";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "لطفا این قسمت را خالی نگذارید." }),
    email: z.email("ایمیل وارد شده معتبر نیست."),
    password: z.string().min(8, "رمزعبور باید حداقل 8 کاراکتر باشد."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزعبور با تکرار آن برابر نیست.",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

type RegisterState = {
  status: "idle" | "success" | "error";
  message: string | null;
  user: AuthUser | null;
};

const initialState: RegisterState = {
  status: "idle",
  message: null,
  user: null,
};

async function registerAction(
  _previousState: RegisterState,
  data: SignUpValues
): Promise<RegisterState> {
  try {
    const user = await registerAccount(data.name, data.email, data.password);
    await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    return {
      status: "success",
      message: "ثبت‌ نام با موفقیت انجام شد.",
      user,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "ثبت‌ نام انجام نشد. دوباره تلاش کنید.",
      user: null,
    };
  }
}

const SignUp = () => {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpValues> = async (data) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.status === "success" && state.user) {
      setUser(state.user);
      navigate("/", { replace: true });
    }
  }, [state, setUser, navigate]);

  return (
    <main className="w-full max-w-md">
      <div className="mb-6">
        <img src="/media/images/logo.png" alt="logo" width={40} height={40} />
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
          ثبت نام
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputGroup
          id="name"
          label="نام و نام خانوادگی"
          type="text"
          placeholder="مثلاً سارا احمدی"
          autoComplete="name"
          error={errors.name}
          {...register("name")}
        />
        <InputGroup
          id="email"
          label="ایمیل"
          type="email"
          placeholder="name@company.com"
          error={errors.email}
          {...register("email")}
        />
        <InputGroup
          id="password"
          label="رمزعبور"
          type="password"
          error={errors.password}
          placeholder="حداقل ۸ کاراکتر"
          {...register("password")}
        />
        <InputGroup
          id="confirmPassword"
          label="تکرار رمزعبور"
          type="password"
          error={errors.confirmPassword}
          placeholder="رمزعبور را دوباره وارد کنید"
          {...register("confirmPassword")}
        />
        <Button
          type="submit"
          loading={isPending}
          size="lg"
          className="h-12 w-full font-bold mt-3"
        >
          ثبت نام
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        حساب داری؟{" "}
        <Link
          to="/signin"
          className="font-bold text-blue-700 hover:text-blue-800"
        >
          وارد شو
        </Link>
      </p>
    </main>
  );
};

export default SignUp;
