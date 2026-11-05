import {useLocation} from "react-router";
import ReviewerRegistrationForm from "../components/auth/ReviewerRegistrationForm.tsx";

export default function ReviewerRegister() {
    const from = useLocation().state?.from ?? null;

    return (
        <main>
            <ReviewerRegistrationForm prev={from} />
        </main>
    )
}
