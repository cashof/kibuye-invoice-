import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userDataType } from "@/utils/types";
import { FileText, CheckCircle2 } from "lucide-react";

const PERKS = [
  "Create and send invoices in seconds",
  "Track payments and due dates",
  "Professional PDF exports",
  "Manage multiple clients easily",
];

export default function LayoutComponent({ name, image }: userDataType) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col justifu=y-center items-start gap-4 h-full bg-muted p-10">
      {/* Top — Brand + User */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-foreground" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            InvoSend
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-border">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-background text-foreground text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-semibold text-base text-foreground">{name}</p>
          </div>
        </div>
      </div>

      <div className=" hidden md:flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm max-w-xs">
            Let's get your account set up so you can start sending invoices
            right away.
          </p>
        </div>

        <ul className="space-y-3">
          {PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-foreground" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
