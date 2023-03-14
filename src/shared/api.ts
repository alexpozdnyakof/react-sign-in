export type ApiSessionResponse = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
};

export type ApiLoginParams = {
  email: string;
  password: string;
};

export function login({ email }: ApiLoginParams): Promise<ApiSessionResponse> {
  return Promise.resolve({
    id: 1,
    username: email,
    firstName: 'Alex',
    lastName: 'Pozdnyakof',
  });
}
