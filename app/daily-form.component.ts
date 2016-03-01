import {Component} from "angular2/core";

interface IFormOption {
  text: string;
  points: number;
}

interface ITextEntry {
  prompt: string;
  userEntry: string;
}

let MONTHS = {
  0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul",
  7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"
}

abstract class SubForm {
  score: number = null;
  contributesToScore: boolean;
  selection: IFormOption = null;
  textEntry: ITextEntry;
  options: IFormOption[];
  classType: string;
  categoryName: string;
  explanatoryText: string;

  onSelect(option: IFormOption) {
    this.selection = option;
    this.score = option.points;
  }
}

interface IChecklistItem {
  question: string;
  answer: boolean;
  textEntry?: ITextEntry;
}

@Component({
  selector: "daily-form",
  templateUrl: "app/daily-form.component.html"
})
export class DailyForm {
  private subForms: SubForm[] = [];
  private checklists: IChecklistItem[] = [];
  private totalScore = 0;
  private enableSubmit = false;
  private date = new Date;

  constructor() {
    this.subForms.push(new HungerControl);
    this.subForms.push(new CravingControl);
    this.subForms.push(new Satiety);
    this.subForms.push(new EnergyLevel);
    this.subForms.push(new WellBeing);
    this.subForms.push(new ProcessedCarbs);
    this.checklists.push(stressReductionAM);
    this.checklists.push(stressReductionPM);
    this.checklists.push(walks);
    this.checklists.push(movement);
    this.checklists.push(bedtime);
  }

  onSelect(option: IFormOption, classType: string) {
    let classInstance = this.getMatchingClassInstance(classType);
    classInstance.selection = option;
    classInstance.onSelect(option);
    this.totalScore = this.getScore();
    this.enableSubmit = this.getEnableSubmit();
  }

  handleSubmit() {
    if (!this.getEnableSubmit()) {
      alert("You must select an answer for each category.");
    } else {
      console.log(this.subForms);
      console.log(this.checklists);
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
    this.subForms.forEach((form) => {
      if (form.contributesToScore) {
        score += form.score;
      }
    });
    return score;
  }

  private getEnableSubmit(): boolean {
    let result = true;
    this.subForms.forEach((form) => {
      if (!form.selection) {
        result = false;
      }
    });
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
  textEntry = {
    prompt: "I felt hungriest these times",
    userEntry: ""
  };
  contributesToScore = true;
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
  textEntry = {
    prompt: "I craved the following foods",
    userEntry: ""
  };
  contributesToScore = true;
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
  textEntry = {
    prompt: "I felt most satisfied after the following meals",
    userEntry: ""
  };
  contributesToScore = true;
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
  textEntry = {
    prompt: "Comments",
    userEntry: ""
  };
  contributesToScore = true;
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
  textEntry = {
    prompt: "Comments",
    userEntry: ""
  };
  contributesToScore = true;
}

class ProcessedCarbs extends SubForm {
  options = [
    { text: "0 to 1 servings", points: 0 },
    { text: "2 servings", points: 1 },
    { text: "3 or more servings", points: 2 }
  ];
  classType = "ProcessedCarbs";
  categoryName = "Processed Carbs";
  explanatoryText = "I had the following number of processed carbohydrates today";
  textEntry = {
    prompt: "I had the following kinds of processed carbohydrates today",
    userEntry: ""
  };
  contributesToScore = false;
}

let stressReductionAM: IChecklistItem = {
  question: "I did my five-minute stress reduction in the AM",
  answer: null
};

let stressReductionPM: IChecklistItem = {
  question: "I did my five-minute stress reduction in the PM",
  answer: null
};

let walks: IChecklistItem = {
  question: "I did my after-meal walks",
  answer: null
};

let movement: IChecklistItem = {
  question: "I did my joyful movement",
  answer: null,
  textEntry: {
    prompt: "What kind?",
    userEntry: ""
  }
};

let bedtime: IChecklistItem = {
  question: "I did my pre-bedtime routine",
  answer: null,
  textEntry: {
    prompt: "Describe",
    userEntry: ""
  }
};
