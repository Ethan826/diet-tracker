System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var buttonQuestions, checkboxQuestions;
    return {
        setters:[],
        execute: function() {
            exports_1("buttonQuestions", buttonQuestions = {
                "hungerControl": {
                    legend: "Hunger Control",
                    placeholderText: "I felt hungriest these times",
                    explanatoryText: "Today, I felt",
                    buttons: {
                        0: "Starving",
                        1: "Very Hungry",
                        2: "Moderately Hungry",
                        3: "Slightly Hungry",
                        4: "No Hunger"
                    },
                },
                "cravingControl": {
                    legend: "Craving Control",
                    placeholderText: "I craved the following foods",
                    explanatoryText: "Today, my cravings were",
                    buttons: {
                        0: "High",
                        1: "Above Average",
                        2: "Average",
                        3: "Below Average",
                        4: "Absent"
                    },
                },
                "satiety": {
                    legend: "Satiety",
                    placeholderText: "I felt most satisfied after the following meals",
                    explanatoryText: "I felt satisfied after eating",
                    buttons: {
                        0: "Not at All",
                        1: "Briefly",
                        2: "A Couple Hours",
                        3: "Most of the Time",
                        4: "Until the Next Meal"
                    },
                },
                "energyLevel": {
                    legend: "Energy Level",
                    placeholderText: "Comments",
                    explanatoryText: "Today, my overall energy level was",
                    buttons: {
                        0: "Low",
                        1: "Fair",
                        2: "Average",
                        3: "Above Average",
                        4: "High",
                    },
                },
                "wellBeing": {
                    legend: "Well Being",
                    placeholderText: "Comments",
                    explanatoryText: "Today, my overall level of well-being was",
                    buttons: {
                        0: "Low",
                        1: "Below Average",
                        2: "Average",
                        3: "Above Average",
                        4: "High",
                    },
                },
                "processedCarbs": {
                    legend: "Processed Carbs",
                    placeholderText: "I had the following kinds of processed carbohydrates today",
                    explanatoryText: "I had the following number of processed carbohydrates today",
                    buttons: {
                        0: "0 to 1 servings",
                        1: "2 servings",
                        2: "3 or more servings"
                    }
                }
            });
            exports_1("checkboxQuestions", checkboxQuestions = {
                "amStress": {
                    checkboxPrompt: "I did my five-minute stress reduction in the AM",
                },
                "pmStress": {
                    checkboxPrompt: "I did my five-minute stress reduction in the PM",
                },
                "walks": {
                    checkboxPrompt: "I did my after-meal walks",
                },
                "movement": {
                    checkboxPrompt: "I did my joyful movement",
                    textPrompt: "What kind?",
                },
                "bedtime": {
                    checkboxPrompt: "I did my pre-bedtime routine",
                    textPrompt: "Describe",
                }
            });
        }
    }
});
