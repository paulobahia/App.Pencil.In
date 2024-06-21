import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { convertMinutesToTime } from "@/lib/utils";

interface AccordionProps {
  selectedServices: string[]
  onServiceSelected: (serviceId: string) => void
  services: {
    id: string;
    name: string;
    price: string;
    time: number;
  }[]
}

export const AccordionServices: React.FC<AccordionProps> = ({ selectedServices, onServiceSelected, services }) => {

  function isServiceSelected(serviceId: string) {
    if (selectedServices.includes(serviceId)) {
      return true
    }
    return false
  }

  return (
    <>
      <Accordion type="single" collapsible defaultValue="services" className='w-full '>
        <AccordionItem className='border-0' value="services">
          <AccordionTrigger className='hover:no-underline text-neutral-400 font-medium text-[14px]'>Selecione os Serviços</AccordionTrigger>
          <AccordionContent className='flex flex-row items-center max-w-full gap-2 overflow-x-auto'>
            {services.map(({ id, name, price, time }) => {
              return (
                <Button onClick={() => onServiceSelected(id)} key={id} className={`flex flex-col justify-between p-3 rounded-md min-w-32 min-h-32 ${isServiceSelected(id) ? 'bg-[#6D28D9] hover:bg-[#6D28D9]' : 'bg-secondary hover:bg-secondary'} `}>
                  <div className='flex justify-end w-full'>
                    <Checkbox id={id} checked={isServiceSelected(id)} />
                  </div>
                  <div className='flex flex-col w-full gap-2'>
                    <span className='text-xs font-medium text-start text-neutral-200'>{name}</span>
                    <div className='flex justify-between w-full'>
                      <span className={`${isServiceSelected(id) ? 'text-neutral-200 font-normal' : 'text-neutral-400 font-light'} text-[12px]`}>R$ {price}</span>
                      <span className={`${isServiceSelected(id) ? 'text-neutral-200 font-normal' : 'text-neutral-400 font-light'} text-[12px]`}>{convertMinutesToTime(time)}h</span>
                    </div>
                  </div>
                </Button>
              )
            })}
          </AccordionContent>
          <div className='flex justify-end w-full mt-1.5'>
            <span className='text-sm font-normal text-neutral-500'>
              Arraste para o lado para ver mais
            </span>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  )
}