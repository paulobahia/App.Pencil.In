import { ActionButton } from "@/components";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

interface SchedulingConfirmationMessageState {
  services: {
    id: string;
    name: string;
    price: string;
    time: number;
  }[]
  schedulingDate: Date
  schedulingTime: string
}

export const SchedulingConfirmationMessage = () => {
  const location = useLocation();
  const { services, schedulingDate, schedulingTime } = location.state as SchedulingConfirmationMessageState;

  const describeServices = services
    .map(services => `${services.name} - R$ ${services.price}`)
    .join(', ')

  const describeSchedulingdate = dayjs(schedulingDate).locale('pt-br').format('dddd, DD [de] MMMM [de] YYYY')

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
        <span className="font-normal text-center text-white text-[14px]">
          Agendamento confirmado...
        </span>
      </div>
      <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
        <span className="font-normal text-center text-white text-[14px]">
          Serviços selecionados: Um(a) {" "}
          <span className="font-medium">
            {describeServices}, {" "}
          </span>
          com o(a) Laura Fernandes no(a) {describeSchedulingdate} ás {schedulingTime}.
        </span>
      </div>
      <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
        <span className="font-normal text-center text-white text-[14px]">
          O local é o de sempre, Rua Jordão, 83, Ipatinga MG.
        </span>
      </div>
      <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
        <span className="font-normal text-center text-white text-[14px]">
          Agradecemos pela preferencia, e esperamos te ver novamente em breve.
        </span>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <ActionButton>
          Meus agendamentos
        </ActionButton>
        <ActionButton>
          Novo agendamento
        </ActionButton>
      </div>
    </div>
  )
} 