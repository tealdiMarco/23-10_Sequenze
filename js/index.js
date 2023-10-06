/*
    PER TUTTE LE PAGINE:
    1.1) Gestire l'aside come menù in maniera corretta, evidenziando la pagina 
        attualmente visualizzata
    1.2) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA
    2) Caricare il puzzle: immagini e titolo prendendone uno a caso da quelli sul db
        Le immagini su db sono ordinate, quindi è NECESSARIO disordinarle. 
        PUNTI: 2

    3) Cercare di presentare sempre puzzle diversi 
        (quando sono stati tutti presentati avvertire l'utente)
        PUNTI: 0.5

    4.1)  Una mossa è definita da un click su una delle immagini,
        effettuato un click l'immagine selezionata viene spostata nella cella vuota
        (il click sulla cella vuota non ha conseguenze)
        PUNTI: 1.5
        
    4.2) Cambiare puzzle dopo tre mosse o quando si è indovinata la sequenza


    5.1) Gestire il tempo di risoluzione, il numero di sequenze/puzzle risolvi,
        il numero di mosse effettuate
        PUNTI: 2.5



*/


let click=0;
let seq=0;

window.onload=function(){
    //console.log(document.querySelectorAll(".img"));

    const urlParams = new URLSearchParams(window.location.search);
    seq = urlParams.get("seq");



    
    fetch("server/selectDB.php",{
        method:"POST",
        headers:{
            "content-type":"application/json",
        }
    })
    .then(response=> response.json())
    .then(data=>{
        console.log(data);

        let vet={
            1:data[0].img1,
            2:data[0].img2,
            3:data[0].img3,
            4:""

        };
        let v=new Array();





        
        rnd=Math.floor(Math.random() * 4);/*0-3*/

        let imgs=document.querySelectorAll(".img");

        imgs[0].src="";
        imgs[1].src="";
        imgs[2].src="";
        imgs[3].src="";

        let x=0;

        while(x!=4){
            n=(Math.floor(Math.random() * 4)+1);/*1-4*/

            if(vet[n]!=null){
                imgs[x].src= vet[n]
                vet[n]=null;
                x++
                
            }
            
        }

        imgs[0].addEventListener("click",function(){
            change(imgs[0],data)
        });
    
        imgs[1].addEventListener("click",function(){
            change(imgs[1],data)
        });
    
        imgs[2].addEventListener("click",function(){
            change(imgs[2],data)
        });
    
        imgs[3].addEventListener("click",function(){
            change(imgs[3],data)
        });


    })
    .catch((error)=>{
        console.error("Error : " ,error);
    })


}


function change(img,data){
    document.getElementById("seq").innerHTML=seq;

    // console.log(img);
    // alert("hola");

    let imgs=document.querySelectorAll(".img");

    for(let item of imgs){
        
        if(item.src=="" || item.src=="http://localhost/esercizi/Nuova%20cartella/23-10_Sequenze/")
        {
            idChange=item.id
            console.log(idChange);
        }
    }

    document.getElementById(idChange).src=img.src;
    document.getElementById(img.id).src="";


    controllo(data)

    
    // console.log(img.id);
    // console.log(img);
    
}

function controllo(data){

    click++;
    console.log(click);
    document.getElementById("mosse").innerHTML=click;

    if(click>3){
        location.reload();
        alert("mosse asaurite");
        seq=0;
        location.replace("index.html?seq="+seq)
    }

    let imgs=document.querySelectorAll(".img");



    for(let i = 0; i<data.length;i++)
    {
        if(data[i].img1==imgs[0].src && data[i].img2==imgs[1].src && data[i].img3==imgs[2].src){
            alert("HAI INDOVINATO");
            seq++;
            location.replace("index.html?seq="+seq);
        }
    }

    
}