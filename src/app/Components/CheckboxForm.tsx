"use client";

import {
  MenuButton,
  MenuItemCheckbox,
  MenuList,
  MenuProvider,
} from "@ariakit/react";
import { ArrowDown, Check } from "lucide-react";
import { useState } from "react";

interface RecipeState {
  Recipe: string[];
}

export default function CheckboxForm() {
  const [values, setValues] = useState<RecipeState>({ Recipe: [] });
  const [error, setError] = useState<boolean>(false);
  const Recipe: string[] = ["egg", "sauce", "lemon", "tomato"];

  const handleCheckboxChange = (rec: string) => {
    setValues((prev) => {
      const currentRecipes = prev.Recipe;

      if (currentRecipes.includes(rec)) {
        return { Recipe: currentRecipes.filter((item) => item !== rec) };
      } else {
        return { Recipe: [...currentRecipes, rec] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.Recipe.length === 0) {
      setError(!error);
    }else{
        setError(false);
        console.log(values);
    }
  };

  return (
    <div className="w-[50vw] p-4 rounded border border-green-500 flex flex-col gap-4">
      <div className="space-y-2">
        <h1 className="text-xl">CheckBox Form</h1>
        <p className="text-sm">Select what you want in Recipe:</p>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {error && <p className="text-sm text-red-500">choose at least one</p>}
        <MenuProvider values={values.Recipe}>
          <MenuButton>
            <span>Recipe</span>
            <ArrowDown className="size-4" />
          </MenuButton>

          <MenuList>
            {Recipe.map((rec, index) => (
              <MenuItemCheckbox
                key={index}
                name={rec}
                value={rec}
                checked={values.Recipe.includes(rec)}
                onChange={() => handleCheckboxChange(rec)}
              >
                <span>{rec}</span>
                <Check className="size-4 opacity-0 text-green-500" />
              </MenuItemCheckbox>
            ))}
          </MenuList>
        </MenuProvider>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded active:animate-[button-popup_1s_ease-in-out]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
