function greeter(name: string):string{
    return 'Hello ${name} from Typescript';
}
{
   
}

const elem = document.getElementById(`results`);
if (elem != null){

elem.innerHTML= greeter('Gogo');
}