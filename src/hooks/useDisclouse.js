import { useState } from "react";

const useDisclouse = () => {


    const [isOpen, setopen] = useState(false);
    const onOpen = () => {
        setopen(true);
    };
    const onClose = () => {
        setopen(false);
    };
    return { isOpen, onOpen, onClose }
}

export default useDisclouse;