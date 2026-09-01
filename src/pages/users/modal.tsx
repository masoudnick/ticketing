import { RadioGroup, RadioGroupItem } from '@/components/radioGroup';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from "@/components/card";
import { useForm, useWatch, type SubmitHandler, Controller } from "react-hook-form";
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Button } from '@/components/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/select';
import { basicInfoService } from '@/services';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/dialog';


interface ModalProps {
    open: boolean;
    onOpenChange: () => void;
}

type FormData = {
    type: string;
    title: string;
    category?: string;
}

const PageModal = ({ open, onOpenChange }: ModalProps) => {

    const [loading, setLoading] = useState<boolean>(false);

    const { control, handleSubmit, register, setValue } = useForm({
        defaultValues: {
            type: "basicCategory",
            title: "",
            category: "",
        },
    });
    const type = useWatch({
        control: control,
        name: "type",
    });

    const { data: basicCategories, isLoading } = useQuery({
        queryKey: ["basicCategories"],
        queryFn: basicInfoService.readCategories,
        enabled: type === "basicValue",
        retry: false,
        staleTime: Infinity,
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
        setLoading(true);
        const res = await basicInfoService.create({ ...data });
        if (res.ok) {
            console.log();
        } else {
            console.log();
        }
        setValue("type", "");
        setValue("title", "");
        setValue("category", "");
        setLoading(false);
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent variant='default' size="xl">
                <DialogTitle>افزودن اطلاعات پایه</DialogTitle>
                <DialogHeader className="p-0 border-0">
                    <div className="flex items-center justify-end flex-wrap grow gap-5">
                        <Button onClick={onOpenChange} variant="outline">
                            بستن
                        </Button>
                    </div>
                </DialogHeader>
                <div className="flex grow gap-5 lg:gap-7.5">
                    <div className="flex flex-col items-stretch grow gap-5 lg:gap-7.5">
                        <Card className="">
                            {/* <CardHeader id="password_settings">
                                    <CardTitle>Password</CardTitle>
                                </CardHeader> */}
                            <CardContent className="grid gap-5">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Controller name="type" control={control}
                                        render={({ field }) => (
                                            <RadioGroup className='mb-3' onValueChange={field.onChange} defaultValue={field.value}>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="basicCategory" id="basicCategory" />
                                                    <Label htmlFor="basicCategory" variant="secondary">
                                                        دسته بندی اطلاعات پایه
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="basicValue" id="basicValue" />
                                                    <Label htmlFor="basicValue" variant="secondary">
                                                        مقدار اطلاعات پایه
                                                    </Label>
                                                </div>

                                            </RadioGroup>)
                                        }
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className=''>
                                            <Label className='mb-1' htmlFor='title'>عنوان</Label>
                                            <Input type="text" placeholder="" id='title' {...register("title")} />
                                        </div>
                                        {type === "basicValue" ? <div>
                                            <Label className='mb-1' htmlFor='title'>دسته بندی</Label>
                                            <Controller name="category" control={control}
                                                render={({ field }) => (
                                                    <Select value={field.value} onValueChange={field.onChange} defaultValue="1">
                                                        <SelectTrigger isLoading={isLoading}>
                                                            <SelectValue placeholder="جستجو در دسته بندی ها" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {basicCategories?.map(item => (
                                                                <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>)}
                                            />

                                        </div> : null}
                                    </div>

                                    <div className="flex justify-end mt-3">
                                        <Button type="submit" loading={loading}>ذخیره</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export { PageModal };