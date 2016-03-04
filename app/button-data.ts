import {IButton, IButtonField} from "./interfaces";

export let buttonForms: IButtonField[] = [
  {
    legend: "Hunger Control",
    placeholderText: "I felt hungriest these times",
    explanatoryText: "Today, I felt",
    buttons: [
      { buttonText: "Starving", buttonPoints: 0 },
      { buttonText: "Very Hungry", buttonPoints: 1 },
      { buttonText: "Moderately Hungry", buttonPoints: 2 },
      { buttonText: "Slightly Hungry", buttonPoints: 3 },
      { buttonText: "No Hunger", buttonPoints: 4 }
    ]
  }, {
    legend: "Craving Control",
    placeholderText: "I craved the following foods",
    explanatoryText: "Today, my cravings were",
    buttons: [
      { buttonText: "High", buttonPoints: 0 },
      { buttonText: "Above Average", buttonPoints: 1 },
      { buttonText: "Average", buttonPoints: 2 },
      { buttonText: "Below Average", buttonPoints: 3 },
      { buttonText: "Absent", buttonPoints: 4 }
    ]
  }, {
    legend: "Satiety",
    placeholderText: "I felt most satisfied after the following meals",
    explanatoryText: "I felt satisfied after eating",
    buttons: [
      { buttonText: "Not at All", buttonPoints: 0 },
      { buttonText: "Briefly", buttonPoints: 1 },
      { buttonText: "A Couple Hours", buttonPoints: 2 },
      { buttonText: "Most of the Time", buttonPoints: 3 },
      { buttonText: "Until the Next Meal", buttonPoints: 4 }
    ]
  }, {
    legend: "Energy Level",
    placeholderText: "Comments",
    explanatoryText: "Today, my overall energy level was",
    buttons: [
      { buttonText: "Low", buttonPoints: 0 },
      { buttonText: "Fair", buttonPoints: 1 },
      { buttonText: "Average", buttonPoints: 2 },
      { buttonText: "Above Average", buttonPoints: 3 },
      { buttonText: "High", buttonPoints: 4 }
    ]
  }, {
    legend: "Well Being",
    placeholderText: "Comments",
    explanatoryText: "Today, my overall level of well-being was",
    buttons: [
      { buttonText: "Low", buttonPoints: 0 },
      { buttonText: "Below Average", buttonPoints: 1 },
      { buttonText: "Average", buttonPoints: 2 },
      { buttonText: "Above Average", buttonPoints: 3 },
      { buttonText: "High", buttonPoints: 4 }
    ]
  }, {
    legend: "Processed Carbs",
    placeholderText: "I had the following kinds of processed carbohydrates today",
    explanatoryText: "I had the following number of processed carbohydrates today",
    buttons: [
      { buttonText: "0 to 1 servings", buttonPoints: 0 },
      { buttonText: "2 servings", buttonPoints: 0 },
      { buttonText: "3 or more servings", buttonPoints: 0 }
    ]
  }
]


// let stressReductionAM: IChecklistItem = {
//   question: "I did my five-minute stress reduction in the AM",
//   answer: null
// };
//
// let stressReductionPM: IChecklistItem = {
//   question: "I did my five-minute stress reduction in the PM",
//   answer: null
// };
//
// let walks: IChecklistItem = {
//   question: "I did my after-meal walks",
//   answer: null
// };
//
// let movement: IChecklistItem = {
//   question: "I did my joyful movement",
//   answer: null,
//  buttonTextEntry: {
//     prompt: "What kind?",
//     userEntry: ""
//   }
// };
//
// let bedtime: IChecklistItem = {
//   question: "I did my pre-bedtime routine",
//   answer: null,
//  buttonTextEntry: {
//     prompt: "Describe",
//     userEntry: ""
//   }
// };
