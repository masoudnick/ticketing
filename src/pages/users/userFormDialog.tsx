import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { useState, type SubmitEvent, type ReactNode } from "react";
import type { ManagedUser, UserFormValues } from '@/types/user';
import { Button } from '@/components/button';
import { Input } from '@/components/input';


const emptyForm: UserFormValues = {
    name: '',
    email: '',
    mobile: '',
    role: '',
    department: '',
    status: 'active',
};

const formFromUser = (user: ManagedUser | null): UserFormValues => user ? {
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    department: user.department,
    status: user.status,
} : emptyForm;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span>{children}</label>;
}

const userRoles = ["A", "B"];
const userDepartments = ["A", "B"];

export const UserFormDialog = ({
    user,
    open,
    onOpenChange,
    onSave,
}: {
    user: ManagedUser | null;
    open: boolean;
    onOpenChange: (value: boolean) => void;
    onSave: (value: UserFormValues) => void;
}) => {
    const [form, setForm] = useState<UserFormValues>(() => formFromUser(user));

    const update = <K extends keyof UserFormValues>(key: K, value: UserFormValues[K]) => {
        setForm((current) => ({ ...current, [key]: value }));
    };

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(form);
        setForm(emptyForm);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent size="xl" className="max-h-[92vh] overflow-y-auto p-6 sm:p-8">
                <DialogHeader className="mb-6 border-b border-border pb-5">
                    <DialogTitle>{user ? 'ویرایش کاربر' : 'تعریف کاربر جدید'}</DialogTitle>
                    <DialogDescription>{user ? 'اطلاعات دسترسی و مشخصات کاربر را به‌روز کنید.' : 'کاربر جدید را به داشبورد تیکتینگ اضافه کنید.'}</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="نام و نام خانوادگی"><Input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="مثلاً نیما صالحی" /></Field>
                        <Field label="شماره همراه"><Input required value={form.mobile} onChange={(event) => update('mobile', event.target.value)} placeholder="۰۹۱۲ ..." /></Field>
                        <Field label="ایمیل سازمانی"><Input required dir="ltr" className="text-left" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="name@company.ir" /></Field>
                        <Field label="نقش کاربری"><Select value={form.role} onValueChange={(value) => update('role', value)}><SelectTrigger><SelectValue placeholder="نقش کاربر را انتخاب کنید" /></SelectTrigger><SelectContent>{userRoles.map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}</SelectContent></Select></Field>
                        <Field label="واحد سازمانی"><Select value={form.department} onValueChange={(value) => update('department', value)}><SelectTrigger><SelectValue placeholder="واحد سازمانی را انتخاب کنید" /></SelectTrigger><SelectContent>{userDepartments.map((department) => <SelectItem key={department} value={department}>{department}</SelectItem>)}</SelectContent></Select></Field>
                        <Field label="وضعیت حساب"><div className="flex h-8.5 items-center gap-5 rounded-md border border-input px-3 text-sm"><label className="flex cursor-pointer items-center gap-2"><input type="radio" checked={form.status === 'active'} onChange={() => update('status', 'active')} />فعال</label><label className="flex cursor-pointer items-center gap-2"><input type="radio" checked={form.status === 'inactive'} onChange={() => update('status', 'inactive')} />غیرفعال</label></div></Field>
                    </div>
                    <div className="flex justify-end gap-2 border-t border-border pt-5">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>انصراف</Button>
                        <Button type="submit">{user ? 'ذخیره تغییرات' : 'ایجاد کاربر'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}