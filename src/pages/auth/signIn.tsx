import { useActionState, useEffect, startTransition } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { InputGroup } from "@/components/input";
import { authenticate, type AuthUser } from "@/services/auth";
import useAuthStore from "@/store/useAuthStore";
import { z } from "zod";

const signInSchema = z.object({
  username: z.string("نام کاربری را وارد کنید"),
  password: z.string(""),
});

type SignInValues = z.infer<typeof signInSchema>;

type LoginState = {
  status: "idle" | "success" | "error";
  message?: string;
  user: AuthUser | null;
};

const initialState: LoginState = {
  status: "idle",
  user: null,
};

const loginAction = async (_previousState: LoginState, data: SignInValues): Promise<LoginState> => {
  try {
    const user = await authenticate(data.username, data.password);
    return {
      status: "success",
      user,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "مشکلی پیش آمده است. لطفا دوباره تلاش کنید.",
      user: null,
    };
  }
};

const SignIn = () => {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();
  const destination =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: "admin@admin.com",
      password: "admin"
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInValues> = async (data) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.status === "success" && state.user) {
      setUser(state.user);
      navigate(destination, { replace: true });
    }
  }, [state, setUser, navigate, destination]);

  return (
    <main className="w-full max-w-md">
      <div className="mb-8">
        <img src="/media/images/logo.png" alt="logo" width={40} height={40} />
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
          ورود
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputGroup
          id="username"
          label="نام کاربری"
          type="text"
          autoComplete="username"
          error={errors.username}
          {...register("username")}
        />
        <InputGroup
          id="password"
          label="رمز عبور"
          type="password"
          autoComplete="password"
          error={errors.password}
          {...register("password")}
        />

        <Button
          type="submit"
          loading={isPending}
          size="lg"
          className="h-12 w-full text-sm font-bold shadow-lg shadow-blue-700/15"
        >
          ورود به حساب
        </Button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-500">
        هنوز حساب نداری؟{" "}
        <Link
          to="/signup"
          className="font-bold text-blue-700 hover:text-blue-800"
        >
          ثبت‌نام کن
        </Link>
      </p>
    </main>
  );
};

export default SignIn;
