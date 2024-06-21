import { useEffect, useState } from "react"
import { FormName, FormPhone, NotificationAuthRequest } from "./components";
import { RedirectMessage } from "./components/RedirectMessage";
import { useNavigate, useSearchParams } from "react-router-dom";

interface InfoUser {
  name: string;
  phone: string;
}

export const IsFirtsAcess = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [showSecondMessage, setShowSecondMessage] = useState<boolean>(false)
  const [showButtonNameSubmit, setButtonNameSubmit] = useState<boolean>(false)
  const [showFormPhone, setShowFormPhone] = useState<boolean>(false)
  const [infoUser, setInfoUser] = useState<InfoUser>({ name: '', phone: '' })
  const [showNotificationAuthRequest, setShowNotificationAuthRequest] = useState<boolean>(false)
  const [showRedirectMessage, setShowRedirectMessage] = useState<boolean>(false)
  const [isAuthNotification, setIsAuthNotification] = useState<boolean>(false)

  useEffect(() => {
    const secondMessage = setTimeout(() => {
      setShowSecondMessage(true);
    }, 1000);

    const buttonNameSubmit = setTimeout(() => {
      setButtonNameSubmit(true);
    }, 1800);

    return () => {
      clearTimeout(secondMessage)
      clearTimeout(buttonNameSubmit)
      setShowSecondMessage(false)
      setButtonNameSubmit(false)
    }
  }, [])

  function handleSubmitName(name: string) {
    setInfoUser((state) => ({
      ...state,
      name
    }))
    setButtonNameSubmit(false)
    setShowFormPhone(true)
  }

  function handleSubmitPhone(phone: string) {
    setInfoUser((state) => ({
      ...state,
      phone
    }))
    setShowFormPhone(false)
    setShowNotificationAuthRequest(true)
  }

  function handleSubmitNotification(isAuth: boolean) {
    setShowRedirectMessage(true)
    setIsAuthNotification(isAuth)

    setTimeout(() => {
      const { name, phone } = infoUser
      navigate(`/services?id=${id}&name=${name}&phone=${phone}`)
    }, 5000);
  }

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
        <span className="font-normal text-center text-white text-[14px]">
          Olá, tudo bem? Sou a assistente virtual do(a) Laura Fernandes Brow Designer & Skin Care  e cuido do agendamento dos serviços dos profissionais dele(a), ok?
        </span>
      </div>
      {
        showSecondMessage &&
        <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
          <span className="font-normal text-center text-white text-[14px]">
            Informe seu nome e telefone para que possamos prosseguir com o atendimento. Escreva seu nome e sobrenome.
          </span>
        </div>
      }
      {
        showButtonNameSubmit &&
        <FormName onSubmit={handleSubmitName} />
      }
      {
        showFormPhone &&
        <FormPhone name={infoUser.name} onSubmit={handleSubmitPhone} />
      }
      {
        showNotificationAuthRequest &&
        <NotificationAuthRequest name={infoUser.name} phone={infoUser.phone} onSubmit={handleSubmitNotification} />
      }
      {
        showRedirectMessage &&
        <RedirectMessage isAuthNotification={isAuthNotification} />
      }
    </div>
  )
}