import { Entity } from "../interfaces/entity.interface";

export enum typeSymptoms {
  "FEVER",
  "DRY_COUGH",
  "TIREDNESS",
  "PAINS_AND_DISCOMFORTS",
  "SORE_THROAT",
  "DIARRHEA",
  "CONJUNCTIVITIS",
  "HEADACHE",
  "LOSS_OF_TASTE_OR_SMELL",
  "SKIN_RASH",
  "DIFFICULTY_BREATHING",
  "CHEST_PAIN",
  "SPEECH_LOSS",
}

export type symptom = keyof typeof typeSymptoms;

export interface UserProps {
  name: string;
  symptoms: symptom[];
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get symptoms(): symptom[] {
    return this.props.symptoms;
  }

  public static create(props: UserProps): User {
    return new User(props);
  }
}

// const peter = User.create({
//   name: "peter",
//   symptoms: ["HEADACHE", "FEVER", "CHEST_PAIN"],
// });
