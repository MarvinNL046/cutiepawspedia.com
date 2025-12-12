"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Calculator, Info, ExternalLink, Dog } from "lucide-react";

/**
 * Dog Food Calculator
 *
 * Uses scientifically-backed formulas:
 * - RER (Resting Energy Requirement): 70 × (weight in kg)^0.75
 * - MER (Maintenance Energy Requirement): RER × activity/life stage multiplier
 *
 * Sources:
 * - Purina Institute: https://www.purinainstitute.com/centresquare/mer-calculator-for-dogs
 * - WSAVA Guidelines: https://wsava.org/wp-content/uploads/2020/01/WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf
 * - PetMD: https://www.petmd.com/dog/nutrition/how-many-calories-does-a-dog-need
 */

// MER multipliers based on scientific literature
const MER_MULTIPLIERS = {
  // Life stage multipliers
  puppy4: 3.0,      // Puppies under 4 months need ~3x RER
  puppy12: 2.0,     // Puppies 4-12 months need ~2x RER
  adult: 1.6,       // Average adult dog
  senior: 1.4,      // Senior dogs have lower metabolism

  // Activity adjustments (added to base)
  sedentary: -0.2,
  normal: 0,
  active: 0.2,
  veryActive: 0.6,  // Working dogs can need up to 2.0-2.5x

  // Neutered adjustment
  neuteredReduction: 0.2,  // Neutered dogs need ~20% less
};

// Average calorie density (kcal per gram)
const FOOD_CALORIES = {
  dryFood: 3.5,   // Average dry food: 3-4 kcal/g
  wetFood: 1.0,   // Average wet food: 0.8-1.2 kcal/g
};

interface CalculationResult {
  dailyCalories: number;
  dryFoodGrams: number;
  wetFoodGrams: number;
  rer: number;
  multiplier: number;
}

export function DogFoodCalculator() {
  const t = useTranslations("dogFoodCalculator");

  const [weight, setWeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("normal");
  const [lifeStage, setLifeStage] = useState<string>("adult");
  const [isNeutered, setIsNeutered] = useState<boolean>(true);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateFood = () => {
    const weightKg = parseFloat(weight);
    if (isNaN(weightKg) || weightKg <= 0 || weightKg > 100) {
      return;
    }

    // Step 1: Calculate RER using the scientific formula
    // RER = 70 × (weight in kg)^0.75
    const rer = 70 * Math.pow(weightKg, 0.75);

    // Step 2: Determine MER multiplier
    let baseMultiplier = MER_MULTIPLIERS[lifeStage as keyof typeof MER_MULTIPLIERS] as number;
    const activityAdjustment = MER_MULTIPLIERS[activityLevel as keyof typeof MER_MULTIPLIERS] as number;

    // Apply activity adjustment
    let multiplier = baseMultiplier + activityAdjustment;

    // Apply neutered reduction (except for puppies)
    if (isNeutered && lifeStage !== "puppy4" && lifeStage !== "puppy12") {
      multiplier -= MER_MULTIPLIERS.neuteredReduction;
    }

    // Step 3: Calculate daily calories (MER)
    const dailyCalories = Math.round(rer * multiplier);

    // Step 4: Calculate food amounts
    const dryFoodGrams = Math.round(dailyCalories / FOOD_CALORIES.dryFood);
    const wetFoodGrams = Math.round(dailyCalories / FOOD_CALORIES.wetFood);

    setResult({
      dailyCalories,
      dryFoodGrams,
      wetFoodGrams,
      rer: Math.round(rer),
      multiplier: Math.round(multiplier * 100) / 100,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Calculator Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">{t("title")}</h1>
          </div>
          <p className="text-orange-100">{t("subtitle")}</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-gray-600 text-sm">{t("description")}</p>

          {/* Weight Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("weight")}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.5"
                max="100"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={t("weightPlaceholder")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {t("weightUnit")}
              </span>
            </div>
          </div>

          {/* Life Stage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("lifeStage")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["puppy4", "puppy12", "adult", "senior"].map((stage) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => setLifeStage(stage)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    lifeStage === stage
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t(`lifeStages.${stage}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("activityLevel")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["sedentary", "normal", "active", "veryActive"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setActivityLevel(level)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activityLevel === level
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t(`activityLevels.${level}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Neutered */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("neutered")}
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsNeutered(true)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isNeutered
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t("neuteredOptions.yes")}
              </button>
              <button
                type="button"
                onClick={() => setIsNeutered(false)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  !isNeutered
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t("neuteredOptions.no")}
              </button>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateFood}
            disabled={!weight || parseFloat(weight) <= 0}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/25"
          >
            {t("calculate")}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="border-t border-gray-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Dog className="w-5 h-5 text-green-600" />
              {t("results.title")}
            </h2>

            <div className="grid gap-4">
              {/* Daily Calories */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">{t("results.dailyCalories")}</div>
                <div className="text-3xl font-bold text-green-600">
                  {result.dailyCalories.toLocaleString()}
                  <span className="text-lg font-normal text-gray-500 ml-1">
                    {t("results.kcalPerDay")}
                  </span>
                </div>
              </div>

              {/* Food Amounts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">{t("results.dryFood")}</div>
                  <div className="text-2xl font-bold text-amber-600">
                    {result.dryFoodGrams}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      {t("results.gramsPerDay")}
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">{t("results.wetFood")}</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {result.wetFoodGrams}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      {t("results.gramsPerDay")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <p className="text-sm text-gray-500 italic">
                {t("results.note")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-1">
              {t("disclaimer.title")}
            </h3>
            <p className="text-sm text-amber-700">
              {t("disclaimer.text")}
            </p>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="mt-4 bg-gray-50 rounded-xl p-5">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          {t("disclaimer.sources")}
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://www.purinainstitute.com/centresquare/mer-calculator-for-dogs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t("sources.purina")}
            </a>
          </li>
          <li>
            <a
              href="https://wsava.org/wp-content/uploads/2020/01/WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t("sources.wsava")}
            </a>
          </li>
          <li>
            <a
              href="https://www.petmd.com/dog/nutrition/how-many-calories-does-a-dog-need"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t("sources.petmd")}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
