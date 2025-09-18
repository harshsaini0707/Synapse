import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CardSpotlightDemo({text} : {text :  string}) {
  return (
    <CardSpotlight className="h-1 w-full flex items-center justify-center">
        <h1 className="text-center font-serif text-gray-300 ">{text}</h1>
    </CardSpotlight>
  );
}

