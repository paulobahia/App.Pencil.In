import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { convertMinutesToTime, formatPhone } from "@/lib/utils"
import dayjs from "dayjs"
import { CalendarDays, Clock } from "lucide-react"

interface SchedulingConfirmationDialogProps {
  name: string | null
  phone: string | null
  selectedTime: number | null
  selectedDate: Date | null
  selectedServices: string[]
  services: {
    id: string;
    name: string;
    price: string;
    time: number;
  }[]
}

export const SchedulingConfirmationDialog: React.FC<SchedulingConfirmationDialogProps> = ({ services, name, phone, selectedDate, selectedTime, selectedServices }) => {

  const describedDate = selectedDate
    ? dayjs(selectedDate).locale('pt-br').format('dddd, DD [de] MMMM [de] YYYY')
    : null

  const describeTime = selectedTime
    ? convertMinutesToTime(selectedTime)
    : null

  const inputName = name
    ? name
    : ''

  const inputPhone = phone
    ? formatPhone(phone)
    : ''

  const filteredServices = services.filter(service => selectedServices.includes(service.id));

  const totalSumOfService = filteredServices.reduce((acc, service) => {
    acc.totalTime += service.time;
    acc.totalValue += parseFloat(service.price);
    return acc;
  }, { totalTime: 0, totalValue: 0 });

  return (
    <DialogContent className='max-w-sm px-0'>
      <DialogHeader className='px-4'>
        <DialogTitle className='flex w-full mb-3'>
          <span className='text-[16px] font-semibold text-neutral-200'>
            Confirme seu agendamento
          </span>
        </DialogTitle>
        <DialogDescription className='flex flex-col items-start w-full gap-1'>
          <Badge variant={`secondary`} className='gap-2 py-1 rounded-sm'>
            <CalendarDays className='size-3.5' />
            <span>
              {describedDate}, {describeTime}
            </span>
          </Badge>
          <Badge variant={`secondary`} className='flex items-center justify-start gap-2 py-1 rounded-sm'>
            <Clock className='size-3.5' />
            <span>
              {convertMinutesToTime(totalSumOfService.totalTime)}
            </span>
            -
            <span>
              R$ {totalSumOfService.totalValue},00
            </span>
          </Badge>
        </DialogDescription>
      </DialogHeader>
      <div className='flex flex-col gap-4 px-4'>
        <div className="flex flex-col gap-2.5">
          <Label className="text-xs" htmlFor="name">Nome</Label>
          <Input disabled type="name" id="name" placeholder="Nome" className='text-xs h-9 focus-visible:ring-0' value={inputName} />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label className="text-xs" htmlFor="cellphone">Telefone</Label>
          <Input disabled type="text" id="cellphone" placeholder="Telefone" className='text-xs h-9 focus-visible:ring-0' value={inputPhone} />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label className="text-xs" htmlFor="observation">Observação</Label>
          <Textarea id="observation" placeholder="Por favor, compartilhe com a gente qualquer coisa que possa nos ajudar a prepara o melhor serviço para você." className='text-xs max-h-32' />
        </div>
      </div>
      <Separator />
      <div className='flex flex-col gap-4 px-4'>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="services">Serviços</Label>
          <div className="rounded-md">
            <Table>
              <TableHeader className="text-sm font-normal">
                <TableRow>
                  <TableHead>
                    Serviço
                  </TableHead>
                  <TableHead className="text-center">
                    Duração
                  </TableHead>
                  <TableHead className="text-end">
                    Valor
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  filteredServices.map((row) => {
                    return (
                      <TableRow key={row.id} className="border-0 hover:bg-transparent">
                        <TableCell className="py-0 pt-3 text-[12px] font-semibold min-w-max">
                          {row.name}
                        </TableCell>
                        <TableCell className="py-0 pt-3 text-[12px] font-semibold text-center min-w-max">
                          {convertMinutesToTime(row.time)}h
                        </TableCell>
                        <TableCell className="py-0 pt-3 text-[12px] font-semibold min-w-max text-end">
                          R$ {row.price}
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Separator />
      <div className='flex flex-row justify-end gap-2 px-4'>
        <Button size={'default'} variant={'ghost'}>Voltar</Button>
        <Button size={'default'}>Confirmar</Button>
      </div>
    </DialogContent>
  )
}