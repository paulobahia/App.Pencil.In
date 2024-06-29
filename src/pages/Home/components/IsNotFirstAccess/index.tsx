import { Dialog } from "@/components/ui/dialog"
import { toast } from 'sonner';
import { fakeServices } from "@/pages/Services"
import { AccordionServices, Calendar, SchedulingConfirmationDialog, TimePicker } from "@/pages/Services/components"
import localforage from "localforage"
import { useEffect, useRef, useState } from "react"
import { convertMinutesToTime } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookingContext } from "@/hooks/useBookingContext";
import { Button } from "@/components/ui/button";
import { NotificationDeniedButton } from "@/components";
import { useNotificationContext } from "@/hooks/useNotificationContext";

export const IsNotFirstAccess = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const phone = searchParams.get('phone');

  const mySchedulesRef = useRef<HTMLDivElement>(null)

  const { isDeniedNotification } = useNotificationContext()

  const {
    isDateSelected,
    isServicesSelected,
    selectedDate,
    selectedServices,
    selectedTime,
    setIsPendingConfirmation,
    reset
  } = useBookingContext();

  const [showSecondMessage, setShowSecondMessage] = useState<boolean>(false)
  const [showAccordionServices, setShowAccordionServices] = useState<boolean>(false)

  useEffect(() => {
    const secondMessage = setTimeout(() => {
      setShowSecondMessage(true);
    }, 1000);

    const accordionServices = setTimeout(() => {
      setShowAccordionServices(true);
    }, 1300);

    return () => {
      clearTimeout(secondMessage)
      clearTimeout(accordionServices)
      setShowSecondMessage(false)
      setShowAccordionServices(false)
    }
  }, [])

  useEffect(() => {
    localforage.getItem<PencinIn_User>('@Pencin.In:User')
      .then((response) => {
        if (response) {
          const { name, phone } = response

          setSearchParams(state => {
            state.set('name', name)
            state.set('phone', phone)
            return state
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [setSearchParams])

  useEffect(() => {
    if (mySchedulesRef.current) {
      mySchedulesRef.current.focus()
      mySchedulesRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [])

  function handleSchedulingConfirmation() {
    setIsPendingConfirmation(true)
    toast.success('Sucesso', { description: 'Agendamento realizado com sucesso.' })
    const filteredServices = fakeServices.filter(service => selectedServices.includes(service.id));
    const formatedTime = convertMinutesToTime(selectedTime!)
    navigate(`/scheduling-confirmation?id=${id}`, { state: { services: filteredServices, schedulingDate: selectedDate, schedulingTime: formatedTime } })
    reset()
  }

  function goToMyScheduling() {
    navigate(`/my-schedules?phone=${phone}`)
    reset()
  }

  return (
    <>
      <Dialog>
        <div className="flex items-center justify-between w-full h-20 py-5" >
          <div>
            {
              isDeniedNotification &&
              <NotificationDeniedButton />
            }
          </div>
          <Button onClick={goToMyScheduling} className="bg-[#6D28D9] hover:bg-[#6D28D9]/50 text-white font-medium gap-2 flex text-xs w-fit" >
            MEUS AGENDAMENTOS
          </Button>
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
            <span className="font-normal text-center text-white text-[14px]">
              Olá, {name}! É bom te ver de volta!
            </span>
          </div>
          {
            showSecondMessage &&
            <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
              <span className="font-normal text-center text-white text-[14px]">
                Informe o serviço que deseja realizar no(a) Laura Fernandes Brow Designer & Skin Care para que possamos prosseguir com o atendimento.
              </span>
            </div>
          }
          {
            showAccordionServices &&
            <div className="fade-left">
              <AccordionServices services={fakeServices} />
            </div>
          }
          {
            isServicesSelected &&
            <Calendar />
          }
          {
            isDateSelected &&
            <TimePicker />
          }
        </div>
        <SchedulingConfirmationDialog onSubmit={handleSchedulingConfirmation} services={fakeServices} />
      </Dialog>
    </>
  )
}