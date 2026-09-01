import { useState } from "react";
import { BasicsTable } from "./table";
import { BasicModal } from "./modal";



const Users = () => {
    const [modalInfo, setModalInfo] = useState<{isOpen: boolean, recordID?: number | null}>({isOpen: false});
    const handleCloseModal = () => {
        setModalInfo({isOpen: false, recordID: null});
    };
    return <section>
        <BasicsTable setModalInfo={setModalInfo} />
        <BasicModal modalInfo={modalInfo}
            handleCloseModal={handleCloseModal} />
    </section>
}

export default Users;