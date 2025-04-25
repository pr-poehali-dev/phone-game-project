import { FC } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface GameRulesProps {
  className?: string;
}

const GameRules: FC<GameRulesProps> = ({ className = "" }) => {
  return (
    <div className={`text-left ${className}`}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-primary">Как играть?</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Первый игрок придумывает и вводит исходное сообщение.</li>
              <li>Приложение показывает сообщение на короткое время.</li>
              <li>Второй игрок должен воспроизвести то, что запомнил.</li>
              <li>Результаты сравниваются, и начисляются очки за точность.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-primary">Подсчёт очков</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              За каждое правильно воспроизведенное слово начисляется 1 очко. Бонусные очки за сохранение порядка слов и пунктуации.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-primary">Советы</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Используйте сложные предложения для повышения сложности.</li>
              <li>Договоритесь о времени показа сообщения заранее.</li>
              <li>Меняйтесь ролями после каждого раунда.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameRules;
