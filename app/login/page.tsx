"use client";
import { LoginForm } from "./containers/login-form";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Login() {
  const { t } = useTranslation();
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6 justify-center items-center mb-4">
          <Image
            src="/assets/nebisense-logo.png"
            alt="logo"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    {t("login.form.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("login.form.description")}
                  </CardDescription>
                </CardHeader>

                <LoginForm />
              </div>
              <div className="bg-muted relative hidden md:block">
                <Image
                  src="/assets/nebisense-login-hero.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  width={500}
                  height={500}
                  objectFit="cover"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
