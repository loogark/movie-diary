import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/queries/useAuth";
import { useNavigate } from "react-router-dom";

export function UserMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage sizes="40px" src="https://github.com/shadcn.png" />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 text-gray-primary border-gray-primary">
        <DropdownMenuItem className="cursor-pointer">List</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Watch List
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate("/likes")}
        >
          Liked
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Diary</DropdownMenuItem>
        <DropdownMenuSeparator className="border-gray-primary" />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
