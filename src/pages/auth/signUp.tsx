import { Input } from "../../components";


const SignUp = () => {
    return (
        <form className="flex flex-col gap-5 p-5 border border-gray-200 bg-white rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold">ثبت نام</h1>
            <Input
                label="ایمیل"
                id={`username`}
                type="email"
            />
            <Input
                label="رمزعبور"
                id={`password`}
                type="password"
            />
            <Input
                label="تکرار رمزعبور"
                id={`password`}
                type="password"
            />
            <button className="bg-primary w-full rounded-sm h-8.5 text-white" type="button">ثبت نام</button>
        </form>
    )
}

export default SignUp;