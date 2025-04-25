import React from "react";

interface GameResultProps {
  original: string;
  guess: string;
}

const GameResult: React.FC<GameResultProps> = ({ original, guess }) => {
  // Простая функция для расчёта процента схожести
  const calculateSimilarity = (str1: string, str2: string): number => {
    if (str1 === str2) return 100;
    
    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);
    
    // Подсчёт совпадающих слов
    let matches = 0;
    for (const word of words1) {
      if (words2.includes(word)) {
        matches++;
        // Удаляем слово из второго массива, чтобы не учитывать его дважды
        const index = words2.indexOf(word);
        words2.splice(index, 1);
      }
    }
    
    const maxLength = Math.max(words1.length, words1.length + words2.length);
    return Math.floor((matches / maxLength) * 100);
  };

  const similarity = calculateSimilarity(original, guess);
  
  let resultMessage = "";
  let resultClass = "";
  
  if (similarity === 100) {
    resultMessage = "Идеально! Вы воспроизвели сообщение точно!";
    resultClass = "text-green-600 font-bold";
  } else if (similarity >= 75) {
    resultMessage = "Отлично! Вы почти полностью запомнили сообщение!";
    resultClass = "text-green-500";
  } else if (similarity >= 50) {
    resultMessage = "Хорошо! Вы запомнили половину сообщения.";
    resultClass = "text-yellow-500";
  } else if (similarity >= 25) {
    resultMessage = "Неплохо! Вы запомнили часть сообщения.";
    resultClass = "text-orange-500";
  } else {
    resultMessage = "Телефон совсем испорчен! Попробуйте ещё раз.";
    resultClass = "text-red-500";
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Оригинальное сообщение:</h3>
        <p className="p-2 bg-primary/10 rounded">{original}</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Ваше сообщение:</h3>
        <p className="p-2 bg-secondary/10 rounded">{guess}</p>
      </div>
      
      <div className="pt-2 border-t">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Схожесть:</span>
          <span className="font-bold">{similarity}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full bg-primary" 
            style={{ width: `${similarity}%` }}
          ></div>
        </div>
        
        <p className={`mt-4 text-center ${resultClass}`}>{resultMessage}</p>
      </div>
    </div>
  );
};

export default GameResult;
