import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

const UsersPage = async () => {
    // Fetch user data from the database
    const userData = await db.profile.findMany();

    return (
        <div className="p-6">
           <h1 className="text-4xl font-bold text-[#fcb61a] animate-fade-in-up">Manage Users</h1>

            <DataTable columns={columns} data={userData} />
        </div>
    );
};

export default UsersPage;
