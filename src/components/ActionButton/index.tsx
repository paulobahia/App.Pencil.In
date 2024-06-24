import { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button"

interface ActionButtonProps extends ButtonProps {
  children: ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="default" className="bg-[#6D28D9] hover:bg-[#6D28D9]/50 text-white gap-2 flex w-full" {...props}>
      <span className="font-semibold text-[14px]">
        {children}
      </span>
    </Button>
  )
}