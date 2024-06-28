import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IsFirtsAcess, IsNotFirstAccess } from "./components";
import localforage from "localforage";

export const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');

  const [isFirtsAcess, setIsFirtsAcess] = useState<boolean>(true)

  useEffect(() => {
    // TODO: Realizar GET na API trazendo as informações do estabelecimento.
    localforage.getItem<PencinIn_User>('@Pencin.In:User')
      .then((response) => {
        if (response) {
          return setIsFirtsAcess(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userId])



  return (
    <main className="flex justify-center min-h-screen antialiased bg-background">
      <div className="flex flex-col justify-start w-screen max-w-5xl px-3 pb-5">
        {
          isFirtsAcess
            ?
            <IsFirtsAcess />
            :
            <IsNotFirstAccess />
        }
      </div>
    </main>
  )
}