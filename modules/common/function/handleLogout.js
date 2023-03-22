import jsCookie from 'js-cookie';
import { useRouter } from "next/router";


export const handleLogoutParent = () => {
    const router = useRouter();

    const handleLogout = () => {
        jsCookie.remove("access-token");
        jsCookie.remove("id");
        jsCookie.remove("role_id");
        router.replace("/login");
    }

    return { handleLogout };

};
