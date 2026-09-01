import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/radioGroup';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent } from "@/components/card";
import { useForm, useWatch, type SubmitHandler, Controller } from "react-hook-form";
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Button } from '@/components/button';
import { basicInfoService } from '@/services';



interface ModalProps {
    modalInfo: {isOpen: boolean, recordID?: number | null};
    handleCloseModal: () => void;
    recordID?: number;
}

type FormData = {
    type: string;
    title: string;
    category?: string;
}

const BasicModal = ({ modalInfo, handleCloseModal }: ModalProps) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState<boolean>(false);

    const { control, handleSubmit, register, reset } = useForm({
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

    const { data: basicInfo } = useQuery({
        queryKey: ["basicInfoData", modalInfo.recordID],
        queryFn: () => basicInfoService.read(modalInfo.recordID),
        enabled: modalInfo.isOpen && !!modalInfo.recordID,
    });

    const { data: basicCategories, isLoading } = useQuery({
        queryKey: ["basicCategories"],
        queryFn: basicInfoService.readCategories,
        enabled: type === "basicValue",
        retry: false,
        staleTime: Infinity,
    });
    

    useEffect(() => {
        if (basicInfo) {
            console.log(basicInfo);
            
            reset({
                type: basicInfo.category_name ? "basicValue" : "basicCategory",
                title: basicInfo.name,
                category: String(basicInfo.category_name),
            });
        }
    }, [basicInfo, reset]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        let response;
        if (modalInfo.recordID) {
            // response = await basicInfoService.update(modalInfo.recordID, data);
        }
        else {
            response = await basicInfoService.create({ ...data });
        }
        console.log(data);

        if (response.ok) {
            console.log();
        } else {
            console.log();
        }
        queryClient.invalidateQueries({
            queryKey: ["basicInfo"],
        });
        setLoading(false);
    };
    return (
        <Dialog open={modalInfo.isOpen} onOpenChange={handleCloseModal}>
            <DialogContent variant='default' size="xl">
                <DialogTitle>{modalInfo.recordID ? "ویرایش" : "افزودن"} اطلاعات پایه</DialogTitle>
                <DialogHeader className="p-0 border-0">
                    <div className="flex items-center justify-end flex-wrap grow gap-5">
                        <Button onClick={handleCloseModal} variant="outline">
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

export { BasicModal };