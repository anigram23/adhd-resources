import {useLocation} from "react-router";
import ReviewerLoginForm from "../components/auth/ReviewerLoginForm";

export default function ReviewerLogin() {
    const from = useLocation().state?.from ?? null;

    return (
        <main>
            <ReviewerLoginForm prev={from} />
        </main>
    );
}
