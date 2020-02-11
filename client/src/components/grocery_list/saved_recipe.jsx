import React from "react";
import NutritionPieChart from "../nutrition_pie_chart";

const SavedRecipe = ({ recipe }) => {
  let calories = Math.round(recipe.calories);
  return <li className="saved-recipe-li">
      <div className="left-side">
        <div className="recipe-name">{recipe.name}</div>
        <div className="recipe-info">{calories} Calories</div>
        <div className="recipe-info">{recipe.servings} Servings</div>
        <div className="recipe-url-button">
          <a href={recipe.recipeURL}>
            <button>Link to Recipe</button>
          </a>
        </div>
      </div>  
      <div className="strong-side">
        <div className="recipe-image">
          <img src={recipe.imageURL} />
        </div>
      </div>
      {/* <div>
        <NutritionPieChart carbs={recipe.carbsTotal} proteins={recipe.proteinTotal} fats={recipe.fatsTotal} />
      </div> */}
  </li>

};

export default SavedRecipe;