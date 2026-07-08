import { Button } from '#/components/ui/button';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSignUpMutation } from '#/hooks/useAuth';

export const Route = createFileRoute('/signup')({
    component: SignUpComponent,
})

const formSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters."),
    name: z.string()
})

function SignUpComponent() {

    const navigate = useNavigate();

    const { mutateAsync: signUp, isPending: signUpIsPending } = useSignUpMutation();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            await signUp({ email: value.email, password: value.password, name: value.name, navigate });
        },
    })
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid w-full max-w-6xl overflow-hidden rounded-4xl border border-border/60 bg-card/80 shadow-2xl backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
                <div className="flex flex-col justify-center bg-linear-to-br from-primary/20 via-primary/10 to-accent/10 p-6 sm:p-8 lg:p-10">
                    <div className="mb-6 inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        Create account
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Join our store today
                    </h1>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                        Create an account to save your favorites, track orders, and enjoy a smoother shopping experience.
                    </p>

                    <div className="mt-8 hidden space-y-3 lg:block">
                        <div className="rounded-2xl border border-border/60 bg-background/70 p-3 text-sm text-foreground">
                            <span className="font-medium">Fast checkout</span>
                            <p className="mt-1 text-muted-foreground">Keep your cart ready for the next purchase.</p>
                        </div>
                        <div className="rounded-2xl border border-border/60 bg-background/70 p-3 text-sm text-foreground">
                            <span className="font-medium">Personalized benefits</span>
                            <p className="mt-1 text-muted-foreground">Get offers and recommendations that fit your interests.</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                    <Card className="border-0 bg-transparent shadow-none">
                        <CardHeader className="px-0 pb-6">
                            <CardTitle className="text-2xl font-semibold text-foreground">Sign up</CardTitle>
                            <p className="mt-2 text-sm text-muted-foreground">Fill in your details to get started</p>
                        </CardHeader>
                        <CardContent className="px-0">
                            <form
                                id="login-form"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    form.handleSubmit()
                                }}
                            >
                                <FieldGroup className="space-y-4">
                                    <form.Field
                                        name="name"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name} className="text-sm font-medium text-foreground">
                                                        Full name
                                                    </FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                        placeholder="Enter your name"
                                                        autoComplete="off"
                                                        className="h-11 rounded-xl border-border/60 bg-background/70 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                                                    />
                                                    {isInvalid && (
                                                        <FieldError errors={field.state.meta.errors} />
                                                    )}
                                                </Field>
                                            )
                                        }}
                                    />

                                    <form.Field
                                        name="email"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name} className="text-sm font-medium text-foreground">
                                                        Email address
                                                    </FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                        placeholder="Enter your email"
                                                        autoComplete="off"
                                                        className="h-11 rounded-xl border-border/60 bg-background/70 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                                                    />
                                                    {isInvalid && (
                                                        <FieldError errors={field.state.meta.errors} />
                                                    )}
                                                </Field>
                                            )
                                        }}
                                    />

                                    <form.Field
                                        name="password"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name} className="text-sm font-medium text-foreground">
                                                        Password
                                                    </FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                        placeholder="Enter your password"
                                                        autoComplete="off"
                                                        className="h-11 rounded-xl border-border/60 bg-background/70 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                                                    />
                                                    {isInvalid && (
                                                        <FieldError errors={field.state.meta.errors} />
                                                    )}
                                                </Field>
                                            )
                                        }}
                                    />
                                </FieldGroup>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col items-stretch gap-4 px-0 pt-2">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-11 w-full rounded-xl border-border bg-background/70 text-foreground hover:bg-accent/40 sm:w-auto"
                                    onClick={() => form.reset()}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    form="login-form"
                                    className="h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                                >
                                    {signUpIsPending ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                                    ) : (
                                        "Create account"
                                    )}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
