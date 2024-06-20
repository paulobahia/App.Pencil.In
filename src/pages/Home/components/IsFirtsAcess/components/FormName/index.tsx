import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormNameProps {
  onSubmit: (name: string) => void;
}

const NameSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Informe um nome válido' })
});

export const FormName: React.FC<FormNameProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <div className="flex flex-col mt-5 gap-y-4 fade-left">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ name }) => onSubmit(name))}
          className="flex flex-col items-start space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full">
                <FormControl className="w-full">
                  <Input {...field} type="text" placeholder="Seu nome e sobrenome" className="text-xs" />
                </FormControl>
                <FormMessage className="text-xs font-bold" />
              </FormItem>
            )}
          />
          <Button variant="default" className="bg-[#6D28D9] hover:bg-[#6D28D9]/50 text-white gap-2 flex w-full" >
            <span className="font-semibold text-[14px]">
              Próximo Passo
            </span>
          </Button>
        </form>
      </Form>
    </div>
  )
}