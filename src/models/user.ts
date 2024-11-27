export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;


    constructor(id: number, name: string, email: string, role: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
