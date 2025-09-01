const mediators =[
    {
        id: crypto.randomUUID(),
        image: "bg_logo.png",
        name: "Br. Anik Rahman",
        city:"Dhaka",
        profession: "Lawyer",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image1.png",
        name: "Farhan Anan Himu",
        city:"Chittagong",
        profession: "Assistant Professor",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image2.png",
        name: "Asif Ahmed Tushar",
        city:"Sylhet",
        profession: "Senior Dancer",
        
    },
    {
        id: crypto.randomUUID(),
        image: "bg_logo.png",
        name: "Nishat Farjana Arpy",
        city:"Dhaka",
        profession: "Shahid Buddhijibi",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image1.png",
        name: "Tahmid",
        city:"Dhaka",
        profession: "Businessman",
        
    },
    
]

function getAllMediators() {
    return mediators;
}

export { getAllMediators };
