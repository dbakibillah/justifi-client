const blogs =[
    {
        id: crypto.randomUUID(),
        image: "bg_logo.png",
        case: "Rights Case",
        title:"Justice May For You If You Are Innocent",
        date: "20 Feb 2024",
        author: "John Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor contractu ut labore.",
    },
    {
        id: crypto.randomUUID(),
        image: "image1.png",
        case: "Corporate Case",
        title:"Justice May For You If You Are Innocent",
        date: "20 Feb 2024",
        author: "John Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor contractu ut labore.",
    },
    {
        id: crypto.randomUUID(),
        image: "image2.png",
        case: "Rights Case",
        title:"Justice May For You If You Are Innocent",
        date: "20 Feb 2024",
        author: "John Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor contractu ut labore.",
    },
    {
        id: crypto.randomUUID(),
        image: "bg_logo.png",
        case: "Business Case",
        title:"By Whom Your Business Is Being Loss?",
        date: "20 Feb 2024",
        author: "John Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor contractu ut labore.",
    },
    {
        id: crypto.randomUUID(),
        image: "image1.png",
        case: "Criminal Case",
        title:"Who Can The Victim A Sue After A Car Accident?",
        date: "20 Feb 2024",
        author: "John Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor contractu ut labore.",
    }
]

function getAllBlogs() {
    return blogs;
}

export { getAllBlogs };
