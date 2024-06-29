import { BellOff } from "lucide-react"
import { Button } from "../ui/button"

export const NotificationDeniedButton = () => {
  return (
    <Button size={"default"} variant={'destructive'} >
      <BellOff size={18} color="white" />
    </Button>
  )
}