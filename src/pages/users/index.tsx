import { useState } from "react";
import { PageTable } from "./table";
import { PageModal } from "./modal";



const Users = () => {
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const handleSettingsModalClose = () => {
        setSettingsModalOpen(false);
    };
    return <section>
        <PageTable setSettingsModalOpen={setSettingsModalOpen} />
        <PageModal open={settingsModalOpen} onOpenChange={handleSettingsModalClose} />
    </section>
}

export default Users;