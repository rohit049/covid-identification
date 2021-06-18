import { Specification } from "../specification/common/specification";
import { symptom, User } from "./user.entity";

export class UserHasAllCommonSymptomsSpecification extends Specification<User> {
  private readonly SYMPTOM_CRITERIAL_FEVER: symptom = "FEVER";
  private readonly SYMPTOM_CRITERIAL_DRY_COUGH: symptom = "DRY_COUGH";
  private readonly SYMPTOM_CRITERIAL_TIREDNESS: symptom = "TIREDNESS";

  isSatisfiedBy(user: User): boolean {
    const symptoms = user.symptoms;
    return (
      symptoms.includes(this.SYMPTOM_CRITERIAL_FEVER) &&
      symptoms.includes(this.SYMPTOM_CRITERIAL_DRY_COUGH) &&
      symptoms.includes(this.SYMPTOM_CRITERIAL_TIREDNESS)
    );
  }
}

export class UserHasLessCommonSymptomsSpecification extends Specification<User> {
  private readonly SYMPTOM_CRITERIAL: symptom[] = [
    "PAINS_AND_DISCOMFORTS",
    "SORE_THROAT",
    "DIARRHEA",
    "CONJUNCTIVITIS",
    "HEADACHE",
    "LOSS_OF_TASTE_OR_SMELL",
  ];
  isSatisfiedBy(user: User): boolean {
    const symptoms = user.symptoms;
    return symptoms.some((sym) => this.SYMPTOM_CRITERIAL.indexOf(sym) >= 0);
  }
}

export class UserHasSomeSeriousSymptomsSpecification extends Specification<User> {
  private readonly SYMPTOM_CRITERIAL: symptom[] = [
    "DIFFICULTY_BREATHING",
    "CHEST_PAIN",
    "SPEECH_LOSS",
  ];
  isSatisfiedBy(user: User): boolean {
    const symptoms = user.symptoms;
    return symptoms.some((sym) => this.SYMPTOM_CRITERIAL.indexOf(sym) >= 0);
  }
}

export class UserNeedsUTI extends Specification<User> {
  isSatisfiedBy(user: User): boolean {
    return new UserHasAllCommonSymptomsSpecification()
      .and(new UserHasSomeSeriousSymptomsSpecification())
      .isSatisfiedBy(user);
  }
}

export class UserNeedsMedical extends Specification<User> {
  isSatisfiedBy(user: User): boolean {
    return new UserHasAllCommonSymptomsSpecification()
      .or(new UserHasSomeSeriousSymptomsSpecification())
      .or(new UserHasLessCommonSymptomsSpecification())
      .isSatisfiedBy(user);
  }
}
