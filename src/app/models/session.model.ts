export interface Session {
    title: string;
    password: string;
    active: boolean;
}

export const DefaultSession: Session = {
    title: '',
    password: '',
    active: false
}
