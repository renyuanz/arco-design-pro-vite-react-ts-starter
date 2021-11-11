import { useContext } from "react";
import { GlobalContext } from "../context";
function useLocale() {
    var locale = useContext(GlobalContext).locale;
    return locale;
}
export default useLocale;
