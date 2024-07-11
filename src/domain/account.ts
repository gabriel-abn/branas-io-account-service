export type AccountProps = {
  accountId: string;
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
};

export class Account {
  private _props: AccountProps;

  private constructor(props: AccountProps) {
    this._props = props;
  }

  static create(props: AccountProps): Account {
    return new Account(props);
  }

  static restore(props: AccountProps): Account {
    return new Account(props);
  }

  get props(): AccountProps {
    return this._props;
  }
}
