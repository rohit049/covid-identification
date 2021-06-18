import { ISpecification } from "./interfaces/specification.interface";

export abstract class Specification<T> implements ISpecification<T> {
  abstract isSatisfiedBy(target: T): boolean;
  and(other: ISpecification<T>): ISpecification<T> {
    return new AndSpecification<T>(this, other);
  }
  or(other: ISpecification<T>): ISpecification<T> {
    return new OrSpecification<T>(this, other);
  }
}
export class AndSpecification<T> extends Specification<T> {
  constructor(
    private readonly first: ISpecification<T>,
    private readonly second: ISpecification<T>,
  ) {
    super();
  }

  isSatisfiedBy(target: T): boolean {
    return (
      this.first.isSatisfiedBy(target) && this.second.isSatisfiedBy(target)
    );
  }
}

export class OrSpecification<T> extends Specification<T> {
  constructor(
    private readonly first: ISpecification<T>,
    private readonly second: ISpecification<T>,
  ) {
    super();
  }

  isSatisfiedBy(target: T): boolean {
    return (
      this.first.isSatisfiedBy(target) || this.second.isSatisfiedBy(target)
    );
  }
}
