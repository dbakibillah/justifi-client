const arbitrators =[
    {
        id: crypto.randomUUID(),
        image: "bg_logo.png",
        name: "Br. Anik Rahman",
        city:"Dhaka",
        catagory: "Senior Arbitrator",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image1.png",
        name: "Br. Ashraf Hossain",
        city:"Chittagong",
        catagory: "Junior Arbitrator",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image2.png",
        name: "Br. Saleh Mohammad Arefin",
        city:"Sylhet",
        catagory: "Senior Arbitrator",
        
    },
    {
        id: crypto.randomUUID(),
        image: "bg_logo.png",
        name: "Adv Rozina parvin",
        city:"Dhaka",
        catagory: "Senior Arbitrator",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image1.png",
        name: "Mahamud Wazed",
        city:"Dhaka",
        catagory: "Junior Arbitrator",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image2.png",
        name: "Shanjid Siddiqui",
        city:"Rajshahi",
        catagory: "Senior Arbitrator",
        
    },
]

function getAllArbitrators() {
    return arbitrators;
}

export { getAllArbitrators };
