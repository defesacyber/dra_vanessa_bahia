import React from 'react';
import { PhilosophicalLabel, MacroNutrient } from '../types';

interface NutritionCardProps {
  data: PhilosophicalLabel;
}

const NutrientRow: React.FC<{ nutrient: MacroNutrient; bold?: boolean; indent?: boolean }> = ({ nutrient, bold, indent }) => (
  <div className={`nutrition-bar flex justify-between items-baseline py-1 border-b border-black last:border-0 ${indent ? 'pl-4' : ''}`}>
    <span className="text-sm">
      <span className={bold ? 'font-black' : 'font-normal'}>{nutrient.name}</span>{' '}
      <span className="text-xs text-stone-600 italic ml-1">- {nutrient.description}</span>
    </span>
    <span className="font-bold text-sm">{nutrient.amount}</span>
  </div>
);

export const NutritionCard: React.FC<NutritionCardProps> = ({ data }) => {
  return (
    <div className="nutrition-label w-full max-w-md mx-auto bg-white border-2 border-black p-4 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500 font-sans text-black">
      <h1 className="text-4xl font-black tracking-tight leading-none border-b-[10px] border-black pb-2">Fatos Filosóficos</h1>
      <div className="nutrition-header mt-1 border-b border-black pb-1">
        <div className="flex justify-between text-lg font-bold">
          <span>Porção</span>
          <span>{data.servingSize}</span>
        </div>
      </div>
      
      <div className="border-b-[10px] border-black py-2 flex justify-between items-end">
        <div>
          <div className="text-sm font-bold">Peso Mental por porção</div>
          <div className="text-4xl font-black">Calorias</div>
        </div>
        <div className="text-5xl font-black">{data.calories}</div>
      </div>

      <div className="text-right text-xs font-bold py-1 border-b border-black">% Valor Diário*</div>

      <div className="border-b-[10px] border-black">
        {data.vices.map((vice, idx) => (
          <NutrientRow key={idx} nutrient={vice} bold={true} />
        ))}
      </div>

      <div className="border-b-[10px] border-black">
        {data.virtues.map((virtue, idx) => (
          <NutrientRow key={idx} nutrient={virtue} />
        ))}
      </div>

      <div className="py-2">
        {data.vitamins.map((vit, idx) => (
          <NutrientRow key={idx} nutrient={vit} />
        ))}
      </div>
      
      <div className="border-b-[5px] border-dashed border-stone-800 pt-2 pb-1">
        <span className="font-black mr-2">Ingredientes Principais:</span>
        <span className="text-sm leading-tight">
          {data.mainIngredients.join(', ')}.
        </span>
      </div>
      
      <div className="mt-2 text-[10px] text-gray-500 leading-tight">
        * A % de Valor Diário (VD) diz o quanto um nutriente em uma porção de pensamento contribui para uma dieta filosófica diária. 2.000 calorias de peso mental são usadas para conselhos gerais de nutrição.
      </div>
    </div>
  );
};