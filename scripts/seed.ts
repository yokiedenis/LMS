const {PrismaClient} = require("@prisma/client");

const database = new PrismaClient();

async function main(){
    try{
       await database.category.createMany({
        data: [
            {name: "Electronics"},
            {name: "Computer Science"},
            {name: "Music"},
            {name: "Fittness"},
            {name: "Sports"},
            {name: "Photography"},
            {name: "Accounting"},
            {name: "Engineering"},
            {name: "Filming"}
        ]
       });
     console.log("Success");

    }catch(error){
        console.log("Error seeding the database categories", error);
    }finally{
        await database.$disconnect();
    }
}

main();