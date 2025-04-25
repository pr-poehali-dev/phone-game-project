import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GameResult from "@/components/GameResult";

type GameStage = "input" | "memorize" | "guess" | "result";

const Game = () => {
  const [stage, setStage] = useState<GameStage>("input");
  const [originalMessage, setOriginalMessage] = useState("");
  const [guessedMessage, setGuessedMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [showMessageTimer, setShowMessageTimer] = useState<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (!originalMessage.trim()) return;
    
    setStage("memorize");
    
    // Set a timer to hide the message and move to guess stage
    const timer = setTimeout(() => {
      setStage("guess");
    }, countdown * 1000);
    
    setShowMessageTimer(timer);
  };

  const handleGuessSubmit = () => {
    if (!guessedMessage.trim()) return;
    setStage("result");
  };

  const handleReset = () => {
    setStage("input");
    setOriginalMessage("");
    setGuessedMessage("");
    
    // Clear any existing timer
    if (showMessageTimer) {
      clearTimeout(showMessageTimer);
      setShowMessageTimer(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-primary">
            {stage === "input" && "Первый игрок"}
            {stage === "memorize" && "Запоминайте!"}
            {stage === "guess" && "Второй игрок"}
            {stage === "result" && "Результат"}
          </CardTitle>
          <CardDescription className="text-center">
            {stage === "input" && "Придумайте фразу для запоминания"}
            {stage === "memorize" && `У вас ${countdown} секунд на запоминание`}
            {stage === "guess" && "Воспроизведите фразу, которую запомнили"}
            {stage === "result" && "Сравнение оригинала с вашим вариантом"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {stage === "input" && (
            <div className="space-y-4">
              <Textarea
                placeholder="Введите фразу для запоминания..."
                value={originalMessage}
                onChange={(e) => setOriginalMessage(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Время на запоминание:</span>
                <select
                  value={countdown}
                  onChange={(e) => setCountdown(Number(e.target.value))}
                  className="border rounded p-1 text-sm"
                >
                  {[3, 5, 10, 15].map(seconds => (
                    <option key={seconds} value={seconds}>{seconds} сек</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          
          {stage === "memorize" && (
            <div className="p-4 bg-primary/5 rounded-md min-h-[100px] flex items-center justify-center">
              <p className="text-xl font-medium text-center">{originalMessage}</p>
            </div>
          )}
          
          {stage === "guess" && (
            <Textarea
              placeholder="Введите фразу, которую вы запомнили..."
              value={guessedMessage}
              onChange={(e) => setGuessedMessage(e.target.value)}
              className="min-h-[100px]"
            />
          )}
          
          {stage === "result" && (
            <GameResult original={originalMessage} guess={guessedMessage} />
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {stage === "input" && (
            <Button className="w-full" onClick={handleStart}>Начать</Button>
          )}
          
          {stage === "memorize" && (
            <Button 
              className="w-full" 
              onClick={() => {
                if (showMessageTimer) {
                  clearTimeout(showMessageTimer);
                  setShowMessageTimer(null);
                }
                setStage("guess");
              }}
            >
              Я запомнил(а)
            </Button>
          )}
          
          {stage === "guess" && (
            <Button className="w-full" onClick={handleGuessSubmit}>Проверить</Button>
          )}
          
          {stage === "result" && (
            <div className="w-full flex gap-4">
              <Button variant="outline" className="flex-1" onClick={handleReset}>
                Ещё раз
              </Button>
              <Link to="/" className="flex-1">
                <Button className="w-full">На главную</Button>
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Game;
