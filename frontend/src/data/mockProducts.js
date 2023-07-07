import coworkingImg from "./img2.jpg"

const mockProducts =[
    {
        id:1,
        image: coworkingImg,
        name:"Business Hub",
        description: "A community space designed for productive work hours, offering a range of premium coffees for a delightful experience.",
        price:100,
        availability:50,
        category_id:1,
        notAvailableStart: new Date(2021,1,1).getTime(),
        notAvailableEnd: new Date(2021,1,15).getTime(),
        address_id:1,
        stars:3
    },
    {
        id:2,
        image: '/images/oficina1.jpg',
        name:"Workspace Oasis",
        description: "An oasis of productivity with a wide selection of specialty coffees, providing a serene environment for focused work.",
        price:150,
        availability:50,
        category_id:1,
        notAvailableStart: new Date(2021,1,1).getTime(),
        notAvailableEnd: new Date(2021,1,15).getTime(),
        address_id:2,
        stars:2
    },
    {
        id:3,
        image: '/images/oficina2.jpg',
        name:"Coffee and Collaborate",
        description:"A collaborative workspace where you can engage with others while enjoying a range of specially curated coffees.",
        price:200,
        availability:50,
        category_id:2,
        notAvailableStart: new Date(2021,1,1).getTime(),
        notAvailableEnd: new Date(2021,1,15).getTime(),
        address_id:3,
        stars:5
    },
    {
        id:4,
        image: '/images/oficina3.jpg',
        name:"Elevated Workspace",
        description:"An elevated work environment offering premium coffees and a comfortable ambiance, perfect for focused work sessions.",
        price:250,
        availability:50,
        category_id:2,
        notAvailableStart: new Date(2021,1,1).getTime(),
        notAvailableEnd: new Date(2021,1,15).getTime(),
        address_id:4,
        stars:4
    },
    {
        id:5,
        image: '/images/openOffice.jpg',
        name:"Cozy Workspace",
        description: "A comfortable and inviting workspace for productive work hours, accompanied by a variety of specialty coffees.",
        price:300,
        availability:50,
        category_id:3,
        notAvailableStart: new Date(2021,1,1).getTime(),
        notAvailableEnd: new Date(2021,1,15).getTime(),
        address_id:5,
        stars:3
    },
    {
        id:6,
        image: '/images/oficina4.jpg',
        name:"Come and Work Along",
        description: "A comfortable and inviting workspace for productive work hours, accompanied by a variety of specialty coffees.",
        price:340,
        availability:40,
        category_id:3,
        notAvailableStart: new Date(2021,1,1).getTime(),
        notAvailableEnd: new Date(2021,1,15).getTime(),
        address_id:5,
        stars:4
    },
    {
        id:7,
        image: '/images/oficina5.jpg',
        name:"Work, Dogs and Coffe",
        description: "A comfortable and inviting workspace for productive work hours, accompanied by a variety of specialty coffees.",
        price:300,
        availability:50,
        category_id:4,
        notAvailableStart: new Date(2021,1,1).getTime(),
        notAvailableEnd: new Date(2021,1,15).getTime(),
        address_id:5,
        stars:3
    },
    {
        id:8,
        image: coworkingImg,
        name:"Bring your dog to work!",
        description: "A comfortable and inviting workspace for productive work hours, accompanied by a variety of specialty coffees.",
        price:300,
        availability:50,
        category_id:4,
        notAvailableStart: new Date(2021,1,1).getTime(),
        notAvailableEnd: new Date(2021,1,15).getTime(),
        address_id:4,
        stars:3
    }
];

export const chips =[
    {key:0, label:"Categoria 1"},
    {key:1, label:"Categoria 2"},
    {key:2, label:"Categoria 3"},
    {key:3, label:"More filters"},
]

export default mockProducts;
