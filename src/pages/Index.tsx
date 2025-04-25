import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GameRules from "@/components/GameRules";
import TelephoneIcon from "@/components/TelephoneIcon";

const Index = () => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="mb-4">
          <TelephoneIcon className="h-16 w-16 mx-auto text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-3 text-primary">Испорченный Телефон</h1>
        <p className="text-gray-600 mb-6">
          Классическая игра для двоих в современном формате. Передавайте сообщения и посмотрите, как они изменятся!
        </p>

        <div className="space-y-4">
          <Link to="/game">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md">
              Начать Игру
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary/10"
            onClick={() => setShowRules(!showRules)}
          >
            {showRules ? "Скрыть правила" : "Правила игры"}
          </Button>
        </div>

        {showRules && <GameRules className="mt-6" />}
      </div>
    </div>
  );
};

export default Index;
