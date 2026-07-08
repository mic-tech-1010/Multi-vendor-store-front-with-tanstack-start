import { authClient } from "#/lib/auth-client";
import { mergeCart } from "#/server/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLoginMutation() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            return await authClient.signIn.email(
                { email, password, callbackURL: '/' },
                {
                    onError: error => {
                        toast.error(error.error.message || "failed to sign in")
                    },
                    onSuccess: async () => {
                        await authClient.getSession();
                        toast.success("Signed in successfully")

                    }
                }
            )
        },

        onSuccess: async () => {
            await mergeCart();

            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
    });

}

export function useSignUpMutation() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            email,
            password,
            name,
            navigate,
        }: {
            email: string;
            password: string;
            name: string;
            navigate: (args: { to: string }) => void;
        }) => {
            return await authClient.signUp.email(
                { email, password, name, callbackURL: '/' },
                {
                    onError: error => {
                        toast.error(error.error.message || "failed to sign up")
                    },
                    onSuccess: () => {
                        console.log("success")
                        navigate({ to: '/' })
                    }
                }
            )
        },
        onSuccess: async () => {
            await mergeCart();

            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
    });

}

export default function useSignOutMutation() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return await authClient.signOut()
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        }
    });
}
