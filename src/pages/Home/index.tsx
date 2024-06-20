import { IsFirtsAcess } from "@/components"

export const Home: React.FC = () => {
  return (
    <main className="flex justify-center min-h-screen antialiased bg-background">
      <div className="flex flex-col justify-start w-screen max-w-5xl px-3 pb-5">
        <div className="h-20" />
        <IsFirtsAcess />
      </div>
    </main>
  )
}