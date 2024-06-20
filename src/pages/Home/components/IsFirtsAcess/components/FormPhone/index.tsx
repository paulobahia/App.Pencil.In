import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { PhoneInput } from "@/components/ui/phone-input";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormPhoneProps {
  onSubmit: (phone: string) => void;
  name: string
}

const PhoneSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export const FormPhone: React.FC<FormPhoneProps> = ({ onSubmit, name }) => {
  const form = useForm<z.infer<typeof PhoneSchema>>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  return (
    <>
      <div className="flex justify-end w-full fade-in">
        <div className="w-fit max-w-[80%] p-4 rounded-md bg-[#6D28D9]">
          <span className="font-normal text-center text-white text-[14px]">
            {name}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 fade-left">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ phone }) => onSubmit(phone))}
            className="flex flex-col items-start space-y-8">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormControl className="w-full">
                    <PhoneInput placeholder="Seu telefone" {...field} defaultCountry="BR" />
                  </FormControl>
                  <FormMessage className="text-xs font-bold" />
                </FormItem>
              )}
            />
            <Button variant="default" className="bg-[#6D28D9] hover:bg-[#6D28D9]/50 text-white gap-2 flex w-full" >
              <span className="font-semibold text-[14px]">
                Finalizar Cadastro
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}