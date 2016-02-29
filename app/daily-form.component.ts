import {Component} from "angular2/core";

interface IFormOption {
    text: string;
    points: number;
}

abstract class SubForm {
    score: number = null;
    selection: IFormOption = null;
    enteredText = "";   // remember to cleanse this.
    options: IFormOption[];
    classType: string;
    categoryName: string;
    explanatoryText: string;
    subjectiveText: string;

    onSelect(option: IFormOption) {
        this.selection = option;
        this.score = option.points;
    }
}

@Component({
    selector: "daily-form",
    templateUrl: "app/daily-form.component.html"
})
export class DailyForm {
    private subForms: SubForm[] = [];
    private totalScore = 0;
    private enableSubmit = false;

    constructor() {
        this.subForms.push(new HungerControl);
        this.subForms.push(new CravingControl);
        this.subForms.push(new Satiety);
        this.subForms.push(new EnergyLevel);
        this.subForms.push(new WellBeing);
    }

    onSelect(option: IFormOption, classType: string) {
        let classInstance = this.getMatchingClassInstance(classType);
        classInstance.selection = option;
        classInstance.onSelect(option);
        this.totalScore = this.getScore();
        this.enableSubmit = this.getEnableSubmit();

        // Get rid of this vvvvvvvv
        console.log(this.subForms);
    };

    handleSubmit() {
        if (!this.getEnableSubmit()) {
            alert("You must select an answer for each category.");
        } else {
            // noop;
        }
    }

    private getMatchingClassInstance(classType: string): SubForm {
        let result: SubForm = null;
        this.subForms.forEach((form: SubForm) => {
            if (form.classType === classType) {
                result = form;
            }
        });
        return result;
    }

    private getScore() {
        let score = 0;
        for (let form in this.subForms) {
            score += this.subForms[form].score;
        }
        return score;
    }

    private getEnableSubmit(): boolean {
        let result = true;
        this.subForms.forEach((form) => {
            if (!form.selection) {
                result = false;
            }
        });
        console.log(result);
        return result;
    }
}

class HungerControl extends SubForm {
    options = [
        { text: "Starving", points: 0 },
        { text: "Very Hungry", points: 1 },
        { text: "Moderately Hungry", points: 2 },
        { text: "Slightly Hungry", points: 3 },
        { text: "No Hunger", points: 4 }
    ];

    classType = "HungerControl"; // Poor man's reflection
    categoryName = "Hunger Control";
    explanatoryText = "Today, I felt";
    subjectiveText = "I felt hungriest these times";
}

class CravingControl extends SubForm {
    options = [
        { text: "High", points: 0 },
        { text: "Above Average", points: 1 },
        { text: "Average", points: 2 },
        { text: "Below Average", points: 3 },
        { text: "Absent", points: 4 }
    ];

    classType = "CravingControl";
    categoryName = "Craving Control";
    explanatoryText = "Today, my cravings were";
    subjectiveText = "I craved the following foods";
}

class Satiety extends SubForm {
    options = [
        { text: "Not at All", points: 0 },
        { text: "Briefly", points: 1 },
        { text: "A Couple Hours", points: 2 },
        { text: "Most of the Time", points: 3 },
        { text: "Until the Next Meal", points: 4 }
    ];

    classType = "Satiety";
    categoryName = "Satiety";
    explanatoryText = "I felt satisfied after eating";
    subjectiveText = "I felt most satisfied after the following meals";
}

class EnergyLevel extends SubForm {
    options = [
        { text: "Low", points: 0 },
        { text: "Fair", points: 1 },
        { text: "Average", points: 2 },
        { text: "Above Average", points: 3 },
        { text: "High", points: 4 }
    ];

    classType = "EnergyLevel";
    categoryName = "Energy Level";
    explanatoryText = "Today, my overall energy level was";
    subjectiveText = "Comments";
}

class WellBeing extends SubForm {
    options = [
        { text: "Low", points: 0 },
        { text: "Below Average", points: 1 },
        { text: "Average", points: 2 },
        { text: "Above Average", points: 3 },
        { text: "High", points: 4 }
    ];

    classType = "WellBeing";
    categoryName = "Well Being";
    explanatoryText = "Today, my overall level of well-being was";
    subjectiveText = "Comments";
}
