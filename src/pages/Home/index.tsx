import { IsFirtsAcess } from "@/components"
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');

  useEffect(() => {
    // TODO: Realizar GET na API trazendo as informações do estabelecimento.
  }, [userId])


  return (
    <main className="flex justify-center min-h-screen antialiased bg-background">
      <div className="flex flex-col justify-start w-screen max-w-5xl px-3 pb-5">
        <div className="h-20" />
        <IsFirtsAcess />
      </div>
    </main>
  )
}