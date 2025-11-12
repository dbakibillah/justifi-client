const lawyers =[
    {
        id: crypto.randomUUID(),
        image: "bg_logo.png",
        name: "Br. Anik Rahman",
        court:"Dhaka Judge Court",
        fee: 5000,
        catagory: "Criminal Consultant",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image1.png",
        name: "Br. Ashraf Hossain",
        court:"Supreme Court of Bangladesh",
        fee: 7000,
        catagory: "Divorce Consultant",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image2.png",
        name: "Br. Saleh Mohammad Arefin",
        court:"Supreme Court of Bangladesh",
        fee: 10000,
        catagory: "Civil Consultant",
        
    },
    {
        id: crypto.randomUUID(),
        image: "bg_logo.png",
        name: "Adv Rozina parvin",
        court:"Dhaka Megistrates Court",
        fee: 7500,
        catagory: "Civil Consultant",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image1.png",
        name: "Mahamud Wazed",
        court:"Dhaka Judge Court",
        fee: 8000,
        catagory: "Criminal Consultant",
        
    },
    {
        id: crypto.randomUUID(),
        image: "image2.png",
        name: "Shanjid Siddiqui",
        court:"Magistrates Court",
        fee: 7500,
        catagory: "Civil Consultant",
        
    },
]

function getAllLawyers() {
    return lawyers;
}

export { getAllLawyers };
