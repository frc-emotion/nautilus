import Navbar from "@/components/nav/Navbar";
import PageTitle from "@/components/properties/PageTitle";
import DirectoryTable from "./DirectoryTable";

export default function Directory() {
    return (
        <>
            <PageTitle title="Directory" />
            <Navbar />
            <DirectoryTable />
        </>
    );
}
