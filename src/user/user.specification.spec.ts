import { User } from "./user.entity";
import { UserHasAllCommonSymptomsSpecification as CommonSymptoms } from "./user.specification";
import { UserHasLessCommonSymptomsSpecification as LessCommonSymptoms } from "./user.specification";
import { UserHasSomeSeriousSymptomsSpecification as SeriousSymptoms } from "./user.specification";
import { UserNeedsUTI } from "./user.specification";
import { UserNeedsMedical } from "./user.specification";

describe("user.specification", () => {
  it("user should has fever", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["FEVER", "DRY_COUGH", "TIREDNESS"],
    });

    const result = new CommonSymptoms().isSatisfiedBy(Peter);

    expect(result).toBe(true);
  });

  it("user should not has fever", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["DIFFICULTY_BREATHING"],
    });

    const result = new CommonSymptoms().isSatisfiedBy(Peter);

    expect(result).toBe(false);
  });

  it("user should have some less common symptoms", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["DIARRHEA"],
    });

    const result = new LessCommonSymptoms().isSatisfiedBy(Peter);

    expect(result).toBe(true);
  });

  it("user should not have less common symptoms", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["FEVER"],
    });

    const result = new LessCommonSymptoms().isSatisfiedBy(Peter);

    expect(result).toBe(false);
  });

  it("user should have some serious symptoms", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["DIFFICULTY_BREATHING"],
    });

    const result = new SeriousSymptoms().isSatisfiedBy(Peter);

    expect(result).toBe(true);
  });

  it("user should not have serious symptoms", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["DIARRHEA"],
    });

    const result = new SeriousSymptoms().isSatisfiedBy(Peter);

    expect(result).toBe(false);
  });

  it("user should needs UTI", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["FEVER", "DRY_COUGH", "TIREDNESS", "DIFFICULTY_BREATHING"],
    });

    const result = new UserNeedsUTI().isSatisfiedBy(Peter);

    expect(result).toBe(true);
  });

  it("user should needs UTI", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["FEVER", "DRY_COUGH", "TIREDNESS"],
    });

    const result = new UserNeedsUTI().isSatisfiedBy(Peter);

    expect(result).toBe(false);
  });

  it("user should needs UTI", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["DRY_COUGH", "TIREDNESS", "DIFFICULTY_BREATHING"],
    });

    const result = new UserNeedsUTI().isSatisfiedBy(Peter);

    expect(result).toBe(false);
  });

  it("user should needs Medical", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["FEVER", "DRY_COUGH", "TIREDNESS"],
    });

    const result = new UserNeedsMedical().isSatisfiedBy(Peter);

    expect(result).toBe(true);
  });

  it("user should needs Medical", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: ["FEVER", "DRY_COUGH", "TIREDNESS", "SPEECH_LOSS"],
    });

    const result = new UserNeedsMedical().isSatisfiedBy(Peter);

    expect(result).toBe(true);
  });

  it("user should not needs Medical", () => {
    const Peter = User.create({
      name: "Peter",
      symptoms: [],
    });

    const result = new UserNeedsMedical().isSatisfiedBy(Peter);

    expect(result).toBe(false);
  });
});
