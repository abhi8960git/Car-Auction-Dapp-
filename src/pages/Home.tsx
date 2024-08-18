import HeroSection from "@/components/Home";
import Button from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();

  return (
   <HeroSection/>
  );
}
