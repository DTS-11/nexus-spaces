import { signIn } from "@/auth"
import { Button } from "../ui/button"

export function SignInButton() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn()
            }}
        >
            <Button type="submit">
                Sign in with GitHub
            </Button>
        </form>
    )
}