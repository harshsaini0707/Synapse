import { useVideoHistory } from "@/hooks/videoHistory";
import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  const { data, isPending, isError } = useVideoHistory();

  console.log(data);
  
  return (
    <div className="w-full mx-auto px-4">
      <HoverEffect 
        items={data} 
        isLoading={isPending}
      />
    </div>
  );
}


