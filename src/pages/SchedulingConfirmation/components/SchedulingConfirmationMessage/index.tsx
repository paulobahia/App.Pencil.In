import { ActionButton } from "@/components";
import dayjs from "dayjs";
import localforage from "localforage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { services, schedulingDate, schedulingTime } = location.state as SchedulingConfirmationMessageState;

  const [showSecondMessage, setShowSecondMessage] = useState<boolean>(false)
  const [showThirdMessage, setShowThirdMessage] = useState<boolean>(false)
  const [showFourthMessage, setShowFourthMessage] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)

  useEffect(() => {
    const secondMessage = setTimeout(() => {
      setShowSecondMessage(true);
    }, 1000);

    const thirdMessage = setTimeout(() => {
      setShowThirdMessage(true);
    }, 1500);

    const fourtMessage = setTimeout(() => {
      setShowFourthMessage(true);
    }, 2000);

    const options = setTimeout(() => {
      setShowOptions(true);
    }, 2300);

    return () => {
      clearTimeout(secondMessage)
      clearTimeout(thirdMessage)
      clearTimeout(fourtMessage)
      clearTimeout(options)
      setShowSecondMessage(false)
      setShowThirdMessage(false)
      setShowFourthMessage(false)
      setShowOptions(false)
    }
  }, [])

  const describeServices = services
    .map(services => `${services.name} - R$ ${services.price}`)
    .join(', ')

  const describeSchedulingdate = dayjs(schedulingDate).locale('pt-br').format('dddd, DD [de] MMMM [de] YYYY')

  async function goToSchedules() {
    await localforage.getItem<PencinIn_User>('@Pencin.In:User')
      .then((response) => {
        if (response) {
          const { phone } = response
          navigate(`/my-schedules?phone=${phone}`)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function goToHome() {
    navigate(`/?id=${id}`)
  }

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
        <span className="font-normal text-center text-white text-[14px]">
          Agendamento confirmado...
        </span>
      </div>
      {
        showSecondMessage &&
        <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
          <span className="font-normal text-center text-white text-[14px]">
            Serviços selecionados: Um(a) {" "}
            <span className="font-medium">
              {describeServices}, {" "}
            </span>
            com o(a) Laura Fernandes no(a) {describeSchedulingdate} ás {schedulingTime}.
          </span>
        </div>
      }
      {
        showThirdMessage &&
        <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
          <span className="font-normal text-center text-white text-[14px]">
            O local é o de sempre, Rua Jordão, 83, Ipatinga MG.
          </span>
        </div>
      }
      {
        showFourthMessage &&
        <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
          <span className="font-normal text-center text-white text-[14px]">
            Agradecemos pela preferencia, e esperamos te ver novamente em breve.
          </span>
        </div>
      }
      {
        showOptions &&
        <div className="flex flex-col gap-3 mt-3 fade-left">
          <ActionButton onClick={goToSchedules}>
            Meus agendamentos
          </ActionButton>
          <ActionButton onClick={goToHome}>
            Novo agendamento
          </ActionButton >
        </div>
      }
    </div>
  )
} 