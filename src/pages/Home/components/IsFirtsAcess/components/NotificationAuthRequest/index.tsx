import { ActionButton } from "@/components";
import { useNotificationContext } from "@/hooks/useNotificationContext";
import { formatPhone } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface NotificationAuthRequestProps {
  name: string;
  phone: string;
  onSubmit: (isAuth: string) => void
}

export const NotificationAuthRequest: React.FC<NotificationAuthRequestProps> = ({ name, phone, onSubmit }) => {
  const [showSecondMessage, setShowSecondMessage] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const { setIsDeniedNotification } = useNotificationContext()

  const optionsRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (showOptions && optionsRef.current) {
      optionsRef.current.focus()
      optionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showOptions])


  function requestPermission() {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          onSubmit('granted')
        } else if (permission === "denied") {
          onSubmit('denied')
          setIsDeniedNotification(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    setShowOptions(false)
  }

  function skipRequestPermission() {
    onSubmit('skip')
    setShowOptions(false)
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
        <div ref={optionsRef} className="flex flex-col gap-5 fade-left">
          <ActionButton onClick={requestPermission}>
            Ativar Notificações
          </ActionButton>
          <ActionButton onClick={skipRequestPermission} className="flex w-full gap-2 text-white bg-secondary hover:bg-secondary/50">
            Pular
          </ActionButton>
        </div>
      }
    </>
  )
}