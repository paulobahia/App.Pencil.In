import { useEffect, useRef, useState } from "react"

interface RedirectMessageProps {
  isAuthNotification: boolean
}

export const RedirectMessage: React.FC<RedirectMessageProps> = ({ isAuthNotification }) => {
  const [showSecondMessage, setShowSecondMessage] = useState<boolean>(false)

  const secondMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const secondMessage = setTimeout(() => {
      setShowSecondMessage(true);
    }, 1000);

    return () => {
      clearTimeout(secondMessage)
      setShowSecondMessage(false)
    }
  }, [])

  useEffect(() => {
    if (showSecondMessage && secondMessageRef.current) {
      secondMessageRef.current.focus()
      secondMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showSecondMessage])

  return (
    <>
      {
        isAuthNotification
          ?
          <div className="flex justify-end w-full">
            <div className="w-fit max-w-[80%] p-4 rounded-md bg-[#6D28D9]">
              <span className="font-medium text-center text-white text-[14px]">
                Ativar Notificações
              </span>
            </div>
          </div>
          :
          <div className="flex justify-end w-full">
            <div className="w-fit max-w-[80%] p-4 rounded-md bg-[#6D28D9]">
              <span className="font-medium text-center text-white text-[14px]">
                Pular
              </span>
            </div>
          </div>
      }
      <div className="flex flex-col w-full gap-5">
        <div className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
          <span className="font-normal text-center text-white text-[14px]">
            Aguarde um momento enquanto redirecionamos você para a página de agendamento.
          </span>
        </div>
        {
          showSecondMessage &&
          <div ref={secondMessageRef} className="p-4 rounded-md bg-secondary max-w-[80%] w-fit fade-left">
            <span className="font-normal text-center text-white text-[14px]">
              Lá, você poderá escolher a data e o horário do serviço desejado no(a) Laura Fernandes - Brow Designer & Skin Care.
            </span>
          </div>
        }
      </div>
    </>
  )
}