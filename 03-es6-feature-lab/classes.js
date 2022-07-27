
const ADMIN = 2;
const AUTHOR = 1;
const READER = 0;
const role = ['READER', 'AUTHOR','ADMIN'];

class Person{
    static nextId = 0;
    id = ++ Person.nextId;

    constructor (fName, lName, adress){
    this.fName = fName;
    this.lName = lName;
    this.adress = adress;
    }
    getFullName(){
        return `${this.fName} ${this.lName}`;
    }

    toString()
    {
        return `ID: ${this.id}, Name: ${this.getFullName}, Adress: ${this.adress}`;
    }

}
    class User extends Person{
constructor(fName, lName, adress, username, password, role = READER){
    super (fName, lName, adress);
    this.username = username;
    this.password = password;
    this.role = role;


}
    
toString() //overriding
{
    return `${super.toString()}, Username: ${this.username}, Passowrd: ${this.passowrd}, Role: ${role[this.role]}`;
} 

 }
 const changePassword = function(newPassword){
    this.passowrd = newPassword;
 }

const SUPER_ADMIN = {
    __proto__: User.prototype,
    id: 0,
    fName:`Default`,
    lName:`Admin`,
    adress:`#G`,
    username: `admin`,
    passowrd: `admin`,
    role:`ADMIN`,

        toString() {//overriding
    return `SUPER_ADMIN:${super.toString()}`;
    },
    changePassword
}
const p1 = new Person(`John`,`Doe`,`London`);
const p2 = new Person(`Jane`,`Doe`,`New York`);

const u1 = new User(`Ivan`, `Petrov`,`Sofia 1000`,`ivan`,`ivan123`);
const u2 = new User(`Hristina`,`Petrova`, `Sofia 1000`, `hristina`, `hristina123`);
const u3 = new User(`Georgi`,`Hristov`, `Plovdiv`, `georgi`, `georgi123`);
const persons = [p1,p2,u1,u2,u3];

persons.forEach(p=> console.log(p.toString()));
console.log(SUPER_ADMIN.toString());
