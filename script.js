class CreatePencil{
    constructor(name, color,price,company){
        this.name=name;
        this.price=price;
        this.color=color;
        this.company=company;
    }

    erase() {
        document.body.querySelectorAll("h1").forEach((elem)=>{
            if(elem.style.color===this.color){
                elem.remove();
            }
        });
    };

    write(text) {
        let h1=document.createElement("h1");
        h1.textContent=text;
        h1.style.color=this.color;
        document.body.append(h1);
    }
};

let pen1 =new CreatePencil("Nataraj","red",5,"Nataraj");
let pen2 =new CreatePencil("8B","green",5,"Apsara");
let pen3 =new CreatePencil("DOMS","DARKBLUE",5,"DOMS");