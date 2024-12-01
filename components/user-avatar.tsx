import { IUser } from "@/lib/interfaces/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useSignOut, useUser } from "@/hooks/use-auth";

const UserAvatar = ({ user }: { user: IUser }) => {
  const { mutate } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none ring-none">
        <Avatar>
          {user?.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : (
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 mt-3">
        <DropdownMenuItem className="flex space-x-2 justify-center items-center">
          <Avatar>
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name} />
            ) : (
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <p className="text-neutral-900 font-medium">{user.name}</p>
            <p className="text-neutral-500 font-normal text-xs">{user.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="ghost" className="w-full" onClick={()=> mutate()}>
            <LogOut className="text-rose-600" size={10} />
            <p className="text-rose-600 font-medium">Sign Out</p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
