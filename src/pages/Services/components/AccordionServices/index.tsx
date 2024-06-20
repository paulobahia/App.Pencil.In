import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface ServiceType {
  id: string;
  name: string;
  price: string;
  time: string;
}

const Services: ServiceType[] = [
  {
    id: '1',
    name: 'Sobrancelha',
    price: 'R$ 40,00',
    time: '1:00h'
  },
  {
    id: '2',
    name: 'Limpeza de Pele',
    price: 'R$ 80,00',
    time: '2:30h'
  },
  {
    id: '3',
    name: 'Dermaplaning',
    price: 'R$ 100,00',
    time: '1:30h'
  },
  {
    id: '4',
    name: 'Consultoria',
    price: 'R$ 150,00',
    time: '2:00h'
  }
]

interface AccordionProps {
  selectedServices: string[]
  onServiceSelected: (serviceId: string) => void
}

export const AccordionServices: React.FC<AccordionProps> = ({ selectedServices, onServiceSelected }) => {

  function isServiceSelected(serviceId: string) {
    if (selectedServices.includes(serviceId)) {
      return true
    }
    return false
  }

  return (
    <>
      <Accordion type="single" collapsible className='w-full '>
        <AccordionItem className='border-0' value="item-1">
          <AccordionTrigger className='hover:no-underline text-neutral-400 font-medium text-[14px]'>Selecione os Serviços</AccordionTrigger>
          <AccordionContent className='flex flex-row items-center max-w-full gap-2 overflow-x-auto'>
            {Services.map(({ id, name, price, time }) => {
              return (
                <Button onClick={() => onServiceSelected(id)} key={id} className={`flex flex-col justify-between p-3 rounded-md min-w-28 min-h-28 ${isServiceSelected(id) ? 'bg-[#6D28D9] hover:bg-[#6D28D9]' : 'bg-secondary hover:bg-secondary'} `}>
                  <div className='flex justify-end w-full'>
                    <Checkbox id={id} checked={isServiceSelected(id)} />
                  </div>
                  <div className='flex flex-col w-full gap-2'>
                    <span className='text-xs font-medium text-start text-neutral-200'>{name}</span>
                    <div className='flex justify-between w-full'>
                      <span className={`${isServiceSelected(id) ? 'text-neutral-200 font-normal' : 'text-neutral-400 font-light'} text-[12px]`}>{price}</span>
                      <span className={`${isServiceSelected(id) ? 'text-neutral-200 font-normal' : 'text-neutral-400 font-light'} text-[12px]`}>{time}</span>
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