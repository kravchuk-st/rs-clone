import { renderRecipe, renderInstructions } from './render';
import * as recipesSerivice from '../../api/recipesService';
import { IInstructions } from '../../types';

async function loadRecipe(recipeId: number) {
  const recipeData = await recipesSerivice.getRecipeById(recipeId);
  const equipmentList = parseEquipmentList(recipeData.analyzedInstructions[0]);
  const instructionsList = parseInstructionsList(recipeData.analyzedInstructions[0]);
  renderRecipe(recipeData, equipmentList);
  renderInstructions(instructionsList);
}

function parseEquipmentList(instructions: IInstructions): string[] {
  const stepsEquipment = instructions.steps.map(step => step.equipment.map(equipmentItem => equipmentItem.name));

  return [...new Set(stepsEquipment.flat(1))];
}

function parseInstructionsList(instructions: IInstructions): string[] {
  return instructions.steps.map(step => step.step);
}

export { loadRecipe };
