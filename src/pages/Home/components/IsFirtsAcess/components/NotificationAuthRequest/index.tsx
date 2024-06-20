import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

interface NotificationAuthRequestProps {
  name: string;
  phone: string;
  onSubmit: (isAuth: boolean) => void
}

export const NotificationAuthRequest: React.FC<NotificationAuthRequestProps> = ({ name, phone, onSubmit }) => {
  const [showSecondMessage, setShowSecondMessage] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)

  useEffect(() => {
    const secondMessage = setTimeout(() => {
      setShowSecondMessage(true);
    }, 800);

    const options = setTimeout(() => {
      setShowOptions(true);
    }, 1200);

    return () => {
      clearTimeout(secondMessage)
      clearTimeout(options)
      setShowSecondMessage(false)
      setShowOptions(false)
    }
  }, [])

  function formatPhone(phoneNumber: string) {
    let cleaned = ('' + phoneNumber).replace(/\D/g, '');

    if (cleaned.startsWith('55') && cleaned.length === 13) {
      cleaned = cleaned.substring(2);
    }

    if (cleaned.length === 11) {
      const match = cleaned.match(/^(\d{2})(\d)(\d{4})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
      }
    }

    return phoneNumber;
  }

  function handleAuthNotification(isAuth: boolean) {
    setShowOptions(false)
    onSubmit(isAuth)
  }

  return (
    <>
      <div className="flex flex-col items-end w-full gap-5">
        <div className="w-fit max-w-[80%] p-4 rounded-md bg-[#6D28D9]">
          <span className="font-medium text-center text-white text-[14px]">
            {name}
          </span>
        </div>
        <div className="w-fit max-w-[80%] p-4 rounded-md bg-[#6D28D9]">
          <span className="font-medium text-center text-white text-[14px]">
            {formatPhone(phone)}
          </span>
        </div>
      </div>
      <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
        <span className="font-normal text-center text-white text-[14px]">
          Olá, {name}! Tudo bem ?
        </span>
      </div>
      {
        showSecondMessage &&
        <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
          <span className="font-normal text-center text-white text-[14px]">
            Deseja ativar a notificações para que possamos lembrá-lo do seu agendamento ?
          </span>
        </div>
      }
      {
        showOptions &&
        <div className="flex flex-col gap-5 fade-left">
          <Button onClick={() => handleAuthNotification(true)} variant="default" className="bg-[#6D28D9] hover:bg-[#6D28D9]/50 text-white gap-2 flex w-full" >
            <span className="font-semibold text-[14px]">
              Ativar Notificações
            </span>
          </Button>
          <Button onClick={() => handleAuthNotification(false)} variant="default" className="flex w-full gap-2 text-white bg-secondary hover:bg-secondary/50" >
            <span className="font-semibold text-[14px]">
              Pular
            </span>
          </Button>
        </div>
      }
    </>
  )
}